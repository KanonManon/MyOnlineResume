//config
$(function () {
  var adjust = function () {
    var maxHeight = 775;
    var maxWidth = 436;
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var standard = 16 / 9;
    var rate = height / width;
    var zoomRate = 1;
    if (rate > standard) {
      zoomRate = width / maxWidth;
    } else {
      zoomRate = height / maxHeight;
    }
    less.modifyVars({
      '@zoomRate': zoomRate
    });
  };

  window.onresize = adjust;
  adjust();

  $(".stage").click(function () {
    if ($(".current-stage").prev(".stage").length > 0) {
      $(".current-stage").css("-webkit-animation", "stageOut 1s ease forwards")
        .removeClass("current-stage")
        .prev(".stage").addClass("current-stage");
    }
  });

  $("body").keydown(function () {
    if ($(".current-stage").next(".stage").length > 0) {
      $(".current-stage").removeClass("current-stage")
        .next(".stage").css("-webkit-animation", "stageBack 1s ease forwards")
        .addClass("current-stage");
    }
    // $(".logo").removeClass("fadeIn").addClass("fadeOut");
  });
  // $("body").keyup(function () {
  //   $(".logo").addClass("fadeIn").removeClass("fadeOut");
  // });

});