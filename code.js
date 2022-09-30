// create Phaser.Game object named "game"
var game = new Phaser.Game(1000, 600, Phaser.AUTO, "my-game", {
  preload: preload,
  create: create,
  update: update,
});

// declare global variables for game
var player;
var arrowKey;
var sky;
var platformGroup;
var wallGroup;
var treeGroup;
var eggGroup;
var score = 0;
var scoreText;
var triceratopsGroup;
var brachiosaur;
var pterasaur;
var barBackground;
var healthBar;
var barOutline;
// var hearts;
var messageText;
var life = 0;
var lifeText;

// preload game assets - runs once at start

function preload() {
  // player
  game.load.spritesheet(
    "player",
    "/assets/player-spec-spritesheet.png",
    64,
    34
  );

  // background
  game.load.image("sky", "/assets/environment/cloudy-sky.png");

  // ground + platforms
  game.load.image("platform-ground", "/assets/environment/ground-tile-64.png");
  game.load.image("grass-wide-125", "/assets/environment/grass-wide-125.png");
  game.load.image("grass-wide-250", "/assets/environment/grass-wide-250.png");
  game.load.image("grass-64", "/assets/environment/grass-tile-64.png");
  game.load.image("grass-xl-128", "/assets/environment/grass-xl-128.png");

  // tree + bushes
  game.load.image("tree-top", "/assets/environment/bush-platform-spec.png");
  game.load.image("tree-full", "/assets/environment/tree-spec.png");
  game.load.image("tree-short", "/assets/environment/bush-spec.png");

  // walls
  game.load.image("grass-32", "/assets/environment/grass-tile-32.png");
  game.load.image("grass-tall-64", "/assets/environment/grass-tall-64.png");
  game.load.image(
    "grass-xl-tall-128",
    "/assets/environment/grass-xl-tall-128.png"
  );

  // eggs - change to spritesheet when adding animation frames
  game.load.image("egg", "/assets/egg-spec.png");

  // triceratops
  game.load.spritesheet("triceratops", "/assets/dino-spritesheet.png", 64, 36);

  // brahciosaur
  game.load.image("brachiosaur", "/assets/brachiosaur-spec.png");

  // pterasaur
  game.load.image("pterasaur", "/assets/pterasaur-spec.png");

  // health bar
  game.load.image(
    "healthbar-outline",
    "/assets/environment/healthbar-outline.png"
  );
  game.load.image("green-bar", "/assets/environment/green-bar.png");
  game.load.image("red-bar", "/assets/environment/red-bar.png");
  // game.load.spritesheet(
  //   "heart-meter",
  //   "/assets/environment/hearts-spritesheet.png",
  //   100,
  //   26
  // );
  // game.load.image("heart-1", "/assets/environment/hearts-1.png");
  // game.load.image("heart-2", "/assets/environment/hearts-2.png");
  // game.load.image("heart-3", "/assets/environment/hearts-3.png");
}

