`use strict`

var gClickedImg;
var gCurrLineText;

function onInit() {
    init();
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

function onDrawImg(lineText) {
    gCurrLineText=lineText;
    var img = new Image()
    img.src = gClickedImg ;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        if(!gCurrLineText) gCurrLineText = '';
        onDrawText(gCurrLineText)
    }
}

function onSetText(txt){
    setText(txt);
}

function onDrawText() {
    for (var i =0; i<gMeme.lines.length; i++){
        var currLine = gMeme.lines[i]
        if (!currLine.txt) currLine.txt ='';
        gCtx.lineWidth = 1
        // if (gMeme.lines[0]){
            gCtx.strokeRect(gCanvas.width/10,currLine.offsetY-15, 250, 20)
        // }
    gCtx.strokeStyle = currLine.color
    gCtx.fillStyle = 'white'
    gCtx.font = `${currLine.size}px  impact`
    gCtx.textAlign = currLine.align
    gCtx.fillText(currLine.txt, gCanvas.width/2, currLine.offsetY) 
    gCtx.strokeText(currLine.txt, gCanvas.width/2, currLine.offsetY)
    }
}

function onAddLine(){
    addLine();
    var elInput = document.querySelector ('.text-line');
    elInput.value = '';
}

function onSwitchLine(){
    switchLine();
    var elInput = document.querySelector ('.text-line');
    elInput.value = '';
}

function onTextSizeUp(){
    textSizeUp();
}

function onTextSizeDown(){
    textSizeDown();
}

function onSetTextLeft(){
    setTextLeft();
}

function onSetTextCenter(){
    setTextCenter();
}

function onSetTextRight(){
    setTextRight();
}

function onSetTextColor(color){
    setTextColor(color);
    var elColorInput = document.querySelector ('.color');
    elColorInput.setAttribute('hidden', true);
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
    // console.log ('elImgs: ',elImgs);
    var filteredImgs = searchImg(text);
    for (var i =0; i<filteredImgs.length; i++){
        var curImg = filteredImgs[i];
        var elSearchedImgs =document.getElementById(curImg.id) 
        elSearchedImgs.removeAttribute('hidden');
    }

}