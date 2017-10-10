$(() =>{

  function play(){
    moveSpaceship();
    setInterval(createPlanets, 1000);
  }

  // createPlanets();



  function moveSpaceship(){
    $(document).keydown(function(e) {
      const shipPosition = $('#spaceship').position();

      switch(e.keyCode) {
        case 37: // left
          if(shipPosition.left > 0 ) {
            $('#spaceship').css('left', '-=10px');
          }
          break;
        case 39: // right
          if(shipPosition.left < 580 ) {
            $('#spaceship').css('left', '+=10px');
          }
      }
    });
  }
  function createPlanets(){
    const $container = $('.container');

    const randomTop = Math.floor(Math.random() * 580) + 1;
    const randomHeight = Math.floor(Math.random() * 20) + 10;
    const randomWidth = Math.floor(Math.random() * 10) + 10;

    const $planet = $('<div class="planets"></div>');
    $planet.css({'left': randomTop, 'height': randomHeight, 'width': randomWidth});
    $container.append($planet);
    $planet.animate({
      'top': '600px',
      duration: 1
    }, {
      duration: 8000,
      step: step,
      complete: callback
    });

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
      if (collisions($('#spaceship'), $('.planets'))) {
        console.log('game over');
      }
    }

    function callback() {
      $(this).remove();
    }
  }


});
