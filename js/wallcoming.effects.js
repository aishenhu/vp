;
Jx().$package('Wallcoming.effects', function(J) {
	var $D = J.dom,
		$E = J.event;
	var canvas = document.getElementById('pcanvas');
	canvas.width = 320;
	canvas.height = 320;

	var init = function() {
			this.canvas.style.left = parseInt($D.getStyle(document.body, 'width')) / 2 - this.canvas.width / 2 + 'px';
			this.canvas.style.top = '150px';
		}

		// var showBall = function() {
		// 	var $p = new Processing(this.canvas);
		// 	var pos = [];
		// 	$p.setup = function() {
		// 		$p.size(300, 1000);
		// 		$p.background(36,20,7,0);
		// 		$p.frameRate(60);
		// 		pos = [];
		// 		for(var i = 0; i < 10; i ++){
		// 			pos[i] = new $p.PVector(50 + (i % 2) * 100,i*100);
		// 		}
		// 	}
		// 	$p.draw = function() {
		// 		$p.noStroke();
		// 		$p.fill(36,20,7,0);
		// 		$p.rect(0, 0, $p.width, $p.height);
		// 		//$p.translate($p.width / 2, $p.height / 2);
		// 		var idx = $p.parseInt($p.frameCount / 20) % 1000;
		// 		idx = idx > 1000 ? 0 : idx;
		// 		var idx2 = $p.parseInt(($p.frameCount + 100) / 20) % 1000;
		// 		idx2 = idx2 > 1000 ? 0 : idx2;
		// 		var ofs = $p.frameCount % 20;
		// 		var x = pos[idx].x + $p.parseFloat(ofs) * (pos[idx + 1].x - pos[idx].x) / 20;
		// 		var y = pos[idx].y + $p.parseFloat(ofs) * (pos[idx + 1].y - pos[idx].y) / 20;
		// 		$p.fill(33, 33, 33);
		// 		$p.ellipse(x, y, 10, 10);
		// 		// var x2 = pos[idx2].x + $p.parseFloat(ofs) * (pos[idx2 + 1].x - pos[idx2].x) / 20;
		// 		// var y2 = pos[idx2].y + $p.parseFloat(ofs) * (pos[idx2 + 1].y - pos[idx2].y) / 20;
		// 		// $p.fill(255, 255, 0);
		// 		// $p.ellipse(x2, y2, 10, 10);
		// 	}
		// 	$p.setup();
		// }

		// var showBall = function() {
		// 	var pcanvas = document.getElementById('pcanvas');
		// 	var $p = new Processing(document.getElementById('pcanvas'));
		// 	var i = 0;
		// 	$p.draw = function() {
		// 		console.log('$p.draw called');
		// 		$p.fill(23,127,123)
		// 		$p.background(0,0);
		// 		$p.camera();
		// 		$p.pushMatrix();
		// 		$p.noStroke();
		// 		$p.lights();
		// 		$p.translate($p.width / 2, $p.height / 2 + 50, 0);
		// 		$p.rotate(15);
		// 		$p.rotateX(-$p.parseFloat($p.frameCount/20));
		// 		$p.rotateY($p.parseFloat($p.frameCount/60));
		// 		$p.fill(76,184,72);
		// 		$p.box(60);			
		// 		$p.popMatrix();
		// 		$p.lights();
		// 		$p.translate($p.width/2,$p.height /2 -50 );
		// 		$p.textSize(32);
		// 		$p.fill(255,7,123)
		// 		//$p.rotateY($p.frameCount / 20);
		// 		var str = "TENCENT ALLOY TEAM";
		// 		$p.text(str,-$p.textWidth(str)/2,0);
		// 	}
		// 	$p.setup = function() {
		// 		console.log('$p.setup called');
		// 		$p.size(300, 300,$p.OPENGL);
		// 		$p.noStroke();
		// 		$p.frameRate( 60 );
		// 		$p.background(0,0);
		// 		//$p.textFont($p.createFont('微软雅黑',32,true));
		// 	}
		// 	$p.setup();
		// }
	var showBall = function() {
			var $p = new Processing(document.getElementById('pcanvas'));
			var pos = null;
			var dir = null;
			var age = null;

			function setup() {
				$p.background(0, 0);
				$p.size(300, 300);
				$p.smooth();
				$p.frameRate(60);
				pos = $p.createJavaArray('$p.PVector', [30]);
				dir = $p.createJavaArray('$p.PVector', [30]);
				age = $p.createJavaArray('int', [30]);
				for(var i = 0; i < 40; i++) {
					pos[i] = new $p.PVector(150, 150);
					var v = new $p.PVector($p.random($p.width) - 150, $p.random($p.height) - 150);
					v.normalize();
					dir[i] = v;
					age[i] = -$p.__int_cast($p.random(100));
				}
			}
			$p.setup = setup;

			function draw() {
				$p.background(0, 0);
				$p.noFill();
				for(var i = 0; i < 30; i++) {
					if(age[i] > 0) {
						$p.stroke(255, 255, 0, 255 - age[i] * 2);
						$p.fill(100, 100, 0, 255 - age[i] * 2);
						$p.pushMatrix();
						$p.translate(pos[i].x, pos[i].y);
						var s = $p.sqrt(age[i]) / 4;
						$p.scale(s, s);
						$p.beginShape();
						for(var j = 0; j < 10; j++) {
							var a = j * $p.TWO_PI / 10;
							var r = j % 2 == 0 ? 2 : 6;
							$p.vertex(r * $p.cos(a), r * $p.sin(a));
						}
						$p.endShape($p.CLOSE);
						$p.popMatrix();
						pos[i].add(dir[i]);
					}
					age[i]++;
					if(age[i] > 100) {
						age[i] = 0;
						pos[i] = new $p.PVector(150, 150);
						var v = new $p.PVector($p.random($p.width) - 150, $p.random($p.height) - 150);
						v.normalize();
						dir[i] = v;
					}
				}
			}
			$p.draw = draw;
			$p.setup();

			// (function() {
			// 	var ballcanvas = document.createElement('canvas');
			// 	ballcanvas.id = 'ballcanvas';
			// 	document.body.appendChild(ballcanvas)
			// 	var $p = new Processing(document.getElementById('ballcanvas'));
			// 	var x = 0,
			// 		y = 0;
			// 	var dir = 0;
			// 	$p.draw = function() {
			// 		$p.noStroke();
			// 		$p.fill(0, 20);
			// 		$p.rect(0, 0, $p.width, $p.height);
			// 		//$p.translate($p.width / 2, $p.height / 2);
			// 		$p.fill(255, 255, 0);
			// 		if (x == 200) {
			// 			dir = 1;
			// 		} else if (x == 0) {
			// 			dir = 0;
			// 		}
			// 		if (dir == 1) {
			// 			x -= 2;
			// 			y -= 2;
			// 		} else if (dir == 0) {
			// 			x += 2;
			// 			y += 2;
			// 		}
			// 		$p.ellipse(x, y, 10, 10);
			// 	}
			// 	$p.setup = function() {
			// 		$p.size(300, 300);
			// 		$p.frameRate(60);
			// 		$p.background(0);
			// 	}
			// 	$p.setup();
			// })();
			// (function() {
			// 	var ballcanvas2 = document.createElement('canvas');
			// 	ballcanvas2.id = 'ballcanvas2';
			// 	document.body.appendChild(ballcanvas2);
			// 	var $p = new Processing(document.getElementById('ballcanvas2'));
			// 	var pos = [];
			// 	$p.setup = function() {
			// 		$p.size(300, 300);
			// 		$p.background(0);
			// 		$p.frameRate(60);
			// 		pos = [];
			// 		for (var i = 0; i < 1000; i++) {
			// 			// var r = i % 2 == 0 ? 50 : 100;
			// 			// var a = i * $p.TWO_PI / 10;
			// 			// pos[i] = new $p.PVector($p.cos(a) * r, $p.sin(a) * r);
			// 			pos[i] = new $p.PVector($p.random(10, 200), $p.random(10, 200));
			// 		}
			// 	}
			// 	$p.draw = function() {
			// 		$p.noStroke();
			// 		$p.fill(0, 20);
			// 		$p.rect(0, 0, $p.width, $p.height);
			// 		//$p.translate($p.width / 2, $p.height / 2);
			// 		var idx = $p.parseInt($p.frameCount / 20) % 1000;
			// 		idx = idx > 1000 ? 0 : idx;
			// 		var idx2 = $p.parseInt(($p.frameCount + 100) / 20) % 1000;
			// 		idx2 = idx2 > 1000?0 : idx2;
			// 		var ofs = $p.frameCount % 20;
			// 		var x = pos[idx].x + $p.parseFloat(ofs) * (pos[idx + 1].x - pos[idx].x) / 20;
			// 		var y = pos[idx].y + $p.parseFloat(ofs) * (pos[idx + 1].y - pos[idx].y) / 20;
			// 		$p.fill(255, 255, 0);
			// 		$p.ellipse(x, y, 10, 10);
			// 		// var x2 = pos[idx2].x + $p.parseFloat(ofs) * (pos[idx2 + 1].x - pos[idx2].x) / 20;
			// 		// var y2 = pos[idx2].y + $p.parseFloat(ofs) * (pos[idx2 + 1].y - pos[idx2].y) / 20;
			// 		// $p.fill(255, 255, 0);
			// 		// $p.ellipse(x2, y2, 10, 10);
			// 	}
			// 	$p.setup();
			// })();
		}
	this.canvas = canvas;
	this.init = init;
	this.showBall = showBall;
});