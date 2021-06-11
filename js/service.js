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
            color: 'black',
            offsetY: 20
        }
    ] 
};

function init() {
    console.log ('init');
    gImgs = [ 
        _createImg(1, 'funny trump angry'),
        _createImg(2, 'cute dog love animal'),
        _createImg(3, 'cute baby dog love animal'),
        _createImg(4, 'cute sleep cat animal'),
        _createImg(5, 'cute funny baby success'),
        _createImg(6, 'funny'),
        _createImg(7, 'cute funny baby'),
        _createImg(8, 'willy wonka funny listen'),
        _createImg(9, 'cute funny baby foxy'),
        _createImg(10, 'laugh funny politics obama'),
            ]
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

function clearCanvas(){
    gMeme.lines = [_createTopLine()]
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.selectedLineIdx = 0;
}

function addLine(){
    if (!gMeme.lines[1]){
        gMeme.lines.push(_createBotLine())
    }else{
        gMeme.lines.push(_createMidLine())
    }
}

function switchLine(){
    if(gMeme.selectedLineIdx === gMeme.lines.length-1){
        gMeme.selectedLineIdx = 0;
    }else{
        gMeme.selectedLineIdx++
    }
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

function searchImg(text){
    var filteredImgs = gImgs.filter(img => {
        if (img.keyWord.includes(text)){
            return img
        }
    })
    console.log ('filteredImgs: ',filteredImgs);
    return filteredImgs;
}

function _createTopLine() {
    return {
            txt: '',
            size: 20,
            align: 'center',
            color: 'black',
            offsetY: 20
            }
}

function _createBotLine() {
    return {
            txt: '',
            size: 20,
            align: 'center',
            color: 'black',
            offsetY: 135
            }
}

function _createMidLine() {
    return {
            txt: '',
            size: 20,
            align: 'center',
            color: 'black',
            offsetY: 70
            }
}

function _createImg(id,...keyWord){
    return {
        id,
        url:`/meme-imgs (square)/${id}.jpg`,
        keyWord
    }
}
