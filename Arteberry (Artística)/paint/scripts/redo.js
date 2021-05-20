// fonctions permettant revenir en arrière 
// une liste des dessins stockés en avant
redo_list =[];
// une liste des dessins stockés en arrière
undo_list =[];
function saveState (canvas, list, keep_redo) {
    keep_redo = keep_redo || false;
    if(!keep_redo) {
    redo_list = [];
    }
    
    (list || this.undo_list).push(canvas.toDataURL());   
}
function undo (canvas, ctx) {
    restoreState(canvas, ctx, this.undo_list, this.redo_list);
}
function redo (canvas, ctx) {
    restoreState(canvas, ctx, this.redo_list, this.undo_list);
}
function restoreState (canvas, ctx,  pop, push) {
    if(pop.length) {
    saveState(canvas, push, true);
    var restore_state = pop.pop();
    var img = new Image();
    img.src = restore_state;
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img,0,0);  
    }
    }
}

function undoo(){
    undo(canvas, ctx);
}
function redoo(){
    redo(canvas, ctx);
}