// create game world - runs once after "preload" finished
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 5000, 600);
  game.physics.arcade.checkCollision.up = false;
  game.physics.arcade.checkCollision.down = false;

  // BACKGROUND ---------------------------------------------
  sky = game.add.tileSprite(0, 0, 1000, 600, "sky");
  sky.fixedToCamera = true;

  // PLATFORMS ----------------------------------------------
  platformGroup = game.add.group();
  platformGroup.enableBody = true;
  treeGroup = game.add.group();
  treeGroup.enableBody = true;
  // platforms - 1/3 zone
  platformGroup.create(332, 472, "grass-wide-125");
  platformGroup.create(480, 325, "grass-wide-125");
  platformGroup.create(632, 472, "grass-wide-250");
  platformGroup.create(757, 408, "grass-wide-125");
  platformGroup.create(1500, 472, "grass-wide-250");
  platformGroup.create(1750, 472, "grass-wide-250");
  platformGroup.create(1622, 344, "grass-xl-128");
  platformGroup.create(1750, 408, "grass-wide-250");
  platformGroup.create(1750, 344, "grass-wide-125");
  platformGroup.create(1690, 280, "grass-wide-125");
  // platforms - 2/3 zone
  platformGroup.create(2000, 536, "grass-wide-250");
  platformGroup.create(2500, 536, "grass-wide-125");
  platformGroup.create(2950, 536, "grass-wide-250");
  platformGroup.create(3500, 536, "grass-wide-125");
  platformGroup.create(3750, 536, "grass-wide-250");
  treeGroup.create(2186, 472, "tree-full");
  treeGroup.create(2500, 472, "tree-full");
  treeGroup.create(2532, 136, "tree-full");
  treeGroup.create(2915, 86, "tree-full");
  treeGroup.create(2950, 472, "tree-full");
  treeGroup.create(3550, 472, "tree-full");
  treeGroup.create(3560, 216, "tree-full");
  treeGroup.create(2010, 280, "tree-top");
  treeGroup.create(2186, 320, "tree-top");
  treeGroup.create(2320, 200, "tree-top");
  treeGroup.create(2440, 100, "tree-top");
  treeGroup.create(2440, 300, "tree-top");
  treeGroup.create(2532, 200, "tree-top");
  treeGroup.create(2710, 280, "tree-top");
  treeGroup.create(2915, 280, "tree-top");
  treeGroup.create(2915, 150, "tree-top");
  treeGroup.create(3150, 280, "tree-top");
  treeGroup.create(3220, 180, "tree-top");
  treeGroup.create(3220, 380, "tree-top");
  treeGroup.create(3480, 100, "tree-top");
  treeGroup.create(3480, 280, "tree-top");
  treeGroup.create(3560, 280, "tree-top");
  treeGroup.create(3730, 180, "tree-top");
  treeGroup.create(3730, 380, "tree-top");
  treeGroup.create(3920, 280, "tree-top");
  // platform - 3/3 zone
  // static ground
  platformGroup.create(4100, 320, "grass-wide-125");
  platformGroup.create(4375, 408, "grass-xl-128");
  platformGroup.create(4498, 408, "grass-xl-128");
  platformGroup.create(4240, 100, "grass-wide-125");
  platformGroup.create(4440, 536, "grass-wide-125");
  platformGroup.create(4440, 344, "grass-wide-125");
  platformGroup.create(4500, 150, "grass-wide-125");
  platformGroup.create(4740, 50, "grass-wide-125");
  platformGroup.create(4875, 536, "grass-wide-125");
  // floating
  // var top = platformGroup.create(4000, 32, "grass-32");
  // top.angle += 180;

  // add ground platform
  var ground = platformGroup.create(
    0,
    game.world.height - 64,
    "platform-ground"
  );
  var ground = platformGroup.create(
    1000,
    game.world.height - 64,
    "platform-ground"
  );
  // var topGround = platformGroup.create(5000, 64, "platform-ground");
  // topGround.angle += 180;

  // prevent collapsing and pushing during platform collision
  platformGroup.setAll("body.immovable", true);
  treeGroup.setAll("body.immovable", true);

  // WALL GROUP ---------------------------------------------
  wallGroup = game.add.group();
  wallGroup.enableBody = true;
  // walls - 1/3 zone
  wallGroup.create(300, 504, "grass-32");
  wallGroup.create(457, 504, "grass-32");
  wallGroup.create(600, 504, "grass-32");
  wallGroup.create(882, 472, "grass-tall-64");
  wallGroup.create(1100, 420, "grass-32");
  wallGroup.create(1260, 420, "grass-32");
  wallGroup.create(1468, 504, "grass-32");
  wallGroup.create(1590, 440, "grass-32");
  // walls - 2/3 zone
  wallGroup.create(2340, 400, "grass-32");
  wallGroup.create(2665, 395, "grass-32");
  wallGroup.create(2760, 536, "grass-tall-64");
  wallGroup.create(2792, 536, "grass-tall-64");
  // walls - 3/3 zone
  // static ground
  wallGroup.create(4042, 200, "grass-32");
  wallGroup.create(4076, 568, "grass-32");
  wallGroup.create(4126, 30, "grass-32");
  wallGroup.create(4276, 568, "grass-32");
  wallGroup.create(4376, 250, "grass-32");
  wallGroup.create(4308, 536, "grass-tall-64");
  wallGroup.create(4340, 472, "grass-tall-64");
  wallGroup.create(4628, 536, "grass-tall-64");
  wallGroup.create(4742, 500, "grass-32");
  wallGroup.create(4842, 200, "grass-32");

  // prevent collapsing and pushing during platform collision
  wallGroup.setAll("body.immovable", true);

  // EGG GROUP ----------------------------------------------
  eggGroup = game.add.group();
  eggGroup.enableBody = true;
  // add eggs
  var eggData = [
    { x: 780, y: 250 },
    { x: 1200, y: 250 },
    { x: 1600, y: 250 },
    { x: 2530, y: 350 },
    { x: 3020, y: 300 },
    { x: 3500, y: 50 },
    { x: 4135, y: 0 },
    { x: 4642, y: 350 },
    { x: 4800, y: 0 },
  ];
  for (var i = 0; i < eggData.length; i++) {
    var egg = eggGroup.create(eggData[i].x, eggData[i].y, "egg");
    egg.anchor.set(0.5, 0.5);
    egg.body.gravity.y = 400;
    egg.body.bounce.y = 0.3;
    // animations
  }

  // ENEMIES ------------------------------------------------
  // triceratops
  triceratopsGroup = game.add.group();
  triceratopsGroup.enableBody = true;
  // add triceratops
  var triceratopsData = [
    { x: 1260, y: 450 },
    { x: 1250, y: 450 },
  ];
  for (var i = 0; i < triceratopsData.length; i++) {
    var triceratops = triceratopsGroup.create(
      triceratopsData[i].x,
      triceratopsData[i].y,
      "triceratops"
    );
    triceratops.anchor.set(0.5, 0.5);
    triceratops.scale.setTo(2);
    triceratops.body.gravity.y = 400;
    triceratops.body.bounce.x = 1;
    triceratops.animations.add("right", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    triceratops.animations.play("right");
    triceratops.body.velocity.x = Math.random() * 50 + 100;
    if (Math.random() < 0.5) triceratops.body.velocity.x *= 1;
  }
  // brachiosaur
  brachiosaur = game.add.sprite(3600, 200, "brachiosaur");
  brachiosaur.scale.setTo(1.25);
  game.physics.arcade.enable(brachiosaur);
  // pterasaur
  pterasaur1 = game.add.sprite(4600, -50, "pterasaur");
  pterasaur1.scale.setTo(1.5);
  pterasaur1.anchor.set(0.5, 0.5);
  pterasaur1.angle -= 45;
  game.physics.arcade.enable(pterasaur1);

  pterasaur2 = game.add.sprite(4980, -50, "pterasaur");
  pterasaur2.scale.setTo(1.5);
  pterasaur2.anchor.set(0.5, 0.5);
  pterasaur2.angle -= 45;
  game.physics.arcade.enable(pterasaur2);

  pterasaur3 = game.add.sprite(5200, -50, "pterasaur");
  pterasaur3.scale.setTo(1.5);
  pterasaur3.anchor.set(0.5, 0.5);
  pterasaur3.angle -= 45;
  game.physics.arcade.enable(pterasaur3);

  // PLAYER -------------------------------------------------
  player = game.add.sprite(65, 300, "player");
  player.anchor.set(0.5, 0.5);
  player.scale.setTo(1.5);
  game.camera.follow(player);
  // player physics
  game.physics.arcade.enable(player);
  player.body.gravity.y = 450;
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.1;
  // player animations
  player.animations.add("right", [0, 1, 2, 3, 4, 5, 6], 6, true);
  // player health
  player.health = 3;
  player.maxHealth = 3;
  // player reset after kill
  player.events.onKilled.add(function () {
    player.reset(65, 300, 3);
    brachiosaur.reset(3600, 200);
    life += 1;
    lifeText.text = "Life: " + life;
  });

  // KEYBOARD INPUT -----------------------------------------
  arrowKey = game.input.keyboard.createCursorKeys();

  // SCORE --------------------------------------------------
  scoreText = game.add.text(20, 20, "Eggs: " + score + "/9", {
    fill: "#ffffff",
  });
  scoreText.setShadow(2, 2, "#000000", 4);
  scoreText.fixedToCamera = true;

  // HEALTH BAR ---------------------------------------------
  var healthText = game.add.text(325, 20, "Health: ", { fill: "#ffffff" });
  healthText.setShadow(2, 2, "#000000", 4);
  healthText.fixedToCamera = true;
  barBackground = game.add.image(450, 25, "red-bar");
  healthBar = game.add.image(450, 25, "green-bar");
  barOutline = game.add.image(450, 25, "healthbar-outline");
  barBackground.fixedToCamera = true;
  healthBar.fixedToCamera = true;
  barOutline.fixedToCamera = true;

  // MESSAGE ------------------------------------------------
  messageText = game.add.text(500, 150, "", { fill: "#ffffff" });
  messageText.anchor.set(0.5, 0.5);
  messageText.setShadow(2, 2, "#000000", 4);
  messageText.fixedToCamera = true;
  // messageText.visible = false;

  lifeText = game.add.text(800, 25, "Life: ", { fill: "#ffffff" });
  lifeText.setShadow(2, 2, "#000000", 4);
  lifeText.fixedToCamera = true;

  // TEMPORARY - distance markers
  game.add.text(500, 200, "500px --->", { fill: "yellow" });
  game.add.text(1000, 200, "1000px --->", { fill: "yellow" });
  game.add.text(1500, 200, "1500px --->", { fill: "yellow" });
  game.add.text(2000, 200, "2000px --->", { fill: "yellow" });
  game.add.text(2500, 200, "2500px --->", { fill: "yellow" });
  game.add.text(3000, 200, "3000px --->", { fill: "yellow" });
  game.add.text(3500, 200, "3500px --->", { fill: "yellow" });
  game.add.text(4000, 200, "4000px --->", { fill: "yellow" });
  game.add.text(4500, 200, "4500px --->", { fill: "yellow" });
}

