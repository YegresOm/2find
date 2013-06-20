var version = new Date().getMilliseconds(),
    folderId = null,

    addBookmark = function (song) {
        if (song.length !== 0) {
            chrome.bookmarks.create({
                parentId: folderId,
                title: song,
                url: "https://www.google.com/search?btnG=1&pws=0&q=" + song
            }, function (bookmark) {
                console.log(bookmark);
            });
        }
    },

    requestSaveAsBookmark = function (tabId) {
        chrome.tabs.sendMessage(tabId, {action: "getSongName"}, function (response) {
            addBookmark(response.songName.trim());
        });
    },

    findPage = function (tabs) {
        $(tabs).each(function (index) {
            if (tabs[index].url.indexOf('radiotuna') !== -1) {
                requestSaveAsBookmark(tabs[0].id);
            }
        });
    }

chrome.bookmarks.getChildren("2", function (bookmarks) {
    var notExists = true
    $(bookmarks).each(function (index) {
        if (bookmarks[index].title.match('2Find')) {
            folderId = bookmarks[index].id
            notExists = false;
        }
    })
    if (notExists) {
        chrome.bookmarks.create({'parentId': null,
                'title': '2Find'},
            function (newFolder) {
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
