// 回到顶部
window.onload = function () {                                           //1
    var btn = document.querySelector(".content .btna");                         //2

    var clientHeight = 100;         //11

    var timer = null;                                                 //6

    var istop = true;                                                 //10

    console.log(btn)
    window.onscroll = function () {                                     //10

        var dtop = document.documentElement.scrollTop;
        console.log(dtop)
        console.log(clientHeight)          //11
        if (dtop >= clientHeight) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }

        if (!istop) {                                                 //10
            clearInterval(timer);
        }
        istop = false;
    }

    btn.onclick = function () {                                         //3

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
    }
}


// 内容2轮播图
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});

