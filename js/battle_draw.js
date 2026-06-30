function drawBattle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBattleBackground();
    drawPokemonInfo();
    drawBattleTextBox();
    drawBattleMenu();
}
function drawBattleBackground() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        battle_background,
        0,
        0,
        canvas.width,
        canvas.height - 150
    );
}
function drawPokemonInfo() {
    ctx.fillStyle = "black";

    drawHealthText(enemyPokemon, 50, 55);
    drawHealthText(playerPokemon, 500, 375);
}

function drawHealthText(pokemon, x, y) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#324128";
    ctx.beginPath();
    ctx.fillStyle = "#FEFCE1";
    ctx.roundRect(x-20, y-40, 240, 90, [10, 40]);
    ctx.fill();
    ctx.stroke();

    let uppercasename=pokemon.name;
    ctx.fillStyle = "black";
    ctx.fillText(uppercasename.toUpperCase(), x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.roundRect(x+50, y+10, 150, 20,40);
    ctx.fill();
    ctx.stroke();

   let color;
    if(pokemon.hp < 55 && pokemon.hp >30){
       color= "#F7E563";
    }
    if(pokemon.hp >= 55){
        color= "#95E8A4";
    }
    if(pokemon.hp <=30){
        color= "#DA6546";

    }

       ctx.beginPath();
     let hp=(pokemon.hp/pokemon.maxHp)*150
    ctx.fillStyle = color;
    ctx.roundRect(x+50, y+10, hp, 20,20);
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.fillStyle = "black";

    ctx.fillText(
        "HP: " + pokemon.hp + "/" + pokemon.maxHp,
        x,
        y + 30
    );
}

function drawBattleTextBox() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 450, canvas.width, 150);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 450, canvas.width, 150);

    ctx.fillStyle = "black";
    ctx.font = "18px 'Press Start 2P'";
    drawWrappedBattleMessage(battleMessage, 45, 495, 420, 28);
}

function drawWrappedBattleMessage(text, x, y, maxWidth, lineHeight) {
    let words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, x, y);
            line = words[i] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
}

function drawBattleMenu() {
    let options = getBattleOptions();

    let menuWidth = 300;
    let menuHeight = 150;
    let menuX = canvas.width - menuWidth;
    let menuY = 450;

    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);

    ctx.font = "18px 'Press Start 2P'";

    for (let i = 0; i < options.length; i++) {
        let optionY = menuY + 28 + i * 27;

        if (i === selectedBattleOption) {
            ctx.fillStyle = "#dcdcdc";
            ctx.fillRect(menuX + 10, optionY - 24, menuWidth - 20, 30);

            ctx.fillStyle = "black";
            ctx.fillText("> " + options[i], menuX + 25, optionY);
        } else {
            ctx.fillStyle = "black";
            ctx.fillText(options[i], menuX + 50, optionY);
        }
    }
}
