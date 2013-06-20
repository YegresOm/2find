var version = new Date().getMilliseconds(),
    folderId = null,

    addBookmark = function (song) {
        console.log("song name: " + song);
        if (song.length !== 0) {

            chrome.bookmarks.create({
                parentId: folderId,
                title: song + version,
                url: "https://www.google.com/search?btnG=1&pws=0&q=" + song
            }, function (bookmark) {
                console.log(bookmark);
            });
        }
    },

    requestSaveAsBookmark = function (tabId) {
        chrome.tabs.sendMessage(tabId, {action: "getSongName"}, function (response) {
            console.log(response.songName.trim().length + "_V_" + version);
            addBookmark(response.songName.trim());
        });
    },

    findPage = function (tabs) {
        $(tabs).each(function (index) {
            if (tabs[index].url.indexOf('radiotuna') !== -1) {
                console.log(tabs[index].url + "_v_" + version);
                requestSaveAsBookmark(tabs[0].id);
            }
        });
    }

chrome.bookmarks.getChildren("2", function (bookmarks) {
    var notExists = true
    $(bookmarks).each(function (index) {
        if (bookmarks[index].title.match('2Find')) {
            console.log("Parrent " + bookmarks[index].title)
            folderId = bookmarks[index].id
            notExists = false;
        }
    })
    if (notExists) {
        chrome.bookmarks.create({'parentId': null,
                'title': '2Find'},
            function (newFolder) {
                console.log("Folder added");
                folderId = newFolder.id;
            });
    }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg == 'run') {
        chrome.tabs.getAllInWindow(null, function (tabs) {
            findPage(tabs);
        })
    }
});
