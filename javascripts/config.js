//config
$(function () {
  var direction = "next";
  var timers = [];
  var state = false;
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


  var startShow = function(){
    var self;
    if(direction == "next"){
      self = $(".current-stage").prev(".stage");
    }else{
      self = $(".current-stage").next(".stage");
    }   
    if(self.hasClass("viewport_01")){
      //nothing
    } else if(self.hasClass("viewport_02")){
      $(".me").removeClass("slideOutRight").addClass("slideInRight");
      $(".no0").removeClass("slideOutRight").addClass("slideInRight");
      $(".about").removeClass("slideOutLeft").addClass("slideInLeft");
    } else if(self.hasClass("viewport_03")){
      $(".career").removeClass("slideOutRight").addClass("slideInRight");
      $(".neu").removeClass("slideOutLeft").addClass("slideInLeft");
      $(".edu").removeClass("slideOutBottom").addClass("slideInBottom");
    } else if(self.hasClass("viewport_04")){
      $(".rd").removeClass("slideOutBottom").addClass("slideInBottom");
    }  

  };

  var endShow = function(callback){
    state = true;
    var self = $(".current-stage");
    if(self.hasClass("viewport_01")){
      //nothing
    } else if(self.hasClass("viewport_02")){
      $(".about").removeClass("slideInLeft").addClass("slideOutLeft"); 
      $(".no0").removeClass("slideInRight").addClass("slideOutRight");  
      $(".me").removeClass("slideInRight").addClass("slideOutRight");
    } else if(self.hasClass("viewport_03")){
      $(".career").removeClass("slideInRight").addClass("slideOutRight");  
      $(".neu").removeClass("slideInLeft").addClass("slideOutLeft");
      $(".edu").removeClass("slideInBottom").addClass("slideOutBottom");
    } else if(self.hasClass("viewport_04")){
      $(".rd").removeClass("slideInBottom").addClass("slideOutBottom");  
    }  
  };
       
  var setCurrentStage = function(){
    if(direction == "next"){
      $(".current-stage").removeClass("current-stage").prev(".stage").addClass("current-stage");
    }else{
      $(".current-stage").removeClass("current-stage").next(".stage").addClass("current-stage");
    }   
    state = false;
  };  

  var changeStage = function(){
    if(direction == "next"){
      $(".current-stage").removeClass("stageBack").addClass("stageOut");
    }else{
      $(".current-stage").next(".stage").removeClass("stageOut").addClass("stageBack");
    }    
  };       

  var showNext = function(){
    if ($(".current-stage").prev(".stage").length > 0) {//if next page exist
      direction = "next";
      endShow();
      if($(".current-stage").hasClass("viewport_01")){//start immidietly
        changeStage();
        timers[0] = setTimeout(function(){
          startShow();
          timers[0] = null;
        },1000); 
        timers[1] = setTimeout(function(){
          setCurrentStage();
          timers[1] = null;
        },3000);
      }else{
        timers[2] = setTimeout(function(){
          changeStage();
          timers[2] = null;
        },1200);
        timers[3] = setTimeout(function(){
          startShow();
          timers[3] = null;
        },3000);
        timers[4] = setTimeout(function(){
          setCurrentStage();
          timers[4] = null;
        },5000);        
      }
    }
  };  
  //cost 2s to show one page,cost 2s to end one page,cost 1s to change stage,

  var showPrev = function(){
    if ($(".current-stage").next(".stage").length > 0) {//if prev page exist
      direction = "prve";
      endShow();
      if($(".current-stage").hasClass("viewport_02")){//start immidietly
        timers[5] = setTimeout(function(){
          changeStage();
          timers[5] = null;
        },1500);
        timers[6] = setTimeout(function(){
          setCurrentStage();
          timers[6] = null;
        },4000);
      }else{
        timers[7] = setTimeout(function(){
          changeStage();
          timers[7] = null;
        },1200);
        timers[8] = setTimeout(function(){
          startShow();
          timers[8] = null;
        },3000);
        timers[9] = setTimeout(function(){
          setCurrentStage();
          timers[9] = null;
        },5000);        
      }

    }
  };

  var paused = function() {
    $(".current-stage").addClass("paused");
  }

  $("body").keydown(function (e) {
    if(state){//key nop
      return;
    }
    switch(e.keyCode){
      case 38://pre
        showPrev();
        break;
      case 40://next
        showNext();
        break;
      default:
        break;
    }
  });

  setTimeout(function(){
    $(".viewport_01").addClass("current-stage");
  },1500);
});