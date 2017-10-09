$(() =>{

  moveSpaceship();
  setInterval(createPlanets, 1000);

  function moveSpaceship(){
    $(document).keydown(function(e) {
      var position = $('#spaceship').position();

      switch(e.keyCode) {
        case 37: // left
          if(position.left > 0 ) {
            $('#spaceship').css('left', '-=10px');
          }
          break;
        case 39: // right
          if(position.left < 580 ) {
            $('#spaceship').css('left', '+=10px');
          }
      }
    });
  }

  function createPlanets(){
    const $container = $('.container');
    const $planet = $('<div class="planets"></div>');
    $planet.css('left', Math.floor(Math.random() * (600 - 20))) + 1;
    $container.append($planet);
    $planet.animate({
      'top': '600px',
      duration: 1
    }, {
      duration: 10000,
      step: step,
      complete: callback
    });

    function step() {
      const position = $(this).position();
      console.log(position);
      // Is the position of the fall element in collision with the paddle-thing
      var ship = {x: 600, y: 0, width: 20, height: 20};
      var star = {x: 0, y: 600, width: 20, height: 20};

      if (ship.x < star.x + star.width &&
   ship.x + ship.width > star.x &&
   ship.y < star.y + star.height &&
   ship.height + ship.y > star.y) {
        console.log('collision detected!');
      }

    }

    function callback() {
      $(this).remove();
    }
  }



});
