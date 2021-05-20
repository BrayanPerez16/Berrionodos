
// créer un autre canvas temporaire pour la redimention quand on change la résolution 
var tempCanvas=document.createElement("canvas");
var tctx=tempCanvas.getContext("2d");

// fonction de changement de la taille du canvas selon la résolution
function changeCanvasSize(){
    var paintDiv = document.querySelector('#dessin');
    var width_div = paintDiv.offsetWidth;
    var height_div = paintDiv.offsetHeight;
    var scale_w= width_div / canvas.width;
    var scale_h= height_div/canvas.height ;
    var scale_resize_w = scale_w;
    var scale_resize_h = scale_h;
    if(scale_w>=1) {
        scale_w=1;
    }
    if(scale_h>=1) {
        scale_h=1;
    }
    resize(canvas,scale_w,scale_h,scale_resize_w,scale_resize_h);
   // mettre à jour les margin left et top
    left = paintDiv.offsetLeft;
    off_top = paintDiv.offsetTop;
    
}
function resize(canvas,scale_w,scale_h,scale_resize_w,scale_resize_h){
    var cw=canvas.width;
    var ch=canvas.height;
    tempCanvas.width=cw;
    tempCanvas.height=ch;
    tctx.drawImage(canvas,0,0);
    canvas.width=Math.floor(cw * scale_resize_w);
    canvas.height=Math.floor(ch * scale_resize_h);
    var ctx=canvas.getContext('2d');
    ctx.drawImage(tempCanvas,0,0,cw,ch,0,0,Math.floor(cw * scale_w),Math.floor(ch * scale_h));
  }