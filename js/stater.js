let bulb =false;
let squ=false;
let charm=false;
let choosed=false;
// before this intro
function drawStater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaterBackground();
    StaterTextBox();
}
function drawBulb() {
    console.log("Bulbasaur selected");
    bulb = true;
       squ=false;
      charm=false;
    document.getElementById("btn_stater_2").hidden =true
    document.getElementById("btn_stater_3").hidden =true
    StaterTextBox( );
    choosed=true;

}
function drawSqu() {
    console.log("Squirtle selected");
    squ = true;
    bulb = false;
     charm=false;
    document.getElementById("btn_stater_1").hidden =true
    document.getElementById("btn_stater_3").hidden =true
    StaterTextBox( );
choosed=true;

}
function drawChar() {
    console.log("Charmandar selected");
    document.getElementById("btn_stater_1").hidden =true
    document.getElementById("btn_stater_2").hidden =true
    StaterTextBox( );
    bulb = false;
    squ=false;
    charm=true;
    choosed=true;
 }
function drawStaterBackground() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        stater_background,
        0,
        0,
        canvas.width,
        canvas.height
    );


}

function StaterTextBox() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 450, canvas.width, 150);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.fillStyle = "#19345A";
    ctx.fillRect(10, 460,canvas.width-20, 130);

    ctx.stroke()
    ctx.strokeRect(0, 450, canvas.width, 150);

    ctx.fillStyle = "white";
    ctx.font = "18px 'Press Start 2P'";
    if(!bulb && !squ && !charm ) {
         ctx.fillText(" Choose you partner for your journey!", 10, 500);
        ctx.fillText(" Bulbasaur, Charmander,or Squirtle", 10, 530);
        ctx.fillText(" Click on the Pokemon to Choose, Good Luck", 10, 560);

        if (keys[" "] && choosed) {
            gameState = OVERWORLD;
            playMusic(currentMap.music);

        }
    }


         if(bulb){
             ctx.fillStyle = "white";
             ctx.fillRect(0, 450, canvas.width, 150);

             ctx.strokeStyle = "black";
             ctx.lineWidth = 4;
             ctx.beginPath();
             ctx.fillStyle = "#19345A";
             ctx.fillRect(10, 460,canvas.width-20, 130);

             ctx.stroke()
             ctx.strokeRect(0, 450, canvas.width, 150);

             ctx.fillStyle = "white";
             ctx.font = "18px 'Press Start 2P'";
            ctx.fillStyle = "white";
             ctx.fillText(" You choose Bulbasaur as you partner!", 10, 500);
             ctx.fillText(" You Journey Awaits! Press Space to start", 10, 530);
             ctx.fillText(" Press r or R to choose again !", 10, 560);
             // create pokemon object and assign it to the database adn keep track of it

        }else  if(squ){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 450, canvas.width, 150);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.fillStyle = "#19345A";
        ctx.fillRect(10, 460,canvas.width-20, 130);

        ctx.stroke()
        ctx.strokeRect(0, 450, canvas.width, 150);

        ctx.fillStyle = "white";
        ctx.font = "18px 'Press Start 2P'";
        ctx.fillText(" You choose Squirtle as you partner!", 10, 500);
             ctx.fillText(" You Journey Awaits! Press Space to start", 10, 530);
             ctx.fillText(" Press r or R to choose again !", 10, 560);

             if (keys[" "] && choosed) {
                 gameState = OVERWORLD;
                 playMusic(currentMap.music);

             }
             // create pokemon object and assign it to the database adn keep track of it

    }else if(charm){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 450, canvas.width, 150);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.fillStyle = "#19345A";
        ctx.fillRect(10, 460,canvas.width-20, 130);

        ctx.stroke()
        ctx.strokeRect(0, 450, canvas.width, 150);

        ctx.fillStyle = "white";
        ctx.font = "18px 'Press Start 2P'";
        ctx.fillText(" You choose Charmandar as you partner!", 10, 500);
        ctx.fillText(" You Journey Awaits! Press Space to start", 10, 530);
             ctx.fillText(" Press r or R to choose again !", 10, 560);


             // create pokemon object and assign it to the database adn keep track of it
        if (keys[" "] && choosed) {
            gameState = OVERWORLD;
            playMusic(currentMap.music);

        }    }






}
function update_starter() {
    //run
    if ((keys["r"] || keys["r"])&& choosed) {
       bulb=false;
       squ=false;
        charm=false;
        choosed = false;
        document.getElementById("btn_stater_2").hidden =false
        document.getElementById("btn_stater_3").hidden =false
        document.getElementById("btn_stater_1").hidden =false

    }
    if (keys[" "] && choosed) {
        gameState = OVERWORLD;
        playMusic(currentMap.music);

    }


}

