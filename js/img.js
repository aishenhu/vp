var ImageModule = {
	init: function() {
		var $ = function(id){
			return document.getElementById(id)
		}
		this.baseCanvas = $('base');
		this.screenCanvas = $('screen');
		this.compareCanvas = $('compare');
	},

	processCompare: function(baseData, screenData) {
		console.log('data length:', baseData.data.length, screenData.data.length);
		var resData = screenData;
		var step = 1;
		var diffcount = 0;
		var tStart = +new Date();
		var range = 20;
		for (var i = 0; i < baseData.data.length; i = i + 4 * step) {
			if (Math.abs(baseData.data[i] - screenData.data[i]) > range || Math.abs(baseData.data[i] - screenData.data[i]) > range || Math.abs(baseData.data[i] - screenData.data[i]) > range) {
				diffcount++;
				resData.data[i] = 0;
				resData.data[i + 1] = 0;
				resData.data[i + 2] = 0;
				resData.data[i + 3] = 255;
			} else {
				resData.data[i] = 255;
				resData.data[i + 1] = 255;
				resData.data[i + 2] = 255;
				resData.data[i + 3] = 255;
			}
		}
		var tEnd = +new Date();
		console.log('duration:', tStart, tEnd, tEnd - tStart);
		console.log('diffcount:', diffcount, diffcount / 4, Math.sqrt(diffcount / 4));
		return {
			data: resData,
			duration: tEnd - tStart
		}
	},

	start: function() {
		var baseData = this.baseCanvas.getContext('2d').getImageData(0,0,this.baseCanvas.width, this.baseCanvas.height);
		var screenData = this.screenCanvas.getContext('2d').getImageData(0,0,this.screenCanvas.width, this.screenCanvas.height);

		return this.processCompare(baseData, screenData);
	},

	denoise: function(imageData){
		var step = 1;
		for(var i = 0; i < imageData.data.length; i = i + 4 * step){
			
		}
	}
}