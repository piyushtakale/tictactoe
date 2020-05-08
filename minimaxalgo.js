var board=new Array(3);
for(var i=0;i<board.length;i++){
  board[i]=new Array(3);
}
v=1;
var wincondition=[
  [[0,0],[0,1],[0,2]],
  [[1,0],[1,1],[1,2]],
  [[2,0],[2,1],[2,2]],
  [[0,0],[1,0],[2,0]],
  [[0,1],[1,1],[2,1]],
  [[0,2],[1,2],[2,2]],
  [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]]
];
var player1='X';
var player2='O';
winner=0;

function mark(source){
  if(v<=5){
    if(source.innerHTML==''){
      source.innerHTML='X';
      grab1();
      console.log(checkwin());
      winner=checkwin();
      if(v<5){
        nextTurn();
        console.log(checkwin());
        winner=checkwin();
      }
    }
    v++;
  }
}



function grab1(){
  board[0][0]=document.getElementById("00").innerHTML;
  board[0][1]=document.getElementById("01").innerHTML;
  board[0][2]=document.getElementById("02").innerHTML;
  board[1][0]=document.getElementById("10").innerHTML;
  board[1][1]=document.getElementById("11").innerHTML;
  board[1][2]=document.getElementById("12").innerHTML;
  board[2][0]=document.getElementById("20").innerHTML;
  board[2][1]=document.getElementById("21").innerHTML;
  board[2][2]=document.getElementById("22").innerHTML;
}

function grab2(){
  document.getElementById("00").innerHTML=board[0][0];
  document.getElementById("01").innerHTML=board[0][1];
  document.getElementById("02").innerHTML=board[0][2];
  document.getElementById("10").innerHTML=board[1][0];
  document.getElementById("11").innerHTML=board[1][1];
  document.getElementById("12").innerHTML=board[1][2];
  document.getElementById("20").innerHTML=board[2][0];
  document.getElementById("21").innerHTML=board[2][1];
  document.getElementById("22").innerHTML=board[2][2];
}


function checkwin(){
  var winner=null;

  for(var k=0;k<wincondition.length;k++){
      if(board[wincondition[k][0][0]][wincondition[k][0][1]] == board[wincondition[k][1][0]][wincondition[k][1][1]] && board[wincondition[k][0][0]][wincondition[k][0][1]] == board[wincondition[k][2][0]][wincondition[k][2][1]] &&  board[wincondition[k][0][0]][wincondition[k][0][1]] != ''){
        winner= board[wincondition[k][0][0]][wincondition[k][0][1]];
      }
  }
  var openSpots = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }
  if(openSpots==0 && winner==null){
    return 'tie';
  }
  else {
    return winner;
  }

}


function nextTurn(){
  var bestScore=-Infinity;
  var move;
  grab1();
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(board[i][j]==''){
        board[i][j]='O';

        var score=minimax(board,0,false);
        console.log(i,j+":"+score);
        board[i][j]='';
        if(score>bestScore){
          bestScore=score;
          move={i,j};
        }
      }
    }
  }

  board[move.i][move.j]='O';
  grab2();
  /*for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      console.log(board[i][j]+"\t");
    }
  }
  while(true){
    var i=Math.floor(Math.random() * 3);
    var j=Math.floor(Math.random() * 3);
    var k=i.toString()+""+j.toString();
    var f=document.getElementById(k);
    if(f.innerHTML==''){
      document.getElementById(k).innerHTML='O';
      break;
    }
  }

  grab1();
  checkwin();
  console.log(available);*/
}


function minimax(board,depth,isMaximizing){
  var scores={
    X:-10,
    O:10,
    tie:0
  }
  var result=checkwin();
  if(result!=null){
    return scores[result];
  }
  if(isMaximizing){
    var bestScore=-Infinity;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]='O';


          var score=minimax(board,depth+1,false);
          board[i][j]='';
          bestScore=Math.max(bestScore,score);
          //console.log("max"+i,j+":"+bestScore);
        }
      }
    }
    return bestScore;
  }
  else{
    var bestScore=Infinity;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(board[i][j]==''){
          board[i][j]='X';


          var score=minimax(board, depth+1, true);
          board[i][j]='';
          bestScore=Math.min(bestScore, score);
          //console.log("min"+i,j+":"+bestScore);
        }
      }
    }
    return bestScore;
  }
}
