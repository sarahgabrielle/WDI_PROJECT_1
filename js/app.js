$(() =>{

  $(document).keydown(function(e) {
    var position = $('#spaceship').position();

    switch(e.keyCode) {
      case 37: // left
        if ( position.left > 0 ) {
          $('#spaceship').css('left', '-=10px');
        }
        break;
      case 39: // right
        if( position.left < 580 ) {
          $('#spaceship').css('left', '+=10px');
        }
    }
  });

});
