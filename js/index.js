;
window.onload = function() {
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	if (navigator.getUserMedia) {
		// opera users (hopefully everyone else at some point)
		navigator.getUserMedia({
			video: true
		}, onSuccess, onError);
	} else if (navigator.webkitGetUserMedia) {
		// webkit users
		navigator.webkitGetUserMedia('video', onSuccess, onError);
	}

	function onSuccess(stream) {
		video.src = stream;
		setInterval(function(){
			canvas.width = parseInt(getComputedStyle(video).width);
			canvas.height = parseInt(getComputedStyle(video).height);
			canvas.getContext('2d').drawImage(video, 0, 0);
		},20);
	}

	function onError(error) {
		console.log(error);
	}
}