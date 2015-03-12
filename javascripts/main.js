var constant = {
  stageHeight: 775,
  stageWidth: 436,
  standard: 16 / 9,
  zoomRate: 1,
  upW: 36,
  upH: 38,
};

$(function () {

  var adjust = function () {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var rate = height / width;
    //stage
    if (rate > constant.standard) {
      $(".stage").css({
        "width": width,
        "height": width * constant.standard
      });
      zoomRate = width / constant.stageWidth;
    } else {
      $(".stage").css({
        "width": height / constant.standard,
        "height": height
      });
      zoomRate = height / constant.stageHeight;
    }
    //up_guide
    $(".up_guide").css({
      "width": constant.upW * zoomRate,
      "height": constant.upH * zoomRate
    });



  };
  window.onresize = adjust;
  adjust();
  $(".stage").click(function () {
    if ($(".current-stage").prev(".stage").length > 0) {
      $(".current-stage").css("-webkit-animation", "stageOut 1s ease forwards")
      .removeClass("current-stage")
      .prev(".stage").addClass("current-stage");;
    }
  });

  $("body").keydown(function () {
    if ($(".current-stage").next(".stage").length > 0) {
      $(".current-stage").removeClass("current-stage")
      .next(".stage").css("-webkit-animation", "stageBack 1s ease forwards")
      .addClass("current-stage");;
    }
  });  

});