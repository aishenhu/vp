Jx().$package("WallComing.class",function(J) {
	var cg=J.cnGame,
	input=cg.input,
	$D = J.dom,
	$E = J.event,
	config=WallComing.config,
	srcObj=config.srcObj,
	SpriteSheet=cg.SpriteSheet;

    function bezier(points, pos) {
        var n = points.length,
        r = [],
        i,
        j
        for (i = 0; i < n; ++i) {
            r[i] = [points[i][0], points[i][1]]
        }
        for (j = 1; j < n; ++j) {
            for (i = 0; i < n - j; ++i) {
                r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0]
                r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1]
            }
        }
        return [r[0][0], r[0][1]];
    };


	var Wall=new J.Class({extend:cg.Sprite},{
		init:function(options){
			Wall.superClass.init.call(this,options);
			this.z=options.z;
			this.speedZ=options.speedZ||0;
			this.speed=options.speed||Vector2.zero;
			this.ori_z=this.z;
			this.ori_x=this.pos.x;//z为0的时候的坐标
			this.ori_y=this.pos.y;
			this.center=options.center;
			this.za=options.za;
			this.size=[this.image.width,this.image.height];
			this.speed=[Vector2.zero,0];
			this.hasMovedDuration=0;
			this.moveSumDuration=6;
			this.center.y-=100;
			this.maxZ=100;
		},
		update:function(duration){
		
			var za=this.za;
			var center=this.center;
			var scale=(center.x+this.z)/center.x;
			this.scale=scale;
			this.speedZ=this.speedZ+za*duration;
			//this.z+=this.speedZ*this.scale*duration;
			this.hasMovedDuration+=duration;
			this.z=bezier([[0,this.ori_z],[0,0.72*this.maxZ],[0,0.42*this.maxZ],[this.moveSumDuration,this.maxZ]],this.hasMovedDuration/this.moveSumDuration)[1];
	
			Wall.superClass.update.call(this,duration);
			if(this.z>this.maxZ) this.disappear();

		},
		draw:function(){
			var w=this.size[0],h=this.size[1],center=this.center,scale=this.scale,x=this.pos.x,y=this.pos.y;

			var x=(x - center.x) * scale + center.x;
			var y=(y - center.y) * scale + center.y;
			var s=[ w * scale , h * scale ];
			var img=this.image;
			var ctx=cg.context;

			ctx.save();
			cg.view.apply(ctx);
			ctx.translate(x,y);
			ctx.rotate(this.angle*-1);
			ctx.drawImage(img,0,0,img.width,img.height,-s[0]/2,-s[1]/2,s[0],s[1]);
			ctx.restore();

		},
		disappear:function(){
			this.isDisappear=true;
		}
	});

	this.Wall=Wall;
});