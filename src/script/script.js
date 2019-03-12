function passDate(){
  var importdate = document.getElementById("putdate").value;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {dd = '0'+dd}
  if(mm<10) {mm = '0'+mm}

  today = yyyy + '-' + mm + '-' + dd;

  var startDate = Date.parse(importdate);
  var endDate = Date.parse(today);
  var timeDiff = endDate - startDate;
  daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  document.getElementById("daysto").innerHTML = daysDiff;
}
