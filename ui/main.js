console.log('Loaded!');


var element = document.getElementById('main-text');

element.innerHTML = "HI";

var mad = document.getElementById("mad");
var moveleft =0;

function moveRight(){
    moveleft = moveleft + 1;
    mad.style.moveleft = moveleft + 'px';
}

mad.onclick = function(){
    var interval =  setInterval(moveRight, 50);
};