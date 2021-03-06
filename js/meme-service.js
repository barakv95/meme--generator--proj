`use strict`

const KEY = 'galleryImgs';

var gCanvas;
var gCtx;
var gCurrImg;


var keyWords = {
    happy: 12,
    funny: 1
}

var gImgs;

var gMeme = {
    selectedImg: "meme-imgs/1.jpg",
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            font: 'impact-font',
            align: 'center',
            color: 'black',
            offsetY: 50
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
            saveToStorage(KEY, gImgs)
    gCanvas = document.querySelector ('canvas');
    gCtx = gCanvas.getContext('2d')
    onDrawImg()
}

function setText (txt){    
        gMeme.lines[gMeme.selectedLineIdx].txt = txt;
        var lineText = gMeme.lines[gMeme.selectedLineIdx].txt
        onDrawImg(lineText) 
}

function getLines(){
    return gMeme.lines;
}

function  editImg(el){
    gCurrImg = el.id;
    var chosenImg = gImgs.find( img => {
        var x = img.id + '';
         return (x === gCurrImg)
    })
    gMeme.selectedImg = chosenImg.url;
    return gMeme.selectedImg;
}

function clearCanvas(){
    gMeme.lines = [_createTopLine()]
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.selectedLineIdx = 0;
}

function addLine(){
    if (!gMeme.lines[0]){
        gMeme.lines.push(_createTopLine())
    }else if (!gMeme.lines[1]){
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

function getLineText(){
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function deleteLine(){
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx,1);
    if (gMeme.selectedLineIdx === 0) return;
    gMeme.selectedLineIdx--
}

function setTextLeft(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function setTextCenter(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function setTextRight(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function textSizeUp(){
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function textSizeDown(){
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function changeFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setTextColor(newColor){
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function downloadMeme(elLink){
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function searchImg(text){
    var filteredImgs = gImgs.filter(img => {
        var str = img.keyWord +'';
        str = str.toUpperCase();
        if (str.includes(text.toUpperCase())){
            return img
        }
    })
    return filteredImgs;
}

function _createTopLine() {
    return {
            txt: '',
            size: 50,
            font: 'impact-font',
            align: 'center',
            color: 'black',
            offsetY: 50
            }
}

function _createBotLine() {
    return {
            txt: '',
            size: 50,
            font: 'impact-font',
            align: 'center',
            color: 'black',
            offsetY: 450
            }
}

function _createMidLine() {
    return {
            txt: '',
            size: 50,
            font: 'impact-font',
            align: 'center',
            color: 'black',
            offsetY: 250
            }
}

function _createImg(id,...keyWord){
    return {
        id,
        url:`meme-imgs/${id}.jpg`,
        keyWord
    }
}
