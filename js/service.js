`use strict`

var gCanvas;
var gCtx;
var gCurrImg;

var keyWords = {
    happy: 12,
    funny: 1
}

var gImgs;

var gMeme = {
    selectedImg: "/meme-imgs (square)/1.jpg",
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello user',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ] 
};

function init() {
    console.log ('init');
    gImgs = createImgs(10)
    gCanvas = document.querySelector ('canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg()
}


function  editImg(el){
    gCurrImg = el.id;
    var selectImg = gImgs.find(img => {
        return (img.id === gCurrImg)
    })
    console.log ('gCurrImg: ',gCurrImg);
    console.log ('selectImg: ',selectImg);
    gMeme.selectedImg = gImgs[selectImg];
    console.log ('gMeme.selectedImg: ',gMeme.selectedImg);
    // drawImg(gCurrImg);
    
}

function drawImg() {
    var img = new Image()
    img.src = "/meme-imgs (square)/1.jpg" ;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function createImg(id){
    return {
        id,
        url:`/meme-imgs (square)/${id}.jpg`,
        keyWord: 'funny'
    }
}

function createImgs (num){
    var imgs = [];
    for (var i =0; i<num; i++){
        imgs[i]= createImg(i+1);
    }
    return imgs;
}