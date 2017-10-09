$(() =>{

  // setInterval(fallingPlanets, 500);

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

  function fallingPlanets(){
    $('#planets').animate({'top': '+=30px', duration: 0.1}, 500, 'linear');
  }



});
