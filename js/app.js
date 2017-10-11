let checkCollide;
let $spaceship;
let $planet;
let $button;
let $gameOver;
let score;
let $timeContainer = null;
let interval = null;
let timer = 4;
let levelUp;
let speed = 300;

$(() =>{

  const $container = $('.container');
  const $score = $('#score');
  $button = $('button');
  $timeContainer = $('<div class = "font-effect-neon" id="timer"></div>');
  $spaceship = $('<div id="spaceship"></div>');
  $gameOver = $('<div class = "font-effect-neon" id="gameover">Game Over</div>');


  //Game Starts Now
  $button.on('click', () => {
    $button.html('Play');
    $container.empty();
    score = 0;
    $score.html(`Score: ${score}`);
    interval = setInterval(countdown, 1000);
  });


  function play(){
    $container.empty();
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
          if(shipPosition.left < 580 ) {
            $spaceship.css('left', '+=10px');
          }
      }
    });
  }

  function createPlanets(){
    const randomTop = Math.floor(Math.random() * 580) + 1;
    const randomHeight = Math.floor(Math.random() * 50) + 10;
    const randomWidth = Math.floor(Math.random() * 50) + 10;

    $planet = $('<div class="planets"></div>');
    $planet.css({'left': randomTop, 'height': randomHeight, 'width': randomWidth});
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
    clearInterval(checkCollide);
    $('.planets').stop().remove();
    $container.append($gameOver);
  }

  function checkScore(){
    score++;
    $score.html(`Score: ${score}`);

    if(score % 20 === 0){
      clearInterval(checkCollide);
      speed - 10;
      levelUp = setInterval(createPlanets, speed);
    } else {
      //gameover and container should be cleared.
    }
  }

  function playAgain(){
    $button.html('Play Again');
  }
});
