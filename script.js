
/*
```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```
*/

// Set time at the top of website
$("#currentDay").append(moment().format('dddd') + " " + moment().format('ll'));


$(document).ready(function () {

    var currentTime = moment().format('HH');
    var allTime = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    var allTextArea = $(".description");
    var allTask = ["", "", "", "", "", "", "", "", ""];
    

    $(function (){

        $(".description").each(function(index){
            if (currentTime < allTime[index]){
                $(this).addClass("future")
            } else if (currentTime > allTime[index]){
                $(this).addClass("past")
            } else { $(this).addClass("present")}
        });
    }) // end of onLoad function 
    

    function checkSchedule(){

        var storedSchedule = JSON.parse(localStorage.getItem("schedule"));

        if (storedSchedule !== null) {
          allTask = storedSchedule;                             // update array
        }
        
        display();
    }
    

    function display(){
        $("textarea").each(function(index){
            $(this).append(allTask[index]);
        })
    }


    $(".saveBtn").click(function(){
    
        var index = this.value;                                  // get indexOfTextArea
        allTextArea[index] = allTextArea[index].value.trim();

        allTask[index] = allTextArea[index];    
        // SAVE DATA to local storage
        localStorage.setItem("schedule", JSON.stringify(allTask));
    });


    checkSchedule();

    }); // end of documentReady