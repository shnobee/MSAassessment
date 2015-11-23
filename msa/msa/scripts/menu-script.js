
$(document).ready(function () {
    $("#coursesMenuButton").on("click", function () {
        $("#content").load("courses.html");
    });
});


$(document).ready(function () {
    $("#studentsMenuButton").on("click", function () {
        $("#content").load("students.html");
    });
});


(function ($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);


  };
})(jQuery);

(function($){
$(document).ready(function(){

$(window).load(function() {
  $("#cssmenu").menumaker({
    title: "Menu",
    format: "dropdown"
  });


$('#cssmenu').prepend("<div id='menu-indicator'></div>");

var foundActive = false, activeElement, indicatorPosition, indicator = $('#cssmenu #menu-indicator'), defaultPosition;

$("#cssmenu > ul > li").each(function() {
  if ($(this).hasClass('active')) {
    activeElement = $(this);
    foundActive = true;
  }
});

if (foundActive === false) {
  activeElement = $("#cssmenu > ul > li").first();
}

defaultPosition = indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
console.log(activeElement);
console.log(activeElement.position().left);
console.log(activeElement.width());
indicator.css("left", indicatorPosition);

$("#cssmenu > ul > li").hover(function() {
  activeElement = $(this);
  indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
  indicator.css("left", indicatorPosition);
}, 
function() {
  indicator.css("left", defaultPosition);
});

});

});
})(jQuery);