//git subtree split --branch gh-pages --prefix src/
//git push -u origin gh-pages

var chopbar = 0;
var boardPrice = 1;
var logPrice = 0.2;



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

function saveStats(){
  var str = JSON.stringify(Stats);
  localStorage.setItem("sstats", str);
}

function getStats(){
  var str = localStorage.getItem("sstats");
  Stats = JSON.parse(str);
  if(!Stats){
    Stats = {
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
  }
}


function showStats(){
  document.getElementById('logs').innerHTML = 'Logs: ' + Stats.logs;
  document.getElementById('boards').innerHTML = 'Boards: ' + Stats.boards;
  document.getElementById('money').innerHTML = 'Money: ' + Stats.money + ' $';
  document.getElementById('disp_log_workers').innerHTML = 'Number of log workers: ' + Stats.log_worker;
  document.getElementById('disp_cut_workers').innerHTML = 'Number of cut workers: ' + Stats.cut_worker;
  document.getElementById('warehouse_space').innerHTML = 'Warehouse space: ' + Stats.warehouse_space;
  document.getElementById('disp_harvesters').innerHTML = 'Number of harvesters: ' + Stats.harvesters;
  document.getElementById('sawmill_info').innerHTML = 'Sawmill level: ' + Stats.sawmill_level;
}

function setActive(){
    document.getElementById("nav").addEventListener("click", function(){
      //active.classList.remove("active");
      var current = document.getElementById(event.target.id);
      active = current;
      console.log(active);
      console.log(current);
      current.classList.add("active");
    });
}

getStats();
showStats();
boardPriceCalc();
logPriceCalc();



function pageRoload(){
  if(event.target.id=='market'){
      document.getElementById('action_stuff').style.display = "none";
      document.getElementById('container_market').style.display = "inline";
      showStats();
  }
  if(event.target.id=='overwiew'){
    document.getElementById('action_stuff').style.display = "inline";
    document.getElementById('container_market').style.display = "none";
  }
}


function chopTree(){
  if(Stats.warehouse_space>Stats.logs){

    if(Stats.harvesters>0){
      Stats.logs = Stats.logs + 10*Stats.harvesters;
      if(Stats.logs>Stats.warehouse_space){Stats.logs=Stats.warehouse_space}

    }else if (Stats.chainsaw==1) {
      Stats.logs = Stats.logs + 2;
      if(Stats.logs>Stats.warehouse_space){Stats.logs=Stats.warehouse_space}

    }else {
      Stats.logs++;
    }
  }
  showStats();
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
      saveStats();
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
    showStats();
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
      showStats();
  }, 5000);
}

function cutBoards(){

  if(Stats.logs>0){
    Stats.logs--;
    Stats.boards = Stats.boards + 4;
  }
  showStats();
  saveStats();
}

function boardPriceCalc(){

  window.setInterval( function(){
    boardPrice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('board_price').innerHTML = 'Board market price: ' + boardPrice +" $";
  }, 5000);
}

function logPriceCalc(){

  window.setInterval( function(){
    logPrice = ((Math.random() * 2)+0.1).toFixed(1);
    document.getElementById('log_price').innerHTML = 'Log market price: ' + logPrice +" $";
  }, 5000);
}


function sellBoards(){
  if(Stats.boards>0){
    Stats.money = Stats.money + Stats.boards * boardPrice;
    Stats.boards = 0;
    showStats();
  }
  saveStats();
}

function sellLogs(){
  if(Stats.logs>0){
    Stats.money = Stats.money + Stats.logs * logPrice;
    Stats.logs = 0;
    showStats();
  }
  saveStats();
}

function upgradeSawmill(){
  if((Stats.money>=1000000)&&(Stats.sawmill_level>0)){
    Stats.money = Stats.money - 1000000;
    Stats.sawmill_level++;
  }
  showStats();
  saveStats();
}

document.getElementById("menu1").addEventListener("click", function(){

  if(event.target.id=='chainsaw'){
    if(Stats.money>=200){
      Stats.money = Stats.money - 200;
      Stats.chainsaw = 1;
      document.getElementById("chainsaw").style.display = "none";
      showStats();
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
    showStats();
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
    showStats();
  }
  if(event.target.id=='buy_warehouse_space'){
    if(Stats.money>=10000){
      Stats.money = Stats.money - 10000;
      Stats.warehouse_space = Stats.warehouse_space + 100;
    }
    showStats();
  }
  if(event.target.id=='buy_harvester'){
    if(Stats.money>=100000){
      Stats.money = Stats.money - 100000;
      Stats.harvesters++;
    }
    showStats();
  }
  if(event.target.id=='sawmill'){
    if(Stats.money>=1000000){
      Stats.money = Stats.money - 1000000;
      Stats.sawmill_level++;
      document.getElementById("sawmill").style.display = "none";
      document.getElementById("cut").style.display = "none";
      document.getElementById("sell").className = "sellwhenmill";
      showStats();
    }
  }
});
