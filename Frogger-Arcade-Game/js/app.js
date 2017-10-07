var level = 1;
var levelDisplay = document.getElementById("level");
levelDisplay.innerHTML = "Level " + level;

//Used to display the amount of hearts player has left
lifeText = "&#9825&#9825&#9825&#9825&#9825";
var lifeDisplay = document.getElementById("lives");
lifeDisplay.innerHTML = "<p>" + lifeText + "</p>";

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    //If the empty gets to the end of the playable area, loop back to the begining and jump to a new row
    if (this.x > 725) {
        this.x = -100;
        this.y = Math.random() * (435 - 45) + 45;

    }
    //Check if the player has touched an enemy
    this.colisionDetectionEnemy();

};

Enemy.prototype.colisionDetectionEnemy = function() {
    if (player.y + 73 <= this.y + 135 && player.x + 25 <= this.x + 88 && player.y + 131 >= this.y + 90 && player.x + 76 >= this.x + 11) {
        //Reset player position if collision  
        player.y = 650;
        //radomize player starting location to make it harder
        player.x = Math.random() * (700 - 100) + 100;
        player.livesAmount --;
        player.lifetracker();
        heart.giveHeart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.livesAmount = 5;

};

//Render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Decides when a heart is available
//Runs when the player reaches the top of the board
//Keep track of the players lives and the amouunt of hearts shown on the screen
Player.prototype.levelUp =function() {
    level = level + 1;
    levelDisplay.innerHTML = "Level " + level;
    //radomize player starting location to make it harder
    this.x = Math.random() * (700 - 100) + 100;
    //increase the amount of bugs depending on the level
    enemyAmount = 6 + level;

    heart.giveHeart();

    //Creates new enemies for the new level
    for (var i = 0; i < enemyAmount; i++) {
        //Y-axis Starting position for enemey
        var enemyStartY = Math.random() * (435 - 45) + 45;
        //Enemy Speed
        var enemySpeed = Math.random() * (300 - 100) + 100;
        //Creates New Enemys based on the enemy amount 
        allEnemies[i] = new Enemy(enemyStartX, enemyStartY, enemySpeed);
    }
    //Player wins when they beat level 10 
    if (level === 11) {
        document.body.innerHTML = "<div id='winner'><p>you win</p><button id='playAgain'>Play Again</button></div>";
        playAgain();
    }
};

Player.prototype.lifetracker = function() {
    if (this.livesAmount === 5) {
        lifeText = "&#9825&#9825&#9825&#9825&#9825";
    } else if (this.livesAmount === 4) {
        lifeText = "&#9825&#9825&#9825&#9825";
    } else if (this.livesAmount === 3) {
        lifeText = "&#9825&#9825&#9825";
    } else if (this.livesAmount === 2) {
        lifeText = "&#9825&#9825";
    } else if (this.livesAmount === 1) {
        lifeText = "&#9825";
    } else if (this.livesAmount < 1) {
        //Player loses and is asked if they want to play again
        document.body.innerHTML = "<div id='loser'><p>You Lose</p><button id='playAgain'>Play Again</button></div>";
        playAgain();
    }

    lifeDisplay.innerHTML = "<p>" + lifeText + "</p>";
};

//Checks if player has reached the top of the screen and resets to the bottom
//Checks if player is touching the side of the screen and stops movement.
//Resets the player if they reach the top of the screen back to the bottom
//Stops player movement if the reach the bottom,left or right side of the screen
Player.prototype.playerReset = function() {
    if (this.y < -1) {
        this.y = 650;
        this.levelUp();
        heart.giveHeart();
    }
    if (this.y > 650) {
        this.y = 650;
    }
    if (this.x < -22.5) {
        this.x = -22.5;
    }
    if (this.x > 725) {
        this.x = 725;
    }
};

var Heart = function(x, y) {
    this.x = x;
    this.y = y;
    this.heartAvailable = false;
    this.sprite = 'images/Heart.png';
};
//Render a heart on the screen
Heart.prototype.render = function() {
    //Makes it so the heart does not show up on the first play and there is a 1 in three chance
    if (Math.floor(showHeart) === 3 && this.heartAvailable === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

Heart.prototype.colisionDetectionHeart = function () {
    if (player.y + 73 <= this.y + 135 && player.x + 25 <= this.x + 88 && player.y + 131 >= this.y + 90 && player.x + 76 >= this.x + 11) {
        player.livesAmount ++;
        //sends the heart off the screen
        this.x = 800;
        this.y = 800;
        player.lifetracker();
    }
};

Heart.prototype.update = function(dt) {
    //Checks if the player touched the heart
    this.colisionDetectionHeart();
};

Heart.prototype.giveHeart = function() {
    showHeart = Math.random() * (4 - 1) + 1;
    this.heartAvailable = true;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//Number of enemies to display-Will eventually depend on the level number
var enemyAmount = 6 + level;
//X-axis Starting Position of Enemey
var enemyStartX = -200;

var player = new Player(202.5, 650, 75);

//Creates new enemys
for (var i = 0; i < enemyAmount; i++) {
    //Y-axis Starting position for enemey
    var enemyStartY = Math.random() * (435 - 45) + 45;
    //Enemy Speed
    var enemySpeed = Math.random() * (300 - 100) + 100;
    //Create the new player
    allEnemies[i] = new Enemy(enemyStartX, enemyStartY, enemySpeed);
}

//Creates random positioning for the heart
var heartY = Math.random() * (300 - 50) + 50;
var heartX = Math.random() * (500 - 20) + 20;
//Creates a random number between 1 and 3 that determines if the heart if the heart will be shown
var showHeart = Math.random() * (4 - 1) + 1;
//Creates a new heart however the render function in engine.js will only if showHeart === 1, equating to a 1 in 3 chance. 
var heart = new Heart(heartX, heartY);

//Handles keypresses for the player
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= 101;
    }
    if (key == 'up') {
        this.y -= 83;
    }
    if (key == 'right') {
        this.x += 101;
    }
    if (key == 'down') {
        this.y += 83;
    }
    this.playerReset();

};

Player.prototype.update = function() {
    //Needed for engine.js
};

//Decides if the player wants to play agian
function playAgain() {

    var playAgainButton = document.getElementById("playAgain");
    playAgainButton.addEventListener('click', function() {
        // Learned From https://www.w3schools.com/jsref/met_loc_reload.asp
        location.reload();
    });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});