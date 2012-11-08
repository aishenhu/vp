Jx().$package('vp.img', function(J){
	var $E = J.event;
	var init = function(){
		var base = new Image(),
			baseCanvas = document.createElement('canvas'),
			baseData,
			screen = new Image(),
			screenCanvas = document.createElement('canvas'),
			screenData;
		baseCanvas.id = 'baseCanvas';
		screenCanvas.id = 'screenCanvas';
		document.body.appendChild(baseCanvas);
		document.body.appendChild(screenCanvas);
		var ctx = baseCanvas.getContext('2d');
		var ctx2 = screenCanvas.getContext('2d');
		base.onload = function(){
			baseCanvas.width = base.width;
			baseCanvas.height = base.height;
			ctx.drawImage(base,0,0);
			baseData = ctx.getImageData(0,0, baseCanvas.width, baseCanvas.height).data;
			onImageLoad();
			//console.log(str);
		}
		base.setAttribute('src', 'assets/base.png');
		screen.onload = function(){
			screenCanvas.width = screen.width;
			screenCanvas.height = screen.height;
			ctx2.drawImage(screen,0,0);
			screenData = ctx2.getImageData(0,0, screenCanvas.width, screenCanvas.height).data;
			//console.log(str);
			onImageLoad();
		}
		screen.setAttribute('src', 'assets/screen.png');

		var loadCount = 0;
		function onImageLoad(){
			loadCount ++;
			if(loadCount == 2){
				processImageCompare();
			}
		}

		function processImageCompare(){
			console.log(baseData.length, screenData.length);
			var step = 1;
			
		}
	}

	$E.onDomReady(init);
});