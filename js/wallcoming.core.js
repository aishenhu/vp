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

	var bgChangeDuration=0.5;
	var bgt=0;
	var bgArr=["url('images/bg1.jpg')","url('images/bg.png')"];
	var bgIndex=0;

	var wallIndex=0;
	var wallArr=["wall0","wall1","wall2"];
	var gameObj={
		initialize:function(){
			
			var self=this;
			//精灵列表
			this.spriteList=new SL();
			this.centerPoint=[cg.size[0]/2,cg.size[1]/2];
			// TextManager.init("canvas","text_Canvas","#000");
			// TextManager.changeStr("321");

			this.createWall();

			this.compare=$D.id("compare");
			
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
			//bgt+=duration;
			// if(bgt>=bgChangeDuration) {
			// 	cg.canvas.style.background=bgArr[bgIndex];
			
			// 	bgt=0;
			// 	bgIndex++;
			// 	if(bgIndex==2) bgIndex=0;
			// }

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

				if(r.rate < 10%){ //Perfect

				}else if(r.rate < 13%){//Good

				}else if(r.rate < 15%){//pass

				}else{//Fail

				}

				wallIndex++;
				if(wallIndex==wallArr.length){
					wallIndex=0;
				}
				this.createWall();
			}

			//$D.id("fps").innerHTML="FPS:"+cg.loop.avgFPS;
		},
		draw:function(){
			// var _img=cg.loader.loadedImgs[srcObj.test];
			// cg.context.drawImage(_img,0,0,_img.width,_img.height,250,200,400,300);
			//绘制
			var bgImg=cg.loader.loadedImgs[srcObj.background];
			cg.context.save();
			cg.context.globalAlpha=0.5;
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