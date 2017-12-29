let checkCollide;
let $spaceship;
let $planet;
let $button;
let $gameOver;
let score;
let $timeContainer = null;
let interval = null;
let timer = 4;
let levelUp = 1;
let speed = 350;
let gameOverAudio;
let audioPlay;
let $stars;
let $stars2;
let $stars3;

$(() =>{

  const $container = $('.container');
  const $score = $('#score');
  const $highScore = $('#best');
  $button = $('button');
  const $levelUp = $('#level');
  $timeContainer = $('<div class = "font-effect-neon animated pulse infinite" id="timer"></div>');
  $spaceship = $('<div id="spaceship"></div>');
  $stars = $('#stars');
  $stars2 = $('#stars2');
  $stars3 = $('#stars3');
  $gameOver = $('<div class="font-effect-neon animated pulse infinite" id="gameover">Game Over</div>');
  audioPlay = new Audio('audio/I_Cant_Remmber.mp3');
  gameOverAudio = new Audio('audio/Mountain_Jump.mp3');
  bestScore();


  //Game Starts Now
  $button.on('click', () => {
    reset();
    audioPlay.play();
    $button.html('Play');
    $container.append('<div id="stars"></div>');
    $container.append('<div id="stars2"></div>');
    $container.append('<div id="stars3"></div>');
    interval = setInterval(countdown, 1000);
  });

  function play(){
    $container.empty();
    $container.append('<div id="stars"></div>');
    $container.append('<div id="stars2"></div>');
    $container.append('<div id="stars3"></div>');
    createSpaceship();
    checkCollide = setInterval(createPlanets, speed);
  }

  function countdown() {
    timer = timer-1;
    $timeContainer.html(timer);
    $container.append($timeContainer);

    if (timer <= 0) {
      timer = 4;
      clearInterval(interval);
      play();
    }
  }

  function createSpaceship(){
    $container.append($spaceship);

    moveSpaceship();
  }

  function moveSpaceship(){
    $(document).keydown(function(e) {
      const shipPosition = $spaceship.position();
      switch(e.keyCode) {
        case 37: // left
          if(shipPosition.left > 0 ) {
            $spaceship.css('left', '-=10px');
          }
          break;
        case 39: // right
          if(shipPosition.left < 550 ) {
            $spaceship.css('left', '+=10px');
          }
          break;
        case 38: // up
          if(shipPosition.top > 0 ) {
            $spaceship.css('top', '-=10px');
          }
          break;
        case 40: // down
          if(shipPosition.top < 550 ) {
            $spaceship.css('top', '+=10px');
          }
      }
    });
  }

  function createPlanets(){
    const images = ['asteroid', 'milky-way', 'neptune', 'saturn', 'venus'];
    const $randomImage = images[Math.floor(Math.random() * images.length)];
    console.log($randomImage);
    const randomTop = Math.floor(Math.random() * 550) + 1;
    const randomHeight = Math.floor(Math.random() * 50) + 10;
    const randomWidth = Math.floor(Math.random() * 50) + 10;

    $planet = $('<div class="planets"></div>');
    $planet.css({'left': randomTop, 'height': randomHeight, 'width': randomWidth, 'background-image': `url(./images/${$randomImage}.png)`});
    $container.append($planet);
    movePlanets($planet);
  }

  function movePlanets($planet){
    $planet.animate({
      'top': '700px'
    }, {
      duration: 3000,
      step: step,
      complete: callback
    });
  }

  function collisions($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;

    return true;
  }

  function step(){
    if (collisions($spaceship, $(this))) {
      $(this).stop().remove();
      gameOver();
      playAgain();
    }
  }

  function callback() {
    $(this).remove();
    checkScore();
  }

  function gameOver(){
    audioPlay.pause();
    audioPlay.currentTime = 0;
    gameOverAudio.play();
    clearInterval(checkCollide);
    $('.planets').stop().remove();
    $container.append($gameOver);
    $(document).off('keydown');
  }

  function checkScore(){
    score++;
    $score.html(`Score: ${score}`);
    bestScore();

    if(score % 20 === 0){
      clearInterval(checkCollide);
      levelUp ++;
      $levelUp.html(`Level: ${levelUp}`);
      $levelUp.addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('animated flash');
      });
      speed = speed - 20;
      checkCollide = setInterval(createPlanets, speed);
    }
  }

  function bestScore (){
    if (window.localStorage.bestScore) {
      if(score > parseInt(window.localStorage.bestScore)){
        window.localStorage.bestScore = score;
      }
    } else {
      window.localStorage.setItem('bestScore', score);
    }
    $highScore.html(`Best: ${window.localStorage.bestScore}`);
    console.log($highScore);
  }

  function playAgain(){
    $button.html('Play Again');
  }

  function reset(){
    speed = 350;
    levelUp = 1;
    $levelUp.html(`Level: ${levelUp}`);
    score = 0;
    $score.html(`Score: ${score}`);
    $container.empty();
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
  }
});
