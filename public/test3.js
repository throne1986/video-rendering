/* eslint-disable eol-last */
/* eslint-disable no-undef */
/* eslint-disable quotes */
var canvas, stage;
	function init() {
        var framesPerSecond = 60;
        var numFrames = framesPerSecond * 5; // a 5 second 60fps video
        var frameNum = 0;
      
        var progressElem = document.getElementById("progress");
        var progressNode = document.createTextNode("");
        progressElem.appendChild(progressNode);
      
        function onProgress(progress) {
          progressNode.nodeValue = (progress * 100).toFixed(1) + "%";
        }
      
        function showVideoLink(url, size) {
          size = size ? (" [size: " + (size / 1024 / 1024).toFixed(1) + "meg]") : " [unknown size]";
          var a = document.createElement("a");
          a.href = url;
          var filename = url;
          var slashNdx = filename.lastIndexOf("/");
          if (slashNdx >= 0) {
            filename = filename.substr(slashNdx + 1);
          }
          a.download = filename;
          a.appendChild(document.createTextNode("Download"));
          var container = document.getElementById("container").insertBefore(a, progressElem);
      
        }
      
        var capturer = new CCapture( {
          format: 'ffmpegserver',
          //workersPath: "3rdparty/",
          //format: 'gif',
          //verbose: true,
          framerate: framesPerSecond,
          onProgress: onProgress,
          //extension: ".mp4",
          //codec: "libx264",
        } );
        capturer.start();


		canvas = document.getElementById("testCanvas");
		stage = new createjs.Stage(canvas);
		var ball = new createjs.Shape();
		ball.graphics.setStrokeStyle(5, 'round', 'round');
		// eslint-disable-next-line quotes
		ball.graphics.beginStroke('#000000');
		ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
		ball.graphics.setStrokeStyle(1, 'round', 'round');
		ball.graphics.beginStroke('#000000');
		ball.graphics.moveTo(0, 0);
		ball.graphics.lineTo(0, 50);
		ball.graphics.endStroke();
		ball.x = 200;
		ball.y = -50;
		createjs.Tween.get(ball, {loop: -1})
			.to({x: ball.x, y: canvas.height - 55, rotation: -360}, 1500, createjs.Ease.bounceOut)
			.wait(1000)
			.to({x: canvas.width - 55, rotation: 360}, 2500, createjs.Ease.bounceOut)
			.wait(1000)
			.to({scaleX: 2, scaleY: 2}, 2500, createjs.Ease.quadOut)
			.wait(1000)
		stage.addChild(ball);
        createjs.Ticker.addEventListener("tick", stage);
        

        function render() {
            requestAnimationFrame(render);
            capturer.capture( canvas );

            ++frameNum;
            if (frameNum < numFrames) {
            progressNode.nodeValue = "rendered frame# " + frameNum + " of " + numFrames;
            } else if (frameNum === numFrames) {
            capturer.stop();
            capturer.save(showVideoLink);
            }
        }

        render();
}