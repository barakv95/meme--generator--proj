`use strict`

var gClickedImg;
var gCurrLineText;

function onInit() {
    init();
    renderGallery();
}

function renderGallery(){
    var imgs = (loadFromStorage(KEY)) ? loadFromStorage(KEY) : gImgs;
    var strHtml = ''
    for (var i =0; i<imgs.length; i++){
        strHtml += `<img id="${imgs[i].id}" src="meme-imgs/${imgs[i].id}.jpg" class="grid-item" onclick="onEditImg(event)">\n`
    }
    elGallery = document.querySelector ('.main-gallery');
    elGallery.innerHTML = strHtml;
}

function onEditImg(ev){
    clearCanvas();
    var elInput = document.querySelector ('.text-line');
    elInput.value = '';
    var elEditor = document.querySelector ('.main-editor');
    elEditor.removeAttribute('hidden');
    var elGallery = document.querySelector ('.main-layout');
    elGallery.style.display = 'none';

    var url = editImg(ev.target);    
    gClickedImg=url;
    onDrawImg()

}

function onDrawImg(lineText='') {
    gCurrLineText=lineText;
    var img = new Image()
    img.src = gClickedImg ;
    img.onload = () => {
        gCanvas.width = img.width;
        gCanvas.height= img.height;
        gCtx.drawImage(img, 0, 0)
        onDrawText()
        onFocusedLine()
    }
}

function onSetText(txt){
    setText(txt);
}

function onDrawText() {
    var lines = getLines()
    
    for (var i =0; i<lines.length; i++){
        var currLine = lines[i]
        if (!currLine.txt) currLine.txt ='';
        gCtx.lineWidth = 2
        gCtx.strokeStyle = currLine.color
        gCtx.fillStyle = 'white'
        gCtx.font = `${currLine.size}px  ${currLine.font}`
        gCtx.textAlign = currLine.align
        gCtx.fillText(currLine.txt, gCanvas.width/2, currLine.offsetY) 
        gCtx.strokeText(currLine.txt, gCanvas.width/2, currLine.offsetY)
    }
}

function onFocusedLine(){
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = 'black';
    gCtx.setLineDash([10, 10]);
    gCtx.strokeRect(gCanvas.width/17,currLine.offsetY-45, 450, 60)
}
 
function onAddLine(){
    addLine();
    var elInput = document.querySelector ('.text-line');
    elInput.value = '';
    onDrawImg()
    onDrawText()
}

function onSwitchLine(){
     switchLine();
    var elInput = document.querySelector ('.text-line');
    elInput.value = (getLineText())? getLineText():'';
    onDrawImg()
    onDrawText()
    onFocusedLine()
}

function onDeleteLine(){
    deleteLine();
    onDrawImg()
    onDrawText()
}

function onTextSizeUp(){
    textSizeUp();
    onDrawImg()
    onDrawText()
}

function onTextSizeDown(){
    textSizeDown();
    onDrawImg()
    onDrawText()
}

function onSetTextLeft(){
    setTextLeft();
    onDrawImg()
    onDrawText()
}

function onSetTextCenter(){
    setTextCenter();
    onDrawImg()
    onDrawText()
}

function onSetTextRight(){
    setTextRight();
    onDrawImg()
    onDrawText()
}

function onChangeFont(font){
    changeFont(font);
    onDrawImg()
    onDrawText()
}

function onSetTextColor(color){
    setTextColor(color);
    var elColorInput = document.querySelector ('.color');
    elColorInput.setAttribute('hidden', true);
    onDrawImg()
    onDrawText()
}

function onOpenColorInput(){
    var elColorInput = document.querySelector ('.color');
    elColorInput.removeAttribute('hidden')
}

function onDownloadMeme(elLink){
    var imgName = prompt("Enter meme name..")
    elLink.setAttribute('download', imgName)
    downloadMeme(elLink)
    
}

function onOpenMenu(){
    var elBody = document.querySelector ('body');
    elBody.classList.add('menu-open');
}

function onCloseMenu(){
    var elBody = document.querySelector ('body');
    elBody.classList.remove('menu-open');
}

function onCloseEditor(){
    var elEditor = document.querySelector ('.main-editor');
    elEditor.setAttribute('hidden', true);
    var elGallery = document.querySelector ('.main-layout');
    elGallery.style.display = 'block';
}

function onSearchImg(text){
    var elImgs = document.querySelectorAll('.grid-item');
    for (var i =0; i<elImgs.length; i++){
        var img = elImgs[i];
        img.setAttribute('hidden', true);
    }
    var filteredImgs = searchImg(text);
    for (var i =0; i<filteredImgs.length; i++){
        var curImg = filteredImgs[i];
        var elSearchedImgs =document.getElementById(curImg.id) 
        elSearchedImgs.removeAttribute('hidden');
    }

}

