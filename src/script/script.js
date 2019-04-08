var logs = 0;
var boards = 0;
var money = 5550;
var chainsaw = 0;
var log_worker = 0;
var cut_worker = 0;
var executed_log_worker = false;
var executed_cut_worker = false;
var chopbar = 0;

function chopTree(){
  if(chainsaw==0){
    logs++;
  }else{
    logs = logs + 2;
  }
  document.getElementById('logs').innerHTML = 'Logs: ' + logs;
}

function chopBar(){
  switch(chopbar) {
    case 0:
      document.getElementById("chopbar").style.width = "30px";
      chopbar++;
    break;

    case 1:
      document.getElementById("chopbar").style.width = "60px";
      chopbar++;
    break;

    case 2:
      document.getElementById("chopbar").style.width = "90px";
      chopbar = 0;
      chopTree();
    break;
  }
}

function log_worker_calc(){
    window.setInterval( function(){
    logs = logs + log_worker;
    document.getElementById('logs').innerHTML = 'Logs: ' + logs;
  }, 5000);
}

function cut_worker_calc(){
    window.setInterval( function(){
    if(logs>0){
      boards = boards + cut_worker * 4;
      logs--;
      document.getElementById('boards').innerHTML = 'Boards: ' + boards;
      document.getElementById('logs').innerHTML = 'Logs: ' + logs;
    }
  }, 5000);
}

function cutBoards(){
  if(logs>0){
    logs--;
    boards=boards+4;
    document.getElementById('boards').innerHTML = 'Boards: ' + boards;
    document.getElementById('logs').innerHTML = 'Logs: ' + logs;
  }
}

function sellBoards(){
  if(boards>0){
    money = money + boards * 4;
    boards = 0;
    document.getElementById('boards').innerHTML = 'Boards: ' + boards;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
}



document.getElementById("menu").addEventListener("click", function(){

  if(event.target.id=='chainsaw'){
    if(money>=200){
      money = money - 200;
      chainsaw = 1;
      document.getElementById("chainsaw").style.display = "none";
      document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
    }
  }
  if(event.target.id=='log_worker'){
    if(money>=1000){
      money = money - 1000;
      log_worker++;
        if (!executed_log_worker) {
          executed_log_worker = true;
          log_worker_calc();
        }
    }
    document.getElementById('disp_log_workers').innerHTML = 'Number of log workers: ' + log_worker;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
  if(event.target.id=='cut_worker'){
    if(money>=1500){
      money = money - 1500;
      cut_worker++;
        if (!executed_cut_worker) {
          executed_cut_worker = true;
          cut_worker_calc();
        }
    }
    document.getElementById('disp_cut_workers').innerHTML = 'Number of cut workers: ' + cut_worker;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
});
