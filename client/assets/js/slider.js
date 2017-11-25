
var slides   = [];
var curSlide = 0;

$(function(){
  loadSlides();
  //startSlider();
  changeSlide();
});

function loadSlides(){
  $("[data-type=slide]").each(function(){
    var id = $(this).data('slide-id');
    slides.push(id);
  });
}

function startSlider(){
  setInterval(function(){
    changeSlide();
  }, 7000);
}

function hideSlides(){
  $("[data-type=slide]").hide();
}

function changeSlide(){
  hideSlides();
  $("[data-slide-id=" + slides[curSlide] + "]").slideDown(500);
  curSlide = curSlide++ >= slides.length - 1 ? 0 : curSlide++;
}