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
			baseData = ctx.getImageData(0,0, baseCanvas.width, baseCanvas.height);
			onImageLoad();
			//console.log(str);
		}
		base.setAttribute('src', 'assets/base.png');
		screen.onload = function(){
			screenCanvas.width = screen.width;
			screenCanvas.height = screen.height;
			ctx2.drawImage(screen,0,0);
			screenData = ctx2.getImageData(0,0, screenCanvas.width, screenCanvas.height);
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
			console.log('data length:',baseData.data.length, screenData.data.length);
			var step = 1;
			var diffcount = 0;
			var tStart = +new Date();
			for(var i = 0; i < baseData.data.length; i = i +  4 * step){
				var baseGray = (baseData.data[i]*0.299 + baseData.data[i+1] * 0.587 + baseData.data[i+2] * 0.114)/3;
				baseData.data[i] = baseData.data[i+1] =baseData.data[i+2] = baseGray;
				var screenGray = (screenData.data[i]*0.299 + screenData.data[i+1] * 0.587 + screenData.data[i+2] * 0.114)/3;
				screenData.data[i] = screenData.data[i+1] =screenData.data[i+2] = screenGray;
				var bd = baseData.data[i] + baseData.data[i+1] + baseData.data[i+2] + baseData.data[i+3];
				var sd = screenData.data[i] + screenData.data[i+1] + screenData.data[i+2] + screenData.data[i+3];
				if(bd - sd > 10){
					diffcount ++;
					screenData.data[i]= 0;
					screenData.data[i+1]= 0;
					screenData.data[i+2]= 0;
					screenData.data[i+3]= 255;
				}else{
					screenData.data[i]= 255;
					screenData.data[i+1]= 255;
					screenData.data[i+2]= 255;
					screenData.data[i+3]= 255;
				}
				
			}
			var tEnd = +new Date();
			console.log('duration:',tStart, tEnd, tEnd-tStart);
			console.log('diffcount:', diffcount, diffcount/4, Math.sqrt(diffcount/4));
			ctx2.putImageData(screenData, 0,0);
		}
	}

	$E.onDomReady(init);
});