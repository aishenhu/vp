;
window.onload = function() {
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||function() {console.log('Your browser doesn\'t support getUserMedia.')};
	getUserMedia({
		'video': true
	}, onSuccess, onError);

	function onSuccess(stream) {
		video.src = stream;
		var worker = new Worker('js/vp.js');
		worker.onmessage = function(event) {
			console.log("Called back by the worker!\n",event);
		};
		worker.postMessage("haha"); // start the worker.
	}

	function onError(error) {
		console.log(error);
	}
}