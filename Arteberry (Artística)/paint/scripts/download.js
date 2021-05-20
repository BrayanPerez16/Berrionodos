// fonction de telechargement du dessin 
function download() {
    var download = document.getElementById("download");
    var image =canvas.toDataURL("image/png").replace("image/jpeg", "image/octet-stream");
    download.setAttribute("href", image);
    }