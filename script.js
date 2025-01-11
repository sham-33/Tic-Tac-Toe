let boxes = $(".box");
let started = false;
let turn = "X";
let count = 0;

const winPatterns = [ 
  [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]  
];

$(".box").each(function() {
  $(this).on("click", function() {
    if(turn === "O"){
      $(this).text("O");
      $("#sub-title").text("Player X turn "); 
      playSound("player1");
      turn = "X";
    }
    else {
      $(this).text("X");
      $("#sub-title").text("Player O turn "); 
      playSound("player2");
      turn = "O";
    }
    count++;
    $(this).prop("disabled", true);
    $(this).css("background-color", "#fbfbe3");
    checkWinner();
  });
});


function checkWinner(){
  for(let pattern of winPatterns){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 != "" && pos2 != "" && pos3 != ""){
      if(pos1 === pos2 && pos2 === pos3){
        pattern.forEach(index => {
          boxes[index].style.backgroundColor = "lightgreen";
        });
        $("#sub-title").text("Congragulations!   Winner is : " + pos1); 
        playSound("congrags");
        $(".box").each(function() {
          $(this).prop("disabled", true); 
        });
        return;
      }
    }

    if(count === 9){
      $("#sub-title").text("Oops!  Game draws"); 
      playSound("draw");
    }
  }
}


function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

$(".reset").on("click", function() {
  reset();
});

function reset(){
  $(".box").each(function() {
    $(this).text(" "); 
    $(this).prop("disabled", false); 
    $(this).css("background-color", "#fafacc");
  });
  playSound("restart");
  turn = "X";
  $("#sub-title").text("Player X turn "); 
  count = 0;
}


