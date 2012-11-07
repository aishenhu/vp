console.log('worker: vp starts');
console.log(self);
try{
	self.postMessage('vp');
}catch(e){
	console.log('catch:',e);
}

self.onMessage = function(event){
	console.log('recieve:',event);
}
setInterval(function(){
	canvas.width = parseInt(getComputedStyle(video).width);
	canvas.height = parseInt(getComputedStyle(video).height);
	canvas.getContext('2d').drawImage(video, 0, 0);
},20);