var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score = 0;
var cloud, cloudsGroup, cloudImage, obstacle_img;
var obstacleGroup;
var gameState = 1;
var HI = 10.0;
var newImage;
var groundSpeed = 0;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  gameOverImage = loadImage('gameOver.png');
  cloudImage = loadImage("cloud.png");
  restartImage = loadImage("restart.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");

  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkSound = loadSound("checkPoint.mp3");
  var outside = 2;
 
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  gameOver = createSprite(300, 50, 50, 50)
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.8;

  restart = createSprite(300, 100, 50, 50);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background(180);
console.log(frameCount+"\t"+Math.round(getFrameRate()/60))
  if (gameState == 1) {
    ground.velocityX = -(4 + groundSpeed) //score/10);
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    gameOver.visible=false;
    restart.visible=false;
   trex.changeAnimation("running");
    trex.velocityY = trex.velocityY + 0.8
    if (obstacleGroup.isTouching(trex)) {
      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      ground.velocityX = 0;
      trex.changeAnimation("collided");
      dieSound.play();
      gameState = 0;
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (score % 500 == 0 && score > 0) {
      checkSound.play();
      groundSpeed = 2 * score / 100
    }
    spawnClouds();
    spawnObsticles();
    score =score+Math.round(getFrameRate()/60)
  } else if (gameState == 0) {
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
      gameState = 1;
    }
  } 
  fill("white")
  text('# PRAGYA ',10, 20)
  
    trex.collide(invisibleGround);
  textSize(15)
    text('score: ' + score, 500, 20)
    drawSprites();
  }

  function spawnClouds() {
  
    if (frameCount % 60 === 0) {
      cloud = createSprite(600, 100, 40, 10);
      cloud.addImage(cloudImage)
      cloud.y = Math.round(random(10, 60))
      cloud.scale = 0.4;
      cloud.velocityX = -3;
      cloud.lifetime = 600 / 3;

      cloud.depth = trex.depth
      trex.depth = trex.depth + 1;

      cloudGroup.add(cloud);
    }
  }
  function spawnObsticles() {
   
    if (frameCount % 60 === 0) {
      obsticles = createSprite(600, 165, 10, 40);
    
      obsticles.velocityX = -6;
      var anyone = Math.round(random(1, 6))

      switch (anyone) {
        case 1:
          obsticles.addImage(obstacle1Image);
          break;
        case 2:
          obsticles.addImage(obstacle2Image);
          break;
        case 3:
          obsticles.addImage(obstacle3Image);
          break;
        case 4:
          obsticles.addImage(obstacle4Image);
          break;
        case 5:
          obsticles.addImage(obstacle5Image);
          break;
        case 6:
          obsticles.addImage(obstacle6Image);
          break;
      }
      obsticles.scale = 0.6;
      obsticles.lifetime = 600 / 3;
      obstacleGroup.add(obsticles);
    }
  }