// update gameplay - runs in continuous loop after "create" finished
function update() {
  game.physics.arcade.collide(player, platformGroup);
  game.physics.arcade.collide(player, treeGroup);
  game.physics.arcade.collide(player, wallGroup);
  game.physics.arcade.collide(eggGroup, platformGroup);
  game.physics.arcade.collide(eggGroup, wallGroup);
  game.physics.arcade.collide(eggGroup, treeGroup);
  game.physics.arcade.collide(player, eggGroup, collectEgg, null, this);
  game.physics.arcade.collide(
    triceratopsGroup,
    platformGroup
    // patrolPlatform,
    // null,
    // this
  );
  game.physics.arcade.collide(triceratopsGroup, wallGroup);
  game.physics.arcade.overlap(
    player,
    triceratopsGroup,
    touchTriceratops,
    null,
    this
  );
  game.physics.arcade.overlap(
    player,
    brachiosaur,
    touchBrachiosaur,
    null,
    this
  );
  game.physics.arcade.overlap(player, pterasaur1, touchPterasaur, null, this);
  game.physics.arcade.overlap(player, pterasaur2, touchPterasaur, null, this);
  game.physics.arcade.overlap(player, pterasaur3, touchPterasaur, null, this);

  // keyboard input w/ velocity + animation change
  if (arrowKey.up.justDown && player.body.touching.down) {
    player.body.velocity.y = -300;
    // player animations "jump"
  }
  if (arrowKey.right.isDown) {
    player.body.velocity.x = 200;
    player.animations.play("right");
  } else if (arrowKey.left.isDown) {
    player.body.velocity.x = -200;
    // player animations "left"
  } else {
    player.body.velocity.x = 0;
    player.animations.stop();
  }

  // player reset if falls below the viewable area
  fallDamage(player);

  // background scrolling
  sky.tilePosition.x = game.camera.x * -0.2;

  // brachiosaur movement
  moveBrachiosaur(brachiosaur, player);
  // moveEnemyUp(brachiosaur);

  movePterasaur(pterasaur1, 2);
  movePterasaur(pterasaur2, 3);
  movePterasaur(pterasaur3, 5);

  if (score == 9) {
    scoreText.text = "Eggs: :)";
    messageText.text = "You've collected all of the eggs!";
    messageText.visible = true;
  }
}

