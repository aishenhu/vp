;
window.onload = function() {
	// var canvas = document.getElementById('canvas');
	// var srcImg = document.getElementById('preloader');
	// canvas.width = 320;
	// canvas.height = 320;
	// var ctx = canvas.getContext('2d');
	// ctx.drawImage(srcImg, 0, 0);

	// var t1 = +new Date();
	// var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	// console.log(imgData.data.length, 320*320);
	// var step = 1;
	// for (var i=0;i<imgData.data.length;i+= 4*step)
	// {
	// 	if(imgData.data[i+3]==0){
	// 		imgData.data[i]=0;
	//   		imgData.data[i+1]=0;
	//   		imgData.data[i+2]=0;
	// 	}else{
	// 		imgData.data[i]=255-imgData.data[i];
	//   		imgData.data[i+1]=255-imgData.data[i+1];
	//   		imgData.data[i+2]=255-imgData.data[i+2];
	// 	}
	// 	imgData.data[i+3]=255;
	// }
	// var t2 = +new Date();
	// var duration = t2 - t1;
	// console.log(duration, duration/1000);
	// ctx.putImageData(imgData,0,0);
	// 
	(function() {
		var $p = new Processing(document.getElementById('pcanvas'));
		console.log($p);
		var i = 0;
		$p.draw = function() {
			console.log('$p.draw called');
			$p.rect(20,20,100,100);
			//$p.size(200, 200, $p.OPENGL);
			$p.noStroke();
			$p.background(50);
			$p.lights();
			$p.translate($p.width / 2 + 30, $p.height / 2, 0);
			$p.rotateX(-$p.PI / 6);
			$p.rotateY($p.PI / 3 + 210 / $p.parseFloat($p.height) * $p.PI);
			$p.box(45);
			$p.translate(0, 0, -50 + i ++);
			$p.box(30);
			console.log('canvas:',$p.externals.canvas.getContext('2d'));
			var context = $p.externals.canvas.getContext('2d');
			context.drawText('Hello, world!');
		}

		$p.setup = function() {
			console.log('$p.setup called');
			$p.size(200, 200,$p.OPENGL);
			$p.noStroke();
			$p.frameRate( 60 );
			$p.fill(255);
		}

		$p.setup();

	})();

}