
var slides   = [];
var curSlide = 1;

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
  }, 5000);
}

function hideSlides(){
  $("[data-type=slide]").hide();
}

function changeSlide(){
  hideSlides();
  $("[data-slide-id=" + slides[curSlide] + "]").fadeIn(300);
  curSlide = curSlide++ >= slides.length - 1 ? 0 : curSlide++;
}