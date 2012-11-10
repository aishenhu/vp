var ImageModule = {
	init: function() {
		var $ = function(id){
			return document.getElementById(id);
		}
		this.baseCanvas = $('base');
		this.screenCanvas = $('screen');
		this.compareCanvas = $('compare');
		//this.baseCanvas.getContext("2d").drawImage($("baseImg"),0,0);
		//this.screenCanvas.getContext("2d").drawImage($("screenImg"),0,0);
		//this.start();
	},

	processCompare: function(baseData, screenData) {
		//var now = +new Date();
		//this.filtering(baseData, 3);
		//this.filtering(screenData, 3);

		var baseD = baseData.data,
			screenD = screenData.data,
			width = screenD.width,
			height = screenD.height;
		var diffcount = 0;
		var range = 40;

		for (var i = 0, len = screenD.length; i < len; i = i + 4) {
			var grayB = baseD[i]*0.3 + baseD[i+1]*0.59 + baseD[i+2]*0.11;
				grayR = screenD[i]*0.3 + screenD[i+1]*0.59 + screenD[i+2]*0.11;
				value = Math.abs(grayR - grayB)>range? 0 : 255;
			screenD[i] = value;
			screenD[i + 1] = value;
			screenD[i + 2] = value;
			screenD[i + 3] = Math.abs(grayR - grayB)>range? 255 : 0;
		}

		//this.swell(screenData, 3);
		//this.corrosion(screenData, 3);
		//console.log((+new Date())-now);
		this.compareCanvas.getContext('2d').putImageData(screenData,0,0);
	},

	//暂时支持尺寸为3和5的窗口
	filtering: function(imgdata, size){
		var data = imgdata.data,
			newdata = [],
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
				sum = data[i];
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

			newdata[i] = sum;
			newdata[i+1] = sum;
			newdata[i+2] = sum;
			newdata[i+3] = data[i+3];
		}

		for(i = 0;i<len;i++){
			data[i]=newdata[i];
		}
	},

	corrosion: function(imgdata, size){
		var data = imgdata.data,
			newdata = [],
			width = imgdata.width,
			height = imgdata.height,
			index,
			row,
			column,
			size = size || 3,
			value = (size-1)/2,
			sum,
			i,
			len;


		for(i = 0, len = data.length; i<len; i=i+4){
			index = Math.ceil(i/4);
			row = Math.ceil(index/width);
			column = index%width;
			if( row <= value || row > height-value || column <= value || column >= width-value){
				sum = data[i];
			}else {
				sum = 0;
				sum += data[(index-2)*4] + data[(index-1)*4] + data[index*4];
				sum += data[(index-2-width)*4] + data[(index-1-width)*4] + data[(index-width)*4];
				sum += data[(index-2+width)*4] + data[(index-1+width)*4] + data[(index+width)*4];
				if(sum != 0){
					sum = 255;
				}			
			} 

			newdata[i] = sum;
			newdata[i+1] = sum;
			newdata[i+2] = sum;
			newdata[i+3] = sum == 255? 0: 255;
		}

		for(i = 0;i<len;i++){
			data[i]=newdata[i];
		}
	},

	swell: function(imgdata){
		var data = imgdata.data,
			newdata = [],
			width = imgdata.width,
			height = imgdata.height,
			index,
			row,
			column,
			size = size || 3,
			value = (size-1)/2,
			sum,
			i,
			len;


		for(i = 0, len = data.length; i<len; i=i+4){
			index = Math.ceil(i/4);
			row = Math.ceil(index/width);
			column = index%width;
			if( row <= value || row > height-value || column <= value || column >= width-value){
				sum = data[i];
			}else {
				sum = data[(index-2)*4] & data[(index-1)*4] & data[index*4];
				sum = data[(index-2-width)*4] & data[(index-1-width)*4] & data[(index-width)*4];
				sum = data[(index-2+width)*4] & data[(index-1+width)*4] & data[(index+width)*4];
				if(sum != 0){
					sum = 255;
				}			
			} 

			newdata[i] = sum;
			newdata[i+1] = sum;
			newdata[i+2] = sum;
			newdata[i+3] = sum == 255? 0: 255;
		}

		for(i = 0;i<len;i++){
			data[i]=newdata[i];
		}
	},

	start: function() {
		var baseData = this.baseCanvas.getContext('2d').getImageData(0,0,this.baseCanvas.width, this.baseCanvas.height);
		var screenData = this.screenCanvas.getContext('2d').getImageData(0,0,this.screenCanvas.width, this.screenCanvas.height);

		this.processCompare(baseData, screenData);
	}
}