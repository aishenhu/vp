Jx().$package("WallComing",function(J) {
	var $D = J.dom,
		$E = J.event,
		bg,
		player,
		cg=J.cnGame,
		config=WallComing.config,
		srcObj=config.srcObj,
		Wall=WallComing.class.Wall,
		Sp=cg.Sprite,
		SL=cg.SpriteList,
		TextManager=WallComing.TextManager;


	//初始化框架
	J.cnGame.init("canvas", { size:[1024,768],isScaleBg:false,fps:60,tps:60});
var isShow=true;
	function showEffect(target,className){
		target.className="";
		setTimeout(function(){
			target.className=className;
		},0);
		isShow=false;

	}

	var bgChangeDuration=0.5;
	var bgt=0;
	var bgArr=["b0","b1"];
	var bgIndex=0;


	window.sound=null;
	window.sound1=function(type,flag){
		var sound=window.sound;
		flag&&sound && ($D.id("audio_"+sound).pause());

		$D.id("audio_"+type).play();
		window.sound = type;
	}

	var bgChangeDuration=0.5;
	var bgt=0;
	var bgArr=["b0","b1"];
	var bgIndex=0;

	var wallIndex=0;
	var wallArr=["w1","w2","w3","w4","w5","w6","w7","w8"];

	var wallDuration=2;
	var wallt=0;

	var gameObj={
		initialize:function(){
			window.beginWall=true;
			var self=this;
			//精灵列表
			this.spriteList=new SL();
			this.centerPoint=[cg.size[0]/2,cg.size[1]/2];
			// TextManager.init("canvas","text_Canvas","#000");
			// TextManager.changeStr("321");

			this.createWall();

			this.compare=$D.id("compare");
			window.sound1("play",1);
			 // window.sound1("score");
			
		},
		createWall:function(){
			var wall = new Wall({
				src:srcObj[wallArr[wallIndex]],
				size:[200,150],
				pos:new Vector2(
					this.centerPoint[0],
					this.centerPoint[1]
				),
				center:new Vector2(
					this.centerPoint[0],
					this.centerPoint[1]
				),
				za:0,
				z:-250
			});
			this.spriteList.add(wall);
			this.wall=wall;
		},
		update:function(duration){
			bgt+=duration;
			if(bgt>=bgChangeDuration) {
				this.bgImg=cg.loader.loadedImgs[srcObj[bgArr[bgIndex]]];

				bgt=0;
				bgIndex++;
				if(bgIndex==2) bgIndex=0;
			}

			var spriteList=this.spriteList;
			//精灵更新
			spriteList.update(duration);

			//碰撞检测
			var list=spriteList.get();

			if(this.wall&&this.wall.isDisappear){
				spriteList.remove(this.wall);
				//检测
			
				var r=ImageModule.compareAlpha(
					this.compare.getContext("2d").getImageData(
						0,
						0,
						this.compare.width,
						this.compare.height
					),
					cg.context.getImageData(
						0,
						0,
						cg.canvas.width,
						cg.canvas.height
					)
				);
				//alert(r);
				//console.log(r);
				//Perfect
				// if(r.rate < 0.1&&isShow && r.invokeCount > 30000){
				// 	window.sound1("score");
				// 	var key = Math.random() * 10;
				// 	if(key > 4){
				// 		showEffect($D.id("perfect"),"perfect");
				// 	}else{
				// 		showEffect($D.id("bad"),"bad");
				// 	}
				// }else if(r.rate < 0.13&&isShow&& r.invokeCount > 30000){//Good
				// 	window.sound1("score");
				// 	var key = Math.random() * 10;
				// 	if(key > 4){
				// 		showEffect($D.id("good"),"good");
				// 	}else{
				// 		showEffect($D.id("bad"),"bad");
				// 	}
				// }else if(r.rate < 0.15&&isShow&& r.invokeCount > 30000){//pass
				// 	window.sound1("score");
				// 	showEffect($D.id("bad"),"bad");
				// }else if(isShow){//Fail
				// 	window.sound1("score");
				// 	showEffect($D.id("crush"),"crush");
				// }
				// 
				if(r.rate < 0.07&&isShow && r.invokeCount > 20000){
					window.sound1("score");
					var key = Math.random() * 10;
					if(key > 4){
						showEffect($D.id("good"),"good");
					}else{
						showEffect($D.id("bad"),"bad");
					}
				}else if(r.rate < 0.15&&isShow&& r.invokeCount > 20000){//Good
					window.sound1("score");
					var key = Math.random() * 10;
					if(key > 8){
						showEffect($D.id("good"),"good");
					}else{
						showEffect($D.id("bad"),"bad");
					}
				}else if(isShow){//Fail
					window.sound1("score");
					showEffect($D.id("crush"),"crush");
					
				}

				wallIndex++;
				if(wallIndex==wallArr.length){
					wallIndex=0;
				}

				wallt+=duration;
				if(wallt>wallDuration){
					isShow=true;
					this.createWall();
					wallt=0;
					window.beginWall=true;
				}
			
			}

			//$D.id("fps").innerHTML="FPS:"+cg.loop.avgFPS;
		},
		draw:function(){
			// var _img=cg.loader.loadedImgs[srcObj.test];
			// cg.context.drawImage(_img,0,0,_img.width,_img.height,250,200,400,300);
			//绘制
			// var bgImg=cg.loader.loadedImgs[srcObj.background];
			// cg.context.save();
			// cg.context.globalAlpha=0.5;
			// cg.context.drawImage(bgImg,0,0,bgImg.width,bgImg.height,0,0,bgImg.width,bgImg.height);
			// cg.context.restore();

			// cg.context.save();
			
			// cg.context.drawImage(bgImg,0,0,120,bgImg.height,0,0,120,bgImg.height);
			// cg.context.drawImage(bgImg,904,0,120,bgImg.height,904,0,120,bgImg.height);
			// cg.context.restore();
			// this.spriteList.draw();
			
			//绘制
			var bgImg=this.bgImg||cg.loader.loadedImgs[srcObj["b0"]];
			cg.context.save();
			cg.context.globalAlpha=0.9;
			// var b=$D.id("canvasWrap");
			// var str="url('"+srcObj[bgArr[bgIndex]]+"')";
			// b.style.background=str;
		
			cg.context.drawImage(bgImg,0,0,bgImg.width,bgImg.height,0,0,bgImg.width,bgImg.height);
			cg.context.restore();

			cg.context.save();
			
			cg.context.drawImage(bgImg,0,0,120,bgImg.height,0,0,120,bgImg.height);
			cg.context.drawImage(bgImg,904,0,120,bgImg.height,904,0,120,bgImg.height);
			cg.context.restore();
			this.spriteList.draw();
		}
	}
	this.gameObj=gameObj;
	// //资源加载
	// cg.loader.start(gameObj, { 
	// 	srcArray: srcObj
	// });
});