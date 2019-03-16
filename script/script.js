let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function clickedDay() {
  var day = event.target.innerHTML;
  var month = currentMonth + 1;
  if(day<10) {day = '0'+ day}
  if(month<10) {month = '0'+ month}
  var dayDate = currentYear + '-' + month + '-' + day;
  console.log(dayDate);
  //return dayDate;
}

//dunction to get current date
function todayDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {dd = '0'+dd}
  if(mm<10) {mm = '0'+mm}

  today = yyyy + '-' + mm + '-' + dd;

  console.log(today);
  //return today;
}
// //function return days diff between dates
// function daysDifference(){
//   var startDate = Date.parse(clickedDay());
//   var endDate = Date.parse(todayDate());
//   var timeDiff = endDate - startDate;
//   daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   console.log(daysDiff);
//   //return daysDiff;
// }

// var task = [
//     'trash',
//     'grocery',
//     'run',
//     'learn',
// ];



document.getElementById("calendar-body").addEventListener("click", function(){
  clickedDay();
  todayDate();

});
// //create new element in the event div
// function createTodoList(){
//   var tododiv = document.createElement('div');
//   tododiv.innerHTML = "test task";
//   tododiv.setAttribute('class', 'task');
//   document.getElementById("event").appendChild(tododiv);
// }
// //create new task with button on the list
// // function taskCreate(){
// //   //create warp for task
// //   var taskwrap = document.createElement("div");
// //   taskwrap.setAttribute('class', 'list_wrap');
// //   taskwrap.setAttribute('id', 'listwrap_id');
// //   document.getElementById("event").appendChild(taskwrap);
// //
// //   //create checkbox in task
// //   var check = document.createElement("INPUT");
// //   check.setAttribute("type", "checkbox");
// //   document.getElementById("listwrap_id").appendChild(check);
// //
// //   //create task text element
// //   var task = document.createElement('div');
// //   var gettask= document.getElementById("inpt_id").value;
// //   task.setAttribute('class', 'task_element');
// //   task.setAttribute('id', 'task_id');
// //   task.innerHTML = gettask;
// //   document.getElementById("listwrap_id").appendChild(task);
// // }
// //create new intput form in the event div
// function inputCreate() {
//   var taskwrap = document.createElement("div");
//   taskwrap.setAttribute('class', 'task_wrap');
//   taskwrap.setAttribute('id', 'taskwrap_id');
//   document.getElementById("event").appendChild(taskwrap);
//
//   var inpt = document.createElement("INPUT");
//   inpt.setAttribute('class', 'inpt_element');
//   inpt.setAttribute('id', 'inpt_id');
//   inpt.setAttribute("type", "text");
//   inpt.setAttribute("value", "Type your todo task here!");
//   document.getElementById("taskwrap_id").appendChild(inpt);
//
//   //creating btn to add new task
//   var btn = document.createElement("BUTTON");
//   var btntxt = document.createTextNode("ADD");
//   btn.setAttribute('class', 'task_btn');
//   btn.appendChild(btntxt);
//   document.getElementById("taskwrap_id").appendChild(btn);
//   btn.setAttribute('onclick','taskCreate();' + onclick);//btn onclick create new task todo
//
// }
// //function creating elements in container
// function createEvent(){
//   var div = document.createElement('div');
//   div.innerHTML = document.getElementById("putdate").value + " days since: " + passDate();
//   div.setAttribute('class', 'event_element');
//   div.setAttribute('id', 'event');
//   div.setAttribute('onclick','inputCreate();' + onclick);
//     //remove atribute after clicling once
//     document.getElementById("container").addEventListener('click', checkIfcliked);
//     function checkIfcliked(){
//       div.removeAttribute("onclick");
//     }
//
//   document.getElementById("container").appendChild(div);
// }
//
// //calling functions on btn
// function btn(){
//   passDate()
//   createEvent()
//   //document.getElementById("container").addEventListener("click", checkfunction);
// }
