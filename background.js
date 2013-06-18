var saveSongAsBookmark = function (tabId) {
    chrome.tabs.sendMessage(tabId, {action: "getSongName"}, function (response) {
        alert(response.songName);
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == 'run') {
            chrome.tabs.getAllInWindow(null, function (tabs) {
                saveSongAsBookmark(tabs[0].id);

                //	if(tabs[index].url.indexOf("radiotuna.com") !== -1){
                //	}
            })
        }
    });