// triceratops animation based on x veloctiy
// triceratopsGroup.forEach(function (triceratops) {
// if (triceratops.body.velocity.x < 0) triceratops.animations.play("right");
// else triceratops.animations.play("right");
// });

// add custom functions (for collisions, etc.)
function collectEgg(player, egg) {
  egg.kill();
  score += 1;
  scoreText.text = "Eggs: " + score + "/9";
  // sound effect
}

// function patrolPlatform(triceratops, platform) {
//   // if enemy about to go over right or left edge of platform
//   if (
//     (triceratops.body.velocity.x > 0 && triceratops.right > platform.right) ||
//     (triceratops.body.velocity.x < 0 && triceratops.left < platform.left)
//   ) {
//     triceratops.body.velocity.x *= -1; // reverse direction
//   }
// }

// damage overlap function
function touchTriceratops(player, triceratops) {
  triceratops.body.velocity.x *= -1;
  // triceratops.body.velocity.y = -250;
  if (player.x < triceratops.x)
    (player.body.velocity.x = -250), (player.body.velocity.y = -300);
  else (player.body.velocity.x = 250), (player.body.velocity.y = -300);
  player.damage(0.5);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

// damage overlap function
function touchBrachiosaur(player, brachiosaur) {
  brachiosaur.body.velocity.x *= -1;
  // brachiosaur.body.velocity.y = -250;
  if (player.x < brachiosaur.x)
    (player.body.velocity.x = -250), (player.body.velocity.y = -300);
  else (player.body.velocity.x = 250), (player.body.velocity.y = -300);
  player.damage(1);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

// damgge overlap function
function touchPterasaur(player, pterasaur) {
  pterasaur.body.velocity.x *= -1;
  // pterasaur.body.velocity.y = -250;
  if (player.x < pterasaur.x)
    (player.body.velocity.x = -250), (player.body.velocity.y = -300);
  else (player.body.velocity.x = 250), (player.body.velocity.y = -300);
  player.damage(0.02);
  healthBar.scale.setTo(player.health / player.maxHealth, 1);
}

function moveBrachiosaur(brachiosaur, player) {
  if (player.x > 2200 && brachiosaur.x > 3500) {
    brachiosaur.body.velocity.x = -350;
  } else if (brachiosaur.x < 2200) {
    brachiosaur.body.velocity.x = 225;
  }
}

function movePterasaur(pterasaur, speed) {
  if (player.x > 4000) {
    pterasaur.y += speed;
    pterasaur.x -= speed;
  }
  if (pterasaur.y > 650) {
    resetPterasaurPos(pterasaur);
  }
}

function resetPterasaurPos(pterasaur) {
  pterasaur.y = 0;
  var randomX = game.rnd.integerInRange(4000, 5500);
  pterasaur.x = randomX;
}

function fallDamage(player) {
  if (player.y > 650) {
    player.damage(3);
    healthBar.scale.setTo(player.health / player.maxHealth, 1);
  }
}

// function moveEnemyUp(brachiosaur) {
//   brachiosaur.body.velocity.y = -200;
//   brachiosaur.body.velocity.x = -200;
//   // if (brachiosaur.y == 300) {
//   //   moveEnemyDown(brachiosaur, 3);
//   // }
//   // if (brachiosaur.x == 2100) {
//   //   brachiosaur.x *= -1;
//   // }
// }

// function moveEnemyDown(brachiosaur, speed) {
//   brachiosaur.y += speed;
//   brachiosaur.x -= speed;
// }

// function resetEnemyPos(brachiosaur) {
//   brachiousar.y = 600;
//   var randomX = Phaser.Math.Between(2200, 3600);
//   brachiosuar.x = randomX;
// }
