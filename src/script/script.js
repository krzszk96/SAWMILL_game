var logs = 0;
var boards = 0;
var money = 0;
var chainsaw = 0;
var log_worker = 0;
var cut_worker = 0;
var executed_log_worker = false;
var executed_cut_worker = false;
var chopbar = 0;
var warehouse_space = 100;
var harvesters = 0;

function chopTree(){
  if(warehouse_space>logs){
    if(chainsaw==1){logs = logs + 2;
    }else if (harvesters>0) {
      logs = logs + 10*harvesters;
    }else {
      logs++;
    }
  }
  document.getElementById('logs').innerHTML = 'Logs: ' + logs;
}

function chopBar(){
  switch(chopbar) {
    case 0:
      document.getElementById("chopbar").style.width = "30px";
      document.getElementById("axe_img").style.transform = "rotate(20deg)";
      chopbar++;
    break;

    case 1:
      document.getElementById("chopbar").style.width = "60px";
      document.getElementById("axe_img").style.transform = "rotate(40deg)";
      chopbar++;
    break;

    case 2:
      document.getElementById("chopbar").style.width = "90px";
      document.getElementById("axe_img").style.transform = "rotate(60deg)";
      chopbar = 0;
      chopTree();
    break;
  }
}

function logWorkerCalc(){
    window.setInterval( function(){
    logs = logs + log_worker;
    document.getElementById('logs').innerHTML = 'Logs: ' + logs;
  }, 5000);
}

function cutWorkerCalc(){
    window.setInterval( function(){
    if(logs>0){
      if(logs<cut_worker){
        boards = boards + logs * 4;
        logs = 0;
      }else{
        logs = logs - cut_worker;
        boards = boards + cut_worker * 4;
      }
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
          logWorkerCalc();
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
          cutWorkerCalc();
        }
    }
    document.getElementById('disp_cut_workers').innerHTML = 'Number of cut workers: ' + cut_worker;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
  if(event.target.id=='buy_warehouse_space'){
    if(money>=10000){
      money = money - 10000;
      warehouse_space = warehouse_space + 100;
    }
    document.getElementById('warehouse_space').innerHTML = 'Warehouse space: ' + warehouse_space;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
  if(event.target.id=='buy_harvester'){
    if(money>=100000){
      money = money - 100000;
      harvesters++;
    }
    document.getElementById('disp_harvesters').innerHTML = 'Number of harvesters: ' + harvesters;
    document.getElementById('money').innerHTML = 'Money: ' + money + ' $';
  }
});
