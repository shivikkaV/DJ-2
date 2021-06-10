song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload(){
    song1 = loadSound("Into_the_unknown.mp3");
    song2 = loadSound("CupSong.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score rightWrist = " + scoreRightWrist + "score leftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY  = " + rightWristY);
  }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
      if( leftWristY > 0 && leftWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song1.rate(0.5);
        song2.rate(0.5);
      }
      if( leftWristY > 100 &&  leftWristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song1.rate(1);
        song2.rate(1);
      }
      if( leftWristY > 200 &&  leftWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song1.rate(1.5);
        song2.rate(1.5);
      }
      if( leftWristY > 300 &&  leftWristY <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song1.rate(2);
        song2.rate(2);
      }
      if( leftWristY > 400 &&  leftWristY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song1.rate(2.5);
        song2.rate(2.5);
      }
    }
    if(scoreRightWrist > 0.2)
    circle( leftWristX,  leftWristY, 20);
    InNumberleftWristX = Number( leftWristX);
    remove_decimals = floor(InNumberleftWristX);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song1.setVolume(volume);
    song2.setVolume(volume)
}

function play(){
  if(song1.play()){
    song1.setVolume(1);
    song1.rate(1);
  }else{
    song2.setVolume(1);
    song2.rate(1);
  }
}

function switch_song(){
  if(song1.play()){
    song2.stop();
    song1.play();
  }else{
    song1.stop();
    song2.play();
  }
}

