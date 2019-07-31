
$(document).ready(function(){

moment().format();
function showTime(data){
var date = new Date();
var h = date.getHours();
var m =date.getMinutes();
var s = date.getSeconds();
var session = "AM";

    if(h == 0){
        h = 12;
    }
    if(h>12){
        h=h-12
        session = "PM"
    }
    if(h < 10){
        h = "0" + h
    }
    if(m<10){
        m ="0" + m
    }
    if(s<10){
        s="0" + s
    }
    
var time = h + ':' + m + ':' + s;
    var time2 = time + session;
    
    
    document.getElementById('myClock').innerHTML = time2;
    document.getElementById('myClock').textContent = time2;
    document.getElementById('myClock').setAttribute('value', time2)
    //console.log(time2)

    var alarmTime = document.getElementById('myClock').value
    console.log("VALUE",alarmTime)
    if (time2 == alarmTime){
        $('body').append("hello")
    }
    
    
setTimeout(showTime, 1000)
}

showTime()



var date = new Date();
var h = date.getHours();
var m =date.getMinutes();
var s = date.getSeconds();
var time5 = h + ':' + m + ':' + s;
console.log("times outside the function",time5)

var timeArray = []

$('.addAlarm').on('click', function(){
   var inputVal = document.getElementById('inputAlarm').value
   $.ajax({
       type: "POST",
       url: "/alarms",
       data:{
           alarmTime: inputVal,
       },
       succes: function(data){
           console.log("DATA",data)
       }
       
   })
   $('#alarmList').append("<p id='alarmP' value"+inputVal+">"+"<button class='deleteBtn'>x</button>"+"</p>")
   
  
//    localStorage.setItem('alarm',JSON.stringify(inputVal));
//    console.log(inputVal)
//    timeArray.push(inputVal)
//    console.log(timeArray)
//    console.log(inputVal)
//    console.log(time5)
//    $('#alarmList').append(localStorage.getItem("alarm"))
//    document.getElementById('alarmList').append="<li>"+inputVal + "</li>"

});
function displayAlarms(){
    $.ajax({
        url:"/alarms",
        type:"GET"
     }) 
        .then(function(response){
         for (i = 0; i < response.length; i++) { 
             console.log("Responses", response[i])
             console.log()
            //  var alarmItem = $("<p>")
             $("#alarmList").append(/*"<h3 id="+response[i]._id+">" + response[i].alarmTime + "</h3>" +*/"<p id='alarmP' value="+response[i].alarmTime+">"+ "<button id="+response[i]._id+" class='deleteBtn' value="+response[i].alarmTime+">x</button>"+ response[i].alarmTime+"</p>")
            
             console.log("VALUE2",$('#alarmP').val())
            }
            console.log("Resp", response)
        })
}
displayAlarms()

// function matchTime(){
    
// $.ajax({
//     url:"/alarms",
//     type:"GET"
//  }) 
//     .then(function(response){
//      for (i = 0; i < response.length; i++) { 
//          console.log("Responses Match Time", response[i].alarmTime)
//          let time6 = response[i].alarmTime
//          if(time6 === time5){
//              alert('Match')
//          }
//          console.log()
        
//         }
        
//     })
// }
// matchTime()

$('#alarmList').on('click', "button", function(){
    console.log('IM WORKING')
    let alarmToDelete = $(this).attr('id')
    console.log("Alarm to delete",alarmToDelete)
    $.ajax({
        type: "GET",
        url: '/delete/' + alarmToDelete,
        succes:function(response){
            console.log('REMOVED');
            console.log(response)
        }
        
    })
    

})




})

