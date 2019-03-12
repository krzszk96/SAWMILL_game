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

function passDate(){
  var importdate = document.getElementById("putdate").value;

  var startDate = Date.parse(importdate);
  var endDate = Date.parse(today());
  var timeDiff = endDate - startDate;
  daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

function createEvent(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById("putdate").value + " days since: " + passDate();
  div.setAttribute('class', 'myclass'); // and make sure myclass has some styles in css
  document.getElementById("container").appendChild(div);
}
function btn(){
  passDate()
  createEvent()
}
