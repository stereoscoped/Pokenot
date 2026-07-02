function drawBattle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBattleBackground();
    drawBattleTrainer();

    //canvas white overlay for background fade
    if (battleIntro && battleIntro.active && battleIntro.fade > 0) {
        ctx.save();
        ctx.globalAlpha = battleIntro.fade;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    //update DOM sprites (front/back) to match intro animation timeline
    let enemyImg = document.getElementById("encounterpokemon");
    let playerImg = document.getElementById("mypokemon");

    if (battleIntro && battleIntro.active) {
        // enemy slides in starting at frame ~10
        enemyImg.style.visibility = (battleIntro.timer >= 10) ? 'visible' : 'hidden';
        enemyImg.style.left = Math.round(battleIntro.enemyX) + 'px';

        // player appears as silhouette starting at ~75, then fades to color
        playerImg.style.visibility = (battleIntro.timer >= 75) ? 'visible' : 'hidden';
        if (battleIntro.playerWhite) {
            playerImg.style.filter = 'brightness(0) invert(1)';
        } else {
            playerImg.style.filter = 'none';
        }
        playerImg.style.opacity = String(battleIntro.playerAlpha);
    } else {
        // normal battle state: ensure sprites visible and reset filters
        enemyImg.style.visibility = 'visible';
        playerImg.style.visibility = 'visible';
        playerImg.style.filter = 'none';
        playerImg.style.opacity = '1';
    }

    if (!battleIntro.active) {
        drawPokemonInfo();
        drawBattleTextBox();
        drawBattleMenu();
    }
}
function drawBattleBackground() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        battle_background,
        0,
        0,
        canvas.width,
        canvas.height
    );
}
function drawPokemonInfo() {
    ctx.fillStyle = "black";

    drawHealthText(enemyPokemon, 1, 50, 55);
    drawHealthText(playerPokemon, 0, 500, 375);
}

function drawHealthText(pokemon, who, x, y) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#324128";
    ctx.beginPath();
    ctx.fillStyle = "#FEFCE1";
    // 0 is mypokemo
    if (who === 1) {
        ctx.fillStyle = "#FEFCE1";

        ctx.roundRect(x - 20, y - 40, 240, 90, [30, 30, 0, 30]);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "gold";

        ctx.moveTo(x + 250, y);
        ctx.lineTo(x + 245 - 20, y - 15);
        ctx.lineTo(x + 245 - 20, y + 15);
        ctx.lineTo(x + 250, y);
        ctx.fill()

        ctx.stroke()
    }
    if (who === 0) {
        ctx.fillStyle = "#FEFCE1";
        ctx.roundRect(x - 20, y - 40, 240, 90, [30, 30, 50, 0]);

        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "gold";

        ctx.moveTo(x - 50, y);
        ctx.lineTo(x - 25, y - 15);
        ctx.lineTo(x - 25, y + 15);
        ctx.lineTo(x - 50, y);
        ctx.fill()

        ctx.stroke()
    }



    let uppercasename = pokemon.name;
    ctx.fillStyle = "black";
    ctx.fillText(uppercasename.toUpperCase(), x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.roundRect(x + 50, y + 10, 150, 20, 40);
    ctx.fill();
    ctx.stroke();

    let color;
    if (pokemon.hp < 55 && pokemon.hp > 30) {
        color = "#F7E563";
    }
    if (pokemon.hp >= 55) {
        color = "#95E8A4";
    }
    if (pokemon.hp <= 30) {
        color = "#DA6546";

    }

    ctx.beginPath();
    let hp = (pokemon.hp / pokemon.maxHP) * 150
    ctx.fillStyle = color;
    ctx.roundRect(x + 50, y + 10, hp, 20, 20);
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
    ctx.beginPath();
    ctx.fillStyle = "#19345A";
    ctx.fillRect(10, 460, canvas.width - 320, 130);

    ctx.stroke()
    ctx.strokeRect(0, 450, canvas.width, 150);

    ctx.fillStyle = "white";
    ctx.font = "18px 'Press Start 2P'";
    drawWrappedBattleMessage(battleMessage, 45, 500, 420, 28);
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
    let menuHeight = 200;
    let menuX = canvas.width - menuWidth;
    let menuY = 450;

    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);


    ctx.font = "18px 'Press Start 2P'";

    for (let i = 0; i < options.length; i++) {
        let optionY = menuY + 38 + i * 27;

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
