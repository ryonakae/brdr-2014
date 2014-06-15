var stage;
var stageCtx;


jQuery(document).ready(function() {
  console.log('ready');

  stage = document.getElementById("canvas");
  stageCtx = stage.getContext("2d");
  stageCtx.globalAlpha = 1;

  // fill black
  // stageCtx.globalCompositeOperation = "copy"
  // stageCtx.fillStyle = "#000000";
  // stageCtx.fillRect(0,0, stage.width, stage.height);

  jQuery(window).on("click", function(){
    drawParticle();
  });
});


function drawParticle() {
  stageCtx.globalCompositeOperation = "source-over";
  stageCtx.fillStyle = "#000000";
  stageCtx.fillRect(0, 0, stage.width, stage.height);

  stageCtx.globalCompositeOperation = "lighter";

  stageCtx.beginPath();
  stageCtx.lineWidth = 1;
  stageCtx.moveTo(100, 20);
  stageCtx.lineTo(20, 180);
  stageCtx.lineTo(180, 180);
  stageCtx.closePath();;
  stageCtx.strokeStyle = "rgba(255,255,255,0.5)";
  stageCtx.stroke();
}