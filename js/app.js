// Defines playfield and increments for movement
var Xdir = 101;
var Ydir = 84;
var Canvasleft = 0;
var Canvasright = 400;
var Canvastop = 84;
var Canvasbottom = 400;


// ENEMY SETUP

// Sets random speed for each enemy
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    var enemySpeeds = [80, 140, 160, 180, 200, 240, 280, 300];
    var randomSpeed = enemySpeeds[Math.floor(Math.random() * enemySpeeds.length)];
    this.speed = randomSpeed;    
};

// Sets enemy starting locations and store in array
var allEnemies = [];

// Top row
var enemy1 = new Enemy(0, 62);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-200, 62);
allEnemies.push(enemy2);
// Middle row
var enemy3 = new Enemy(0, 144);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-200, 144);
allEnemies.push(enemy4);
// Bottom row
var enemy5 = new Enemy(0, 230);
allEnemies.push(enemy5);
var enemy6 = new Enemy(-200, 230);
allEnemies.push(enemy6);

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy positions
// Randomize enemy respawn position so movement patterns are less predictable
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > Canvasright) {
        this.x = Math.floor(Math.random() * -300);
    }
};


// PLAYER CHARACTER SETUP


// Sets player character
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Draws player character on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
};

// Handles user input
Player.prototype.handleInput = function (key) {
    switch(key){
    case 'left':
        if (this.x > Canvasleft)
        this.x -=Xdir;
        break;
    case 'right':
        if (this.x < Canvasright)
        this.x +=Xdir;
        break;
    case 'up':
        if (this.y > Canvastop)
        this.y -=Ydir;
        else player.resetOnWin();
        break;
    case 'down':
        if (this.y < Canvasbottom)
        this.y +=Ydir;
        break;
    default:
        return;
    }
};

// Puts character on screen
var player = new Player(200, 400);


// WIN/LOSE/SCORE TRACKING

// Collision detection
// Loop through enemies to check for collision with character
Player.prototype.update = function() {
for(var e = 0, quantityEnemies = allEnemies.length; e < quantityEnemies; e++) {
        if(player.x <= (allEnemies[e].x + 70) && allEnemies[e].x <= (player.x + 50) && player.y <= (allEnemies[e].y + 70) && allEnemies[e].y <= (player.y + 60)) {
            player.reset();               
            }
}
};

//Keeps score for display purposes
var score = 0;

// Player lose condition
// Respawn character to starting point
// Substract 1 from score
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
    score--;
    document.getElementById('score').innerHTML = 'Score: '+score;
};

// Player win condition
// Respawn character to starting point
// Add 1 to score
Player.prototype.resetOnWin = function () {
    this.x = 200;
    this.y = 400;
    score++;
    document.getElementById('score').innerHTML = 'Score: '+score;
};

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