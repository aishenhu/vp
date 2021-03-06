Jx().$package("WallComing.time", function(J) {
	var pai2 = Math.PI * 2;
	var index = 0; //Ä¿Ç°¶ÁÈ¡×ÖÄ¸µÄË÷Òý
	var center; //canvasÖÐµã×ø±ê
	var timeId1;
	var timeId2;
	var timeId3;

	var tween = {
		linear: function(t, b, v) {
			return v * t + b;
		}
	}
	var Point = function(opt) {
			this.init(opt);
		}

	this.startGame = function() {
		TextManager.init("time_canvas", "text_canvas", "rgb(153,120,83)");
		TextManager.changeStr("321 ");
	}

	Point.prototype = (function() {
		var dirArr = [1, -1];
		return {
			init: function(opt) {
				var oriParam = this.resetOnZValue(opt.oriPos, opt.oriRadius);
				var currentParam = this.resetOnZValue(opt.pos, opt.oriRadius);

				this.oriPos = oriParam[0]; //³õÊ¼Î»ÖÃ
				this.oriRadius = oriParam[1]; //³õÊ¼°ë¾¶
				this.pos = currentParam[0]; //ÏÖÊ±Î»ÖÃ
				this.radius = currentParam[1]; //ÏÖÊ±°ë¾¶
				this.speed = opt.speed || 0; //ËÙ¶È
				this.angleZ = 0;
				this.angleX = 0;
				this.char = opt.char; //ËùÊôµÄ×ÖÄ¸
			},
			setPos: function(pos) {
				this.pos = pos;
			},
			setDetail: function(newDetail) { //ÉèÖÃÐ¡ÇòÑÕÉ«ÐÅÏ¢
				this.detail = newDetail;
			},
			setOnBack: function(func) {
				this.onBack = func;
			},
			resetOnZValue: function(pos, radius) {
				var z = pos[2];
				var halfWidth = center[0];
				var scale = (halfWidth + z) / halfWidth;
				var newPos = [];
				var newRadius;
				newPos[0] = center[0] + (pos[0] - center[0]) * scale; //¼ÆËãÊÜzÖáÓ°ÏìºóÐ¡ÇòµÄÎ»ÖÃÖµºÍ³ß´ç
				newPos[1] = center[1] - (center[1] - pos[1]) * scale;
				newPos[2] = z;
				newRadius = radius * scale;
				return [newPos, newRadius]; //·µ»ØÐ¡ÇòÊÜXÖáÓ°ÏìºóÐÂµÄ×ø±êºÍ³ß´ç
			},
			randomMove: function() {
				this.angleZ = Math.random() * pai2;
				this.angleX = Math.random() * pai2;
				this.startTime = (new Date()).getTime();
			},
			move: function() {
				var t = (new Date()).getTime() - this.startTime;
				if(this.isRandom) { //Ëæ»úÒÆ¶¯	
					var zSpeed = this.speed * Math.sin(this.angleZ);
					var xySpeed = this.speed * Math.cos(this.angleZ);
					var xSpeed = xySpeed * Math.cos(this.angleX);
					var ySpeed = -xySpeed * Math.sin(this.angleX);
					this.pos[0] = tween.linear(t, this.oriPos[0], xSpeed);
					this.pos[1] = tween.linear(t, this.oriPos[1], ySpeed);
					this.pos[2] = -Math.abs(tween.linear(t, this.oriPos[2], zSpeed));

					var halfWidth = center[0];
					var scale = (halfWidth + this.pos[2]) / halfWidth;
					this.radius = Math.min(20, Math.max(0, this.oriRadius * scale));
					(this.radius > 50) && (this.radius = 0);
				} else { //¸´Î»
					if(t >= this.moveDuration) {
						this.pos[0] = this.oriPos[0];
						this.pos[1] = this.oriPos[1];
						this.pos[2] = this.oriPos[2];
						var halfWidth = center[0];
						var scale = (halfWidth + this.pos[2]) / halfWidth;
						this.radius = Math.max(0, this.oriRadius * scale);
						(this.radius > 50) && (this.radius = 0);
						this.onBack && this.onBack.call(this); //¸´Î»Íê³ÉµÄ»Øµ÷º¯Êý
						return;
					}
					this.pos[0] = tween.linear(t, this.fromPos[0], this.dx / this.moveDuration);
					this.pos[1] = tween.linear(t, this.fromPos[1], this.dy / this.moveDuration);
					this.pos[2] = tween.linear(t, this.fromPos[2], this.dz / this.moveDuration);
					var halfWidth = center[0];
					var scale = (halfWidth + this.pos[2]) / halfWidth;
					this.radius = Math.max(0, this.oriRadius * scale);
					(this.radius > 50) && (this.radius = 0);

				}
			},
			moveBack: function(duration) {
				this.moveDuration = duration;
				this.dx = this.oriPos[0] - this.pos[0];
				this.dy = this.oriPos[1] - this.pos[1];
				this.dz = this.oriPos[2] - this.pos[2];
				this.fromPos = []; //¿ªÊ¼¸´Î»Ê±Ð¡ÇòµÄÎ»ÖÃ
				this.fromPos[0] = this.pos[0];
				this.fromPos[1] = this.pos[1];
				this.fromPos[2] = this.pos[2];
				this.startTime = (new Date()).getTime();

			},
			draw: function(screenCtx) { //»æÖÆÐ¡Çò
				var detail = this.detail;
				screenCtx.fillStyle = "rgba(" + detail[0] + "," + detail[1] + "," + detail[2] + "," + detail[3] / 255 + ")";

				// screenCtx.arc(this.pos[0],this.pos[1],this.radius,0,Math.PI*2,true);
				screenCtx.fillRect(this.pos[0], this.pos[1], this.radius, this.radius, -this.radius / 2, -this.radius / 2, this.radius, this.radius);

				screenCtx.fill();


			}
		}

	})();

	/*	×ÖÄ¸	*/
	var Char = function(charText, scale, textCtx) {
			this.init(charText, scale, textCtx);

		}
	Char.prototype = (function() {
		return {
			init: function(charText, scale, textCtx) {
				var textWidth = textCanvas.width;
				var textHeight = textCanvas.height;
				var screenWidth = screenCanvas.width;
				var screenHeight = screenCanvas.height;
				this.scale = scale || 1;
				this.charText = charText; //×ÖÄ¸ÎÄ±¾
				this.data = textCtx.getImageData(0, 0, textWidth, textHeight).data; //×ÖÄ¸ÏñËØÊý¾Ý
				this.pointsArr = []; //Ð¡ÇòµÄ¼¯ºÏ
				this.backNum = 0; //¸´Î»Ð¡ÇòµÄ¸öÊý
				for(var i = 0; i < textHeight; i++) {
					for(var j = 0; j < textWidth; j++) {

						var data = this.data;
						var r = data[((textWidth * i) + j) * 4];
						var g = data[((textWidth * i) + j) * 4 + 1];
						var b = data[((textWidth * i) + j) * 4 + 2];
						var o = data[((textWidth * i) + j) * 4 + 3];
						var newDetail = [r, g, b, o];

						if(o > 128) {
							//newDetail[3]=255;
							var randomX = Math.random() * screenWidth;
							var randomY = Math.random() * screenHeight;
							var randomZ = Math.random() * 600 - 300;
							//Éú³ÉÐÂµã
							var newPoint = new Point({
								oriPos: [this.scale + j * this.scale * 2, this.scale + i * this.scale * 2, 0],
								pos: [randomX, randomY, randomZ],
								oriRadius: this.scale,
								speed: 0.9,
								char: this
							});
							//¸´Î»ºóµÄ»Øµ÷º¯Êý	
							newPoint.setOnBack(function() {
								var count = this.char.pointsArr.length;
								var charObj = this.char;
								this.isBack = true;
								charObj.backNum++;
								if(charObj.backNum == count) {
									timeId1 = window.setTimeout(function() {
										charObj.randomMovePoints(); //¸´Î»ºóËæ»úÒÆ¶¯
									}, 1000);
									timeId2 = window.setTimeout(function() {
										TextManager.loadText(++index);
									}, 2000);
								}
							});

							newPoint.setDetail(newDetail);
							this.pointsArr.push(newPoint);
						}
					}
				}
			},
			/*	Ëæ»úÒÆ¶¯Ð¡Çò	*/
			randomMovePoints: function() {
				for(var i = 0, len = this.pointsArr.length; i < len; i++) {
					this.pointsArr[i].randomMove();
					this.pointsArr[i].isRandom = true;
				}
			},
			/*	¸´Î»Ð¡Çò	*/
			moveBackPoints: function(duration) {
				for(var i = 0, len = this.pointsArr.length; i < len; i++) {
					this.pointsArr[i].moveBack(duration);
					this.pointsArr[i].isRandom = false;
				}

			},
			/*	ÒÆ¶¯ËùÓÐÐ¡Çò	*/
			moveAllPoints: function() {
				for(var i = 0, len = this.pointsArr.length; i < len; i++) {
					this.pointsArr[i].move();
				}
			},
			/*	»æÖÆËùÓÐÐ¡Çò	*/
			drawAllPoints: function(screenCtx) {
				for(var i = 0, len = this.pointsArr.length; i < len; i++) {
					this.pointsArr[i].draw(screenCtx);
				}
			}

		};
	})();


	var TextManager = (function() {
		return {
			init: function(screenId, textId, textColor) {
				screenCanvas = document.getElementById(screenId);
				textCanvas = document.getElementById(textId);
				center = [screenCanvas.width / 2, screenCanvas.height / 2]; //canvasÖÐµã×ø±ê	
				this.screenCtx = screenCanvas.getContext("2d");
				this.textCtx = textCanvas.getContext("2d");
				this.textColor = textColor;
				this.charArr = [];
				TextManager.update()();
			},
			/*	¸Ä±ä×Ö·û´®	*/
			changeStr: function(text) {
				this.text = text;
				index = 0;
				this.charArr = [];
				this.loadText(index);
			},
			/*	¶ÁÈ¡ÎÄ±¾	*/
			loadText: function(index) {
				var textCtx = this.textCtx;
				var charText = this.text[index]; //µ±Ç°¶ÁÈ¡µÄ×ÖÄ¸ÎÄ±¾
				if(!charText) {
					return;
				}
				textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
				textCtx.fillStyle = this.textColor;
				textCtx.font = 'bold 16px Î¢ÈíÑÅºÚ';
				textCtx.fillText(charText, 12, 16);


				var newChar = new Char(charText, 15, textCtx); //½¨Á¢ÐÂµÄ×ÖÄ¸¶ÔÏó
				newChar.moveBackPoints(1000);
				this.charArr.push(newChar);
				if(index == 3) {
					screenCanvas.style.display = "none";
					textCanvas.style.display = "none";
					document.getElementById("canvas").style.display = "block";
					TextManager = null;
					screenCanvas = null;
					textCanvas = null;
					clearTimeout(timeId1);
					clearTimeout(timeId2);
					clearTimeout(timeId3);
					Jx().cnGame.loader.start(WallComing.gameObj, {
						srcArray: WallComing.config.srcObj
					});
					//资源加载
					//Jx().cnGame.init("canvas", { size:[1024,768],isScaleBg:false,fps:60,tps:60});
					this.charArr = [];
				}
			},
			/*	Ö¡¸üÐÂºÍ»æÖÆ	*/
			update: function() {
				var self = this;
				return function() {
					var screenCtx = self.screenCtx;
					screenCtx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
					screenCtx.fillStyle = "transparent";
					screenCtx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
					//screenCtx.drawImage(0,0,screenCanvas.width,screenCanvas.height);
					for(var i = 0, len = self.charArr.length; i < len; i++) {
						self.charArr[i].moveAllPoints();
						self.charArr[i].drawAllPoints(screenCtx);
					}
					timeId3 = window.setTimeout(arguments.callee, 30);
				}

			}


		}
	})();

});