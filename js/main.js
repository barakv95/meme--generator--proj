`use strict`

var gclickedImg;
var gCurrLineText;

function onInit() {
    init();
}


function onEditImg(ev){
    var elEditor = document.querySelector ('.main-editor');
    elEditor.removeAttribute('hidden');
    var url = editImg(ev.target);    
    gclickedImg=url;
    onDrawImg()

}

function onDrawImg(lineText) {
    gCurrLineText=lineText;
    var img = new Image()
    img.src = gclickedImg ;
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
    // get data for render
    var line = gMeme.lines[gMeme.selectedLineIdx]
    // render
    gCtx.lineWidth = 1
    // gCtx.strokeRect(gCanvas.width/10,line.offsetY-15, 250, 20)
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = 'white'
    gCtx.font = `${line.size}px  Comic Sans MS`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, gCanvas.width/2, line.offsetY) 
    gCtx.strokeText(line.txt, gCanvas.width/2, line.offsetY)
}

function onAddLine(){
    addLine();
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
