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
		this.frameCount = this.frameCount || 0;
		this.frameCount ++;
		var now = +new Date();
		//this.filtering(baseData, 3);
		//this.filtering(screenData, 3);

		var baseD = baseData.data,
			screenD = screenData.data,
			width = screenD.width,
			height = screenD.height;
		var diffcount = 0;
		var range = 30;

		for (var i = 0, len = screenD.length; i < len; i = i + 4) {
			var grayB = baseD[i]*0.3 + baseD[i+1]*0.59 + baseD[i+2]*0.11;
				grayR = screenD[i]*0.3 + screenD[i+1]*0.59 + screenD[i+2]*0.11;
				value = Math.abs(grayR - grayB)>range? 0 : 255;
			screenD[i] = value;
			screenD[i + 1] = value;
			screenD[i + 2] = value;
			//resData[i + 3] = 255;
		}

		//this.swell(screenData, 3);
		//this.corrosion(screenData, 3);
		console.log((+new Date())-now);
		this.compareCanvas.getContext('2d').putImageData(screenData,0,0);
	},


	differenceAccuracy: function(target, last, cur) {
		var data1 = last.data;
		var data2 = cur.data;
		var width = last.width;
		var height = last.height;
		var validCount = 0;
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
			if(diff == 0){
				target[4*i + 3 ] = 0;
			}else{
				target[4*i] = 0;
				target[4*i+1] = 0;
				target[4*i+2] = 0;
			}
			++i;
			if(diff != 0){
				validCount ++;
			}
		}

		// if(!this.lastValid) {
		// 	console.log('init lastValid');
		// 	this.lastValid = target;
		// }
		// var rate = validCount*1.0/(width*height);
		// console.log('rate', rate);
		// if(rate < 0.2 ){
		// 	console.log('reset');
		// 	target = this.lastValid;
		// }else{
		// 	console.log('update last valid');
		// 	this.lastValid = target;
		// 	//this.denoise(target, 5, 10);
		// }
		// //取样
		// while (i < (target.length * 0.25)) {
		// 	if(target[4*i] != 0){
		// 		target[4*i] = 255;
		// 		target[4*i+1] = 255;
		// 		target[4*i+2] = 255;
		// 		target[4*i+3] = 0xFF;
		// 	}
		// 	++i;
		// }
		//this.filtering(target, 3);
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

	denoise: function(imageData, step, threshold){
		var width = imageData.width;
		var height = imageData.height;
		var radius = ((step - 1) /2);
		var count = function(i,j){
			var num = 0;
			for(var m = i-raidus; m < i + radius ; m ++){
				for(var n = j - radius ; n < j + radius ; n ++){
					if(imageData.data[m*width + n] == 255){
						count ++;
					}
				}
			}
		}
		for(var i = radius; i < width - radius ; i ++){
			for(var j = radius; j < radius ; j ++){
				if(imageData.data[i*width + j] == 255){
					if(count(i,j) < threshold){
						imageData[i * width + j] = 0;
						imageData[i * width + j + 1] = 0;
						imageData[i * width + j + 2] = 0;
					}
				}
			}
		}
	},

	filtering: function(imgdata, size){
		var data = imgdata.data,
			width = imgdata.width,
			height = imgdata.height,
			index,
			row,
			column,
			size = size || 3,
			value = (size-1)/2,
			sum,
			i,
			len,
			k;


		for(i = 0, len = data.length; i<len; i=i+4){
			index = Math.ceil(i/4);
			row = Math.ceil(index/width);
			column = index%width;
			if( row <= value || row > height-value || column <= value || column >= width-value){
				continue;
			}else {
				sum = 0;
				if(size == 3){
					sum += data[(index-2)*4] + data[(index-1)*4] + data[index*4];
					sum += data[(index-2-width)*4] + data[(index-1-width)*4] + data[(index-width)*4];
					sum += data[(index-2+width)*4] + data[(index-1+width)*4] + data[(index+width)*4];
					sum /= 9;
				}else {
					sum += data[(index-3)*4] + data[(index-2)*4] + data[(index-1)*4] + data[index*4] + data[(index+1)*4];
					sum += data[(index-3-width)*4] + data[(index-2-width)*4] + data[(index-1-width)*4] + data[(index-width)*4] + data[(index+1-width)*4];
					sum += data[(index-3-width*2)*4] + data[(index-2-width*2)*4] + data[(index-1-width*2)*4] + data[(index-width*2)*4] + data[(index+1-width*2)*4];
					sum += data[(index-3+width)*4] + data[(index-2+width)*4] + data[(index-1+width)*4] + data[(index+width)*4] + data[(index+1+width)*4];
					sum += data[(index-3+width*2)*4] + data[(index-2+width*2)*4] + data[(index-1+width*2)*4] + data[(index+width*2)*4] + data[(index+1+width*2)*4];
					sum /= 25;
				}
			} 
			k = (index-1)*4;
			data[k] = sum;
			data[k+1] = sum;
			data[k+2] = sum;
		}
	}

}