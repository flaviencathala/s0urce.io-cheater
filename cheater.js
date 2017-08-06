var wordsListUrl = 'http://s0urce.io/client/js/wordLibrary.json';

var wordUrl  = 'http://s0urce.io/client/img/words/';

var easyWordUrl  = 'http://s0urce.io/client/img/words/easy/';
var mediumWordUrl  = 'http://s0urce.io/client/img/words/medium/';
var hardWordUrl  = 'http://s0urce.io/client/img/words/hard/';

var wordsList = null;

function executeCode(scriptContent) {
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);
}

function isScript(event)
{
  if (event.path.length && event.path[0].type === 'text/javascript')
      return true;
  return false;
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isWord(url) {
    return url.substring(0, wordUrl.length) === wordUrl;
}

function writeWord(word) {
    var input = $('#tool-type-word');
    if (input) {
        input.val(word);
        var time = randomIntFromInterval(500, 1500);
        executeCode("setTimeout(() => $('#tool-type-form').trigger('submit'), " + time + ");");
    }
}

function loadWordsList() {
    chrome.runtime.sendMessage({url: wordsListUrl}, function(response) {
        wordsList = response;
    });
}

function getWordFromUrl(url) {
    if (wordsList !== null) {
        var t = url.substring(wordUrl.length).split('/');
        if (t.length === 2) {
            var difficulty = t[0];
            var image = t[1];
            var wordsIndex = difficulty.substring(0, 1).toUpperCase() + 'words';
            if (typeof wordsList[wordsIndex] === 'undefined') {
                return null;
            }
            var wordsArray = wordsList[wordsIndex];
            for (var i = 0; i < wordsArray.length; i++) {
                if (wordsArray[i][1] === image) {
                    return wordsArray[i][0];
                }
            }
            return null;
        }
    }
    return null;
}

loadWordsList();

document.addEventListener('load', function(event)
{
    var url = event.path[0].src;
  if (isWord(url))
  {
      var word = getWordFromUrl(url);
      if (word !== null) {
        writeWord(word);
      }
  }
  // }
  // chrome.runtime.sendMessage({url: url}, function(response) {
  //     var data = response.data;
  //     executeCode(``);
  // });
}, true);
