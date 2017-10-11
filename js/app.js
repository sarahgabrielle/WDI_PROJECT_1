let checkCollide;
let $spaceship;
let $planet;
let $button;
let $gameOver;
let score;
let $timeContainer = null;
let interval = null;
let timer = 4;
let over;
let speed = 200;

$(() =>{

  const $container = $('.container');
  const $score = $('#score');
  $button = $('button');
  $timeContainer = $('<div id="timer"></div>');
  $spaceship = $('<div id="spaceship"></div>');
  $gameOver = $('<div class="gameover">Game Over</div>');


  //Game Starts Now
  $button.on('click', () => {
    over = false;
    $button.html('Play');
    $container.empty();
    score = 0;
    $score.html(`Score: ${score}`);
    interval = setInterval(countdown, 1000);
  });


  function play(){
    $container.empty();
    // score = 0;
    // $score.html(`Score: ${score}`);
    createSpaceship();
    checkCollide = setInterval(createPlanets, 200);
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
    $planet = $('.planets');

    movePlanets($planet);
  }

  function movePlanets(){
    $planet.animate({
      'top': '900px',
      duration: 0
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

    over = true;
    return true;
  }

  function step(){
    if (over) return;
    if (collisions($spaceship, $(this))) {
      gameOver();
      playAgain();
    }
  }

  function callback() {
    checkScore();
    $(this).remove();
  }

  function gameOver(){
    clearInterval(checkCollide);
    over = true;
    $(this).stop();
    $('.planets').finish();
    $container.append($gameOver);
  }

  function checkScore(){
    score++;
    $score.html(`Score: ${score}`);

    // if(score === 20){
    //
    // }
  }

  function playAgain(){
    $button.html('Play Again');
  }
});
