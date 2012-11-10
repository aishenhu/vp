;
window.onload = function() {
	/**
	 * 创建帧动画对象，传入的函数，将在下一帧绘制时执行，所以函数只执行
	 * 一次
	 * 在不支持requestAnimationFrame的情况下，使用定时器模拟，fps 60
	 * 使用示例：
	 * @example
	 *         var raf = requestAnimationFrame;
	 *         raf(function(){
	 *              //处理代码
	 *         }, {});
	 * 
	 */
	var requestAnimationFrame = window.requestAnimationFrame 		|| 
								window.webkitRequestAnimationFrame  || 
								window.mozRequestAnimationFrame 	|| 
								window.oRequestAnimationFrame		|| 
								window.msRequestAnimationFrame 		||
								function(callback, element) {
									window.setTimeout(callback, 1000 / 60);
								};

	/**
	 * 通过帧动画对象循环调用func
	 * @param {function} func 按帧循环调用的函数
	 */
	var rafLoop = function(func) {
		var raf = requestAnimationFrame;
		raf(function() {
			func();
			raf(arguments.callee, {});
		}, {});
	}

	var VideoModule = {
		init: function() {
			this.video = document.getElementById('video');
		},

		start: function() {
			if(navigator.getUserMedia) {
				// opera users (hopefully everyone else at some point)
				navigator.getUserMedia({
					video: true,
					audio: true
				}, this.onSuccess, this.onError);
			} else if(navigator.webkitGetUserMedia) {
				// webkit users
				navigator.webkitGetUserMedia({
					video: true
				}, this.onSuccess, this.onError);
			}
		},

		onSuccess: function(stream) {
			console.log(stream);
			if(navigator.webkitGetUserMedia) {
				video.src = webkitURL.createObjectURL(stream);
			} else {
				video.src = stream;
			}
			// ImageModule.baseCanvas.getContext('2d').drawImage(video, 0, 0);
			// setTimeout(function() {
			// 	setInterval(function() {
			// 		ImageModule.screenCanvas.getContext('2d').drawImage(video, 0, 0);
			// 		var screenImageData = ImageModule.getImageData(ImageModule.screenCanvas);
			// 		var grayImageData = ImageModule.getGrayImageData(screenImageData);
			// 		var resData = ImageModule.start().data;
			// 		ImageModule.grayCanvas.getContext('2d').putImageData(grayImageData, 0, 0);
			// 		ImageModule.compareCanvas.getContext('2d').putImageData(resData, 0, 0);
			// 	}, 100);
			// }, 2000);
			var lastImageData = 0;
			var frameCount = 0;
			
			rafLoop(function(){
				ImageModule.compareCanvas.style.width = getComputedStyle(video).width;
			ImageModule.compareCanvas.style.height = getComputedStyle(video).height;
				frameCount ++;
				ImageModule.baseCanvas.getContext('2d').drawImage(video, 0, 0);
				var width = ImageModule.baseCanvas.width;
				var height = ImageModule.baseCanvas.height;
				var curImageData = ImageModule.baseCanvas.getContext('2d').getImageData(0,0,width,height);
				if(!lastImageData){
					lastImageData = curImageData;
				}
				var resData = ImageModule.baseCanvas.getContext('2d').createImageData(width,height);
				ImageModule.differenceAccuracy(resData.data, lastImageData, curImageData);
				//ImageModule.differenceAccuracy(resData, lastImageData, curImageData);
				ImageModule.compareCanvas.getContext('2d').putImageData(resData,0,0);
				
				lastImageData = curImageData;	
			});
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