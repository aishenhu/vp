;
window.onload = function() {
	var VideoModule = {
		init: function() {
			this.video = document.getElementById('video');
		},

		start: function() {
			if (navigator.getUserMedia) {
				// opera users (hopefully everyone else at some point)
				navigator.getUserMedia({
					video: true,
					audio: true
				}, this.onSuccess, this.onError);
			} else if (navigator.webkitGetUserMedia) {
				// webkit users
				navigator.webkitGetUserMedia({
					video: true
				}, this.onSuccess, this.onError);
			}
		},

		onSuccess: function(stream) {
			console.log(stream);
			if (navigator.webkitGetUserMedia) {
				video.src = webkitURL.createObjectURL(stream);
			} else {
				video.src = stream;
			}
			setTimeout(function() {
				ImageModule.baseCanvas.getContext('2d').drawImage(video, 0, 0);
				setInterval(function() {
					ImageModule.screenCanvas.getContext('2d').drawImage(video, 0, 0);
					var resData = ImageModule.start().data;
					ImageModule.compareCanvas.getContext('2d').putImageData(resData, 0, 0);
				}, 100);
			}, 1000);

		},

		onError: function(error) {
			console.log(error);
		}
	}
	// var worker = new Worker('js/img.js');
	ImageModule.init();
	VideoModule.init();
	VideoModule.start();
	// ImageModule.baseCanvas.getContext('2d').drawImage(document.getElementById('baseImg'),0,0);
	// ImageModule.screenCanvas.getContext('2d').drawImage(document.getElementById('screenImg'),0,0);
	// var resData = ImageModule.start().data;
	// ImageModule.compareCanvas.getContext('2d').putImageData(resData, 0,0);
}