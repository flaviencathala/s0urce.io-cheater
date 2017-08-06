var GMaps = 'http://maps.googleapis.com/maps/api/geocode/json';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
        $.ajax({
            url: request.url,
            type: "GET",
            crossDomain: true,
            beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');},
            error: function(e) { sendResponse(null); },
            success: function(d) { sendResponse(d); }
        });
    return true;
  }
);
