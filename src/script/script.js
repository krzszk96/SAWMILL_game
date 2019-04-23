//git subtree split --branch gh-pages --prefix src/
//git push -u origin gh-pages
// create eventlistener that will catch every click on the web page, and save obj stats.
//then find a way that update ojbect after every click

var chopbar = 0;

var Stats = {
  logs: 0,
  boards: 0,
  money: 0,
  chainsaw: 0,
  log_worker: 0,
  cut_worker: 0,
  executed_log_worker: false,
  executed_cut_worker: false,
  warehouse_space: 100,
  harvesters: 0,
  sawmill_level: 0,
  sawmill_mult: 5000
}

function chopTree(){
  if(Stats.warehouse_space>Stats.logs){
    if(Stats.harvesters>0){
      Stats.logs = Stats.logs + 10*Stats.harvesters;
    }else if (Stats.chainsaw==1) {
      Stats.logs = Stats.logs + 2;
    }else {
      Stats.logs++;
    }
  }
  document.getElementById('logs').innerHTML = 'Logs: ' + Stats.logs;
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
    if(Stats.warehouse_space>Stats.logs){
      var temp = Stats.logs + Stats.log_worker;
      if(temp>Stats.warehouse_space){
        Stats.logs = Stats.logs + Stats.warehouse_space - Stats.logs;
      }else {
        Stats.logs = Stats.logs + Stats.log_worker;
      }

    }
    document.getElementById('logs').innerHTML = 'Logs: ' + Stats.logs;
  }, 5000);
}

function cutWorkerCalc(){
    window.setInterval( function(){
      if(Stats.logs<Stats.cut_worker){
        Stats.boards = Stats.boards + Stats.logs * 4;
        Stats.logs = 0;
      }else{
        if(Stats.sawmill_level>0){
          Stats.logs = Stats.logs - Stats.cut_worker;
          Stats.boards = Stats.boards + Stats.cut_worker * 4 * Stats.sawmill_level+1;
        }else{
          Stats.logs = Stats.logs - Stats.cut_worker;
          Stats.boards = Stats.boards + Stats.cut_worker * 4;
         }
      }
      document.getElementById('boards').innerHTML = 'Boards: ' + Stats.boards;
      document.getElementById('logs').innerHTML = 'Logs: ' + Stats.logs;

  }, 5000);
}

function cutBoards(){

  if(Stats.logs>0){
    Stats.logs--;
    Stats.boards = Stats.boards + 4;
  }
  document.getElementById('boards').innerHTML = 'Boards: ' + Stats.boards;
  document.getElementById('logs').innerHTML = 'Logs: ' + Stats.logs;
}

function sellBoards(){
  if(Stats.boards>0){
    Stats.money = Stats.money + Stats.boards * 4;
    Stats.boards = 0;
    document.getElementById('boards').innerHTML = 'Boards: ' + Stats.boards;
    document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  }
}

document.getElementById("menu1").addEventListener("click", function(){

  if(event.target.id=='chainsaw'){
    if(Stats.money>=200){
      Stats.money = Stats.money - 200;
      Stats.chainsaw = 1;
      document.getElementById("chainsaw").style.display = "none";
      document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
    }
  }
  if(event.target.id=='log_worker'){
    if(Stats.money>=1000){
      Stats.money = Stats.money - 1000;
      Stats.log_worker++;
        if (!Stats.executed_log_worker) {
          Stats.executed_log_worker = true;
          logWorkerCalc();
        }
    }
    document.getElementById('disp_log_workers').innerHTML = 'Number of log workers: ' + Stats.log_worker;
    document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  }
  if(event.target.id=='cut_worker'){
    if(Stats.money>=1500){
      Stats.money = Stats.money - 1500;
      Stats.cut_worker++;
        if (!Stats.executed_cut_worker) {
          Stats.executed_cut_worker = true;
          cutWorkerCalc();
        }
    }
    document.getElementById('disp_cut_workers').innerHTML = 'Number of cut workers: ' + Stats.cut_worker;
    document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  }
  if(event.target.id=='buy_warehouse_space'){
    if(Stats.money>=10000){
      Stats.money = Stats.money - 10000;
      Stats.warehouse_space = Stats.warehouse_space + 100;
    }
    document.getElementById('warehouse_space').innerHTML = 'Warehouse space: ' + Stats.warehouse_space;
    document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  }
  if(event.target.id=='buy_harvester'){
    if(Stats.money>=100000){
      Stats.money = Stats.money - 100000;
      Stats.harvesters++;
    }
    document.getElementById('disp_harvesters').innerHTML = 'Number of harvesters: ' + Stats.harvesters;
    document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  }
  if(event.target.id=='sawmill'){
    if(Stats.money>=1000000){
      Stats.money = Stats.money - 1000000;
      Stats.sawmill_level++;
      document.getElementById("sawmill").style.display = "none";
      document.getElementById("cut").style.display = "none";
      document.getElementById("sell").className = "sellwhenmill";
      document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
      document.getElementById('sawmill_info').innerHTML = 'Sawmill level: ' + Stats.sawmill_level;
    }
  }
});
