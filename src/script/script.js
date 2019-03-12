//dunction to get current date
function today(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {dd = '0'+dd}
  if(mm<10) {mm = '0'+mm}

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
//function reading date from first input
function passDate(){
  var importdate = document.getElementById("putdate").value;

  var startDate = Date.parse(importdate);
  var endDate = Date.parse(today());
  var timeDiff = endDate - startDate;
  daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}
//create new element in the event div
function createTodoList(){
  var tododiv = document.createElement('div');
  tododiv.innerHTML = "test task";
  tododiv.setAttribute('class', 'task');
  document.getElementById("event").appendChild(tododiv);
}
//create new task with button on the list
// function taskCreate(){
//   //create warp for task
//   var taskwrap = document.createElement("div");
//   taskwrap.setAttribute('class', 'list_wrap');
//   taskwrap.setAttribute('id', 'listwrap_id');
//   document.getElementById("event").appendChild(taskwrap);
//
//   //create checkbox in task
//   var check = document.createElement("INPUT");
//   check.setAttribute("type", "checkbox");
//   document.getElementById("listwrap_id").appendChild(check);
//
//   //create task text element
//   var task = document.createElement('div');
//   var gettask= document.getElementById("inpt_id").value;
//   task.setAttribute('class', 'task_element');
//   task.setAttribute('id', 'task_id');
//   task.innerHTML = gettask;
//   document.getElementById("listwrap_id").appendChild(task);
// }
//create new intput form in the event div
function inputCreate() {
  var taskwrap = document.createElement("div");
  taskwrap.setAttribute('class', 'task_wrap');
  taskwrap.setAttribute('id', 'taskwrap_id');
  document.getElementById("event").appendChild(taskwrap);

  var inpt = document.createElement("INPUT");
  inpt.setAttribute('class', 'inpt_element');
  inpt.setAttribute('id', 'inpt_id');
  inpt.setAttribute("type", "text");
  inpt.setAttribute("value", "Type your todo task here!");
  document.getElementById("taskwrap_id").appendChild(inpt);

  //creating btn to add new task
  var btn = document.createElement("BUTTON");
  var btntxt = document.createTextNode("ADD");
  btn.setAttribute('class', 'task_btn');
  btn.appendChild(btntxt);
  document.getElementById("taskwrap_id").appendChild(btn);
  btn.setAttribute('onclick','taskCreate();' + onclick);//btn onclick create new task todo

}
//function creating elements in container
function createEvent(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById("putdate").value + " days since: " + passDate();
  div.setAttribute('class', 'event_element');
  div.setAttribute('id', 'event');
  div.setAttribute('onclick','inputCreate();' + onclick);
    //remove atribute after clicling once
    document.getElementById("container").addEventListener('click', checkIfcliked);
    function checkIfcliked(){
      div.removeAttribute("onclick");
    }

  document.getElementById("container").appendChild(div);
}

//calling functions on btn
function btn(){
  passDate()
  createEvent()
  //document.getElementById("container").addEventListener("click", checkfunction);
}
