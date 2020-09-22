$(function(){
      $.scrollify({
      section : ".sliding",
      easing: "easeOutExpo",
      scrollSpeed: 800,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: true,
      overflowScroll: true,
      updateHash: true,
      touchScroll:true,
      before:function() {},
      after:function() {},
      afterResize:function() {},
      afterRender:function() {}

    });
$.scrollify.move("exp");
