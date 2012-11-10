var ImageModule = {
	init: function() {
		var $ = function(id){
			return document.getElementById(id)
		}
		this.baseCanvas = $('base');
		this.screenCanvas = $('screen');
		this.compareCanvas = $('compare');
		this.grayCanvas = $('gray');
	},

	getImageData: function(canvas){
		return canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height);
	},

	getGrayImageData: function(imageData){
		for(var i = 0; i < imageData.data.length; i = i + 4){
			var grayData = imageData.data[i] * 0.299 + imageData.data[i]*0.587 + imageData.data[i]* 0.114;
			imageData[i] = grayData;
			imageData[i+1] = grayData;
			imageData[i+2] = grayData;
		}
		return imageData;
	},

	processCompare: function(baseData, screenData) {
		console.log('data length:', baseData.data.length, screenData.data.length);
		var resData = screenData;
		var step = 1;
		var diffcount = 0;
		var tStart = +new Date();
		var range = 20;
		baseData = this.getGrayImageData(baseData);
		screenData = this.getGrayImageData(screenData);
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

	differenceAccuracy: function(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		function fastAbs(value) {
			// funky bitwise, equal Math.abs
			return (value ^ (value >> 31)) - (value >> 31);
		}

		function threshold(value) {
			return (value > 0x15) ? 0xFF : 0;
		}
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	},
	compare: function(baseData, screenData) {
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