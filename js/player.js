var unlock = document.querySelector('.playerfooter .status .statusa .statusb a');
// console.log(unlock);
var playerfooter = document.querySelector('.playerfooter');
// console.log(playerfooter)
// 鼠标进入底部如果不锁定改变bottom显示
playerfooter.onmouseenter = function () {
    if (unlock.className == 'active') {
        // 
        $('.playerfooter').stop().animate({ bottom: 0 }, 1000);
    }
}

// 鼠标离开底部如果不锁定恢复bottom值
playerfooter.onmouseleave = function () {
    if (unlock.className == 'active') {
        $('.playerfooter').stop().animate({ bottom: -46 }, 1000);
        // playerfooter.style.bottom = '-46px';
    }
}

// 鼠标点击锁定按钮改变状态
unlock.onclick = function () {
    if (unlock.className == 'activea') {
        this.className = 'active';
        this.style.display = 'block';
    } else if (unlock.className == 'active') {
        this.className = 'activea';
        this.style.display = 'block';
    }
}


//     overflow  : scroll;
//     overflow-y: hidden;
// 添加点击事件，点击播放列表后打开网页播放器
var onplayer = document.querySelector('.playerfooter .playermain .scroll .menu ul li:nth-child(6) a');
var playercontnet = document.querySelector('.playercontent');
var content = document.querySelector('.content');
var buga = document.querySelector('.playerfooter .status .statusa .statusb');
var body = document.querySelector('body');
// var bgcolor = document.querySelector('.content');
onplayer.onclick = function () {
    playercontnet.style.display = 'block';
    body.style.overflow = 'scroll';
    body.style.overflow = 'hidden';
    buga.style.right = '-637px';
    $('.playercontent').animate({ height: 647 }, 1000);
    unlock.className = 'active';
    $('.content').css('background-color', 'rgba(0, 0, 0, 0.8)');
    timer = setInterval(function () {                               //6

        var dtop = document.documentElement.scrollTop;            //4

        var speed = Math.floor(-dtop / 10);                         //8

        document.documentElement.scrollTop = dtop + speed;        //5、document.documentElement.scrollTop -= dtop;
        //9
        istop = true;                                             //10

        if (dtop == 0) {                                            //7
            clearInterval(timer);
        }
    }, 30)
    // $('.content .contentcenter').css('background-color','rgba(0, 0, 0, 0.8)');
    // // $('.content .contentcenter').css('z-index','99');
    // $('.content .contentcenter .rightcontent').css('background-color','rgba(0, 0, 0, 0.8)');
}


var myVideo = document.getElementById("video1");

function playPause() {
    if (myVideo.paused) {
        myVideo.play();
        myVideo.width = 550;
    }
    else {
        myVideo.pause();
    }
}

function makeBig() {
    myVideo.width = 550;
}

function makeSmall() {
    myVideo.width = 350;
}
var invokeFieldOrMethod = function (element, method) {

    var usablePrefixMethod;

    ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {

        if (usablePrefixMethod) return;

        if (prefix === "") {

            // 无前缀，方法首字母小写

            method = method.slice(0, 1).toLowerCase() + method.slice(1);

        }

        var typePrefixMethod = typeof element[prefix + method];

        if (typePrefixMethod + "" !== "undefined") {

            if (typePrefixMethod === "function") {

                usablePrefixMethod = element[prefix + method]();

            } else {

                usablePrefixMethod = element[prefix + method];

            }

        }

    });



    return usablePrefixMethod;

};



//進入全屏

function launchFullscreen(element) {

    //此方法不可以在異步任務中執行，否則火狐無法全屏

    if (element.requestFullscreen) {

        element.requestFullscreen();

    } else if (element.mozRequestFullScreen) {

        element.mozRequestFullScreen();

    } else if (element.msRequestFullscreen) {

        element.msRequestFullscreen();

    } else if (element.oRequestFullscreen) {

        element.oRequestFullscreen();

    }

    else if (element.webkitRequestFullscreen) {

        element.webkitRequestFullScreen();

    } else {



        var docHtml = document.documentElement;

        var docBody = document.body;

        var videobox = document.getElementById('videobox');

        var cssText = 'width:100%;height:100%;overflow:hidden;';

        docHtml.style.cssText = cssText;

        docBody.style.cssText = cssText;

        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';

        document.IsFullScreen = true;



    }

}

//退出全屏

function exitFullscreen() {

    if (document.exitFullscreen) {

        document.exitFullscreen();

    } else if (document.msExitFullscreen) {

        document.msExitFullscreen();

    } else if (document.mozCancelFullScreen) {

        document.mozCancelFullScreen();

    } else if (document.oRequestFullscreen) {

        document.oCancelFullScreen();

    } else if (document.webkitExitFullscreen) {

        document.webkitExitFullscreen();

    } else {

        var docHtml = document.documentElement;

        var docBody = document.body;

        var videobox = document.getElementById('videobox');

        docHtml.style.cssText = "";

        docBody.style.cssText = "";

        videobox.style.cssText = "";

        document.IsFullScreen = false;

    }

}

document.getElementById('fullScreenBtn').addEventListener('click', function () {

    launchFullscreen(document.getElementById('video1'));

    window.setTimeout(function exit() {

        //檢查瀏覽器是否處於全屏

        if (invokeFieldOrMethod(document, 'FullScreen') || invokeFieldOrMethod(document, 'IsFullScreen') || document.IsFullScreen) {

            exitFullscreen();

        }

    }, 5 * 1000);

}, false);
var source = document.querySelector('source');
console.log(source)



// 音量控制
var ran = document.getElementById("ran");
var myvideo = document.getElementById("video1");
function setvalue() {
    myvideo.volume = ran.value / 100;
    myvideo.muted = false;
}

//进度条展示
var pro=document.getElementById("pro");
function pro1() {
    pro.max = myvideo.duration;
    pro.value = myvideo.currentTime;
}
// var bottomval = playerfooter.style.bottom;
// console.log(bottomval)
// var dsq;
// function move () {
//     window.clearInterval(dsq);
//     dsq = setInterval(function () {
//         var bottomval = playerfooter.style.bottom;
//         // console.log(bottomval)
//         if (bottomval == 0 ) {


//             console.log(bottomval)
//             // if (bottomval == -46) {
//             //     window.clearInterval(dsq);
//             //     return;
//             // }

//          }
        //  bottomval++;
        //  playerfooter.style.bottom = bottomval + 'px'; //else if (bottomval == -46) {
        //     bottomval = bottomval + 2;
        //     playerfooter.style.bottom = bottomval + 'px';
        //     return;
        // }
//     },500)
// }



// unlock.onclick = function () {
//     if (this.className == 'active') {
//         this.className = 'activea';
//         this.style.display = 'block';
//         // playerfooter.style.bottom = '-46px';
//     } else if (this.className == 'activea') {
//         this.className = 'active';
//         this.style.display = 'blcok';
//         // playerfooter.style.bottom = '0px';
//     }
// }
// var topbottom;
// playerfooter.onmouseenter = function () {
//     // clearInterval(topbottom)
//     if (this.className == 'active') {
//         moveElement(playerfooter,-46,10);
//     // } else {
//     //     // clearInterval(topbottom);
//     // }
// }

// playerfooter.onmouseleave = function () {
//     // clearInterval(topbottom)
//     if (this.className == 'activea') {
//         moveElement(playerfooter,0,10);
//     // } else {
//     //     // clearInterval(topbottom);
//     // }

// }

// var dsq
// function moveElement(element,targetval,speed) {
// 	window.clearInterval(dsq)
// 	dsq = window.setInterval(function () {
// 		var bottomval = element.style.bottom;
// 		if (bottomval == targetval) {
// 			window.clearInterval(dsq);
// 			return;
// 		}
// 		bottomval = bottomval +  speed;
// 		element.style.bottom = bottomval + 'px';
// 	}, 100)
// }