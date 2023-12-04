var music = "";
var rightWristX = 0;
var rightWristY = 0;

var leftWristX = 0;
var leftWristY = 0;

var score_right_wrist = 0;
var score_left_wrist = 0;

function preload()
{
   music = loadSound("music.mp3");
  
}

function setup()
{
   canvas = createCanvas(600, 500);
   video = createCapture(VIDEO);
   video.hide()

   poseNet = ml5.poseNet(video, modelLoaded)
}

function modelLoaded()
{
  console.log("poseNet iniciado");
  window.alert("poseNet iniciado");
  poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
  if(results.length>0)
  {
    console.log(results);
    score_right_wrist = results[0].pose.keypoints[10].score;
    score_left_wrist = results[0].pose.keypoints[9].score;
    console.log("score_right_wrist = " +  score_right_wrist + "score_left_wrist = " + score_left_wrist)
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("pulso direito X = " + rightWristX + "pulso direito Y" + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("pulso esquerdo X = " + leftWristX + "pulso esquerdo Y" + leftWristY);


  }


}

function draw()
{
  image(video, 0, 0, 600, 500);
  fill("black");
  stroke("darkblue");
  if(score_left_wrist>0.2)
  {
    circle(rightWristX, rightWristY, 30);
    inNumber_leftWrist = Number(leftWristY);
    remove_decimais = floor(inNumber_leftWrist);
    volume= remove_decimais/500;
    document.getElementById("volume").innerHTML = "volume=" + volume;
    music.setVolume(volume);
  }
  if(score_right_wrist>0.2)
  {
    circle(leftWristX, leftWristY, 30);
    inNumber_righttWrist = Number(rightWristY);
    remove_decimais = floor(inNumber_rightWrist);
    volume= remove_decimais/500;
    document.getElementById("volume").innerHTML = "volume=" + volume;
    music.setVolume(volume);
  }
}

function play()
{
    music.play();
    music.setVolume(1.0);
    music.rate(2.5);
}

function stop()
{
  music.pause()
}
    

