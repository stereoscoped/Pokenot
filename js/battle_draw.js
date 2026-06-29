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

    drawHealthText(enemyPokemon, 50, 60);
    drawHealthText(playerPokemon, 50, 180);
}

function drawHealthText(pokemon, x, y) {
    ctx.fillText(pokemon.name, x, y);

    ctx.fillText(
        "HP: " + pokemon.hp + "/" + pokemon.maxHp,
        x,
        y + 25
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