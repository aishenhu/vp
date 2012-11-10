;
window.onload = function() {
	var J = Jx();
	var $D = J.dom,
		$E = J.event;
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
			setTimeout(function() {
				ImageModule.baseCanvas.getContext('2d').drawImage(video, 0, 0, 1024, 768);
				setInterval(function() {
					ImageModule.screenCanvas.getContext('2d').drawImage(video, 0, 0, 1024, 768);
					ImageModule.start();
					//ImageModule.compareCanvas.getContext('2d').putImageData(resData, 0, 0);
					//console.log(1);
				}, 100);
			}, 5000);
		},

		onError: function(error) {
			console.log(error);
		}
	}
	// ImageModule.init();
	// VideoModule.init();
	// VideoModule.start();
	Wallcoming.door.openDoor(function(){
		//do something when the door is open
		$D.removeClass(document.getElementById('canvasWrap'), 'hidden');
		$D.addClass(Wallcoming.effects.canvas,'hidden');
		ImageModule.init();
		VideoModule.init();
		VideoModule.start();
		WallComing.time.startGame();
	});

	Wallcoming.effects.init();
	setTimeout(function(){
		Wallcoming.effects.showBall();

	},200);
}