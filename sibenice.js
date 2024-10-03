sibenice = function() {
    console.log("spuštěno sibenice()")
	let platno = document.getElementById("platno");
    let kontext = platno.getContext("2d");
    
    kontext.clearRect(0, 0, platno.width, platno.height);
    
    kontext.lineWidth = 6;

    //kopec
    if(falseCounter >= 1) {
        kontext.beginPath();
        kontext.arc(400/2, 500/2, 150/2, -160*Math.PI/180, -20*Math.PI/180 );
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }

    //šibenice 1
    if(falseCounter >= 2) {
        kontext.beginPath();
        kontext.moveTo(400/2, 350/2);
        kontext.lineTo(400/2, 100/2);
        kontext.lineCap = "square";
        kontext.stroke();
        kontext.closePath();
    }
    
    //šibenice 2
    if (falseCounter >= 3) {
        kontext.beginPath();
        kontext.moveTo(400/2, 100/2);
        kontext.lineTo(550/2, 100/2);
        kontext.lineCap = "square";
        kontext.stroke();
        kontext.closePath();
    }
    
    //šibenice 3
    if (falseCounter >= 4) {
        kontext.beginPath();
        kontext.moveTo(450/2, 100/2);
        kontext.lineTo(400/2, 150/2);
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }
    
    //lano
    if (falseCounter >= 5) {
        kontext.lineWidth = 4;
        kontext.beginPath();
        kontext.moveTo(552/2, 100/2);
        kontext.lineTo(552/2, 150/2);
        kontext.lineCap = "square";
        kontext.stroke();
        kontext.closePath();
    }
    
    //hlava
    if (falseCounter >= 6) {
        kontext.beginPath();
        kontext.arc(552/2, 170/2, 10, 0, Math.PI*2 );
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }
    
    //trup
    if (falseCounter >= 7) {
        kontext.beginPath();
        kontext.moveTo(552/2, 190/2);
        kontext.lineTo(552/2, 250/2);
        kontext.lineCap = "square";
        kontext.stroke();
        kontext.closePath();
    }
    
    //levá noha
    if (falseCounter >= 8) {
        kontext.beginPath();
        kontext.moveTo(552/2, 250/2);
        kontext.lineTo(532/2, 300/2);
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }
    
    //pravá noha
    if (falseCounter >= 9) {
        kontext.beginPath();
        kontext.moveTo(552/2, 250/2);
        kontext.lineTo(572/2, 300/2);
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }
    
    //pravá ruka
    if (falseCounter >= 10) {
        kontext.beginPath();
        kontext.moveTo(552/2, 200/2);
        kontext.lineTo(532/2, 245/2);
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath();
    }
    
    //levá ruka
    if (falseCounter >= 11){
        kontext.beginPath();
        kontext.moveTo(552/2, 200/2);
        kontext.lineTo(572/2, 245/2);
        kontext.lineCap = "round";
        kontext.stroke();
        kontext.closePath()
    }
}