const width = 300;

var root = document.querySelector(":root");
var timer = setInterval(animateBg, 70);

function animateBg(){
    var rs = getComputedStyle(root);
    var offset = parseInt(rs.getPropertyValue('--bg-offset'));
    offset -= 1;
    if (offset < -width){
        offset = 0;
    }
    root.style.setProperty('--bg-offset', String(offset)+"px");
}

//jpg was here, have a good day :)