// first slider
$('.slider-one')
.not(".slick-initialized")
.slick({
    autoplay:true,
    autoplaySpeed:2000,
    dots:true,
    prevArrow:".site-slider.slider-btn.prev",
    nextArrow:".site-slider.slider-btn.next",
});
//second-slider
(function($){
    ("use strict");

    $(".set-bg").each(function (){
        var bg = $(this).data("setbg")
        $(this).css("background-image","url(" + bg + ")");
    });
    // $(".image-popup").magnificPopup({
    //     type: "image",
    // }); 
})(jQuery);
const drop = document.getElementById('drop');
const delhi = document.getElementById('delhi');
const mum = document.getElementById('mum');
const jai = document.getElementById('jai');
const chen = document.getElementById('chen');
const bang = document.getElementById('bang');
const pune = document.getElementById('pune');

// ✅ Change button text on click
delhi.addEventListener('click', function handleClick() {
  drop.textContent = 'Delhi';
});