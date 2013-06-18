$(document).ready(function() {
	var parseSongName = function(){
		var trackName = $('#nppTrackName').text()
		var artistName = $('#nppArtistName').text()
		
		return artistName + " " + trackName
	}
	
	key('alt+a', function(){
		chrome.runtime.sendMessage({msg: "run"})
	});
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "getSongName")
				sendResponse({songName: parseSongName()});
	});
	
}, true);

