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
            txt: '',
            size: 20,
            align: 'center',
            color: 'red',
            offsetY: 20
        },
        {
            txt: '',
            size: 20,
            align: 'center',
            color: 'red',
            offsetY: 135
        }
    ] 
};

function init() {
    console.log ('init');
    gImgs = _createImgs(10)
    gCanvas = document.querySelector ('canvas');
    gCtx = gCanvas.getContext('2d')
    onDrawImg()
}

function setText (txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    var lineText = gMeme.lines[gMeme.selectedLineIdx].txt
    onDrawImg(lineText)    
}

function  editImg(el){
    gCurrImg = el.id;
    var selectImg = gImgs.find( img => {
        var x = img.id + '';
         return (x === gCurrImg)
    })
    gMeme.selectedImg = selectImg.url;
    return gMeme.selectedImg;
}

function _createImg(id){
    return {
        id,
        url:`/meme-imgs (square)/${id}.jpg`,
        keyWord: 'funny'
    }
}

function _createImgs (num){
    var imgs = [];
    for (var i =0; i<num; i++){
        imgs[i]= _createImg(i+1);
    }
    return imgs;
}

function switchLine(){
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 0)? 1 : 0;    
}

function setTextLeft(){
    gMeme.lines.forEach(line =>{
        line.align = 'left'
    })
}

function setTextCenter(){
    gMeme.lines.forEach(line =>{
        line.align = 'center'
    })
}

function setTextRight(){
    gMeme.lines.forEach(line =>{
        line.align = 'right'
    })
}

function textSizeUp(){
    gMeme.lines.forEach(line =>{
        line.size++
    })
}

function textSizeDown(){
    gMeme.lines.forEach(line =>{
        line.size--
    })
}

function setTextColor(newColor){
    gMeme.lines.forEach(line =>{
        line.color = newColor;
    })
}

function downloadMeme(elLink){
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}