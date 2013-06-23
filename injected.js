$(document).ready(function() {
	var parseSongName = function(){
		var trackName = $('#nppTrackName').text()
		var artistName = $('#nppArtistName').text()
		
		return artistName + " " + trackName
	};
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "songName")
				sendResponse({songName: parseSongName()});
	});
	
}, true);

