Jx().$package('Wallcoming.door', function(J){
    var $D = J.dom,
        $E = J.event;

    this.init = function(){

    };

    this.openDoor=function(callback){
        var mainLeft = document.getElementById("mainLeft");
        var mainRight = document.getElementById("mainRight");

        $D.addClass(mainLeft, 'mainLeftGo');
        $D.addClass(mainRight, 'mainRightGo');

        $E.on(mainRight,'webkitAnimationEnd',callback);
    },

    this.handChange=function(){
        var rightHand = document.getElementById('rightHand');
        var leftHand = document.getElementById('leftHand');
    }
});