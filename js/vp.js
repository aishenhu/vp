setInterval(function(){
	canvas.width = parseInt(getComputedStyle(video).width);
	canvas.height = parseInt(getComputedStyle(video).height);
	canvas.getContext('2d').drawImage(video, 0, 0);
},20);