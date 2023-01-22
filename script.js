//Delete events from the side panel
//Fix bugs while adding deleteEvent
//Multiple events
//Reset Header 2 --> Show the right date

const date = new Date();
let selected_date = null;

const renderCalendar = () => {
    date.setDate(1); 

//Calender
const monthDays = document.querySelector(".days");
const lastDay = new Date(date.getFullYear(), date.getMonth()+ 1,0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+ 1,0).getDay();
var nextDays = 7 - lastDayIndex - 1;

//Pop-Up
const openModel = document.querySelector('.days'); //dot to select all the days
const modalcontainer = document.getElementById('modalcontainer');
const eventTitleInput = document.getElementById('eventTitleInput');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

//Side-panel
const sidepanelcontainer = document.getElementById('sidepanelcontainer');
const eventText = document.getElementById('eventText');
const closeButton = document.getElementById('closeButton');
var clickCount = 0;

//Single & Double click
openModel.addEventListener('click', function(event){
    clickCount++;
    selected_date = event.target;
    if(clickCount == 1){
        singleClickTimer = setTimeout(()=> {
        clickCount = 0;
        modalcontainer.classList.add('show');
    }, 160);
    }else if(clickCount == 2 && clickCount != 1){
        clearTimeout(singleClickTimer);
        clickCount = 0;
        sidepanelcontainer.classList.add('show');
    }
});
//2D array
let calendarEvents = new Array(12);
for (let i = 0; i < calendarEvents.length; i++){
    calendarEvents[i] = new Array(31);
}

function saveEvent(){
    // const addEvent = (calendarEvents) => {
    // let calendarEvent = {
    //         title : eventTitleInput.value
    //    } 
    //    addEvent.push(calendarEvents);
    //    localStorage.setItem('eventList', JSON.stringify(calendarEvents));
    // }
    let month = date.getMonth();
    let day = parseInt(selected_date.innerText);
    let calenderEvent = {title: eventTitleInput.value};
   
    if(calenderEvent){
        eventText.innerText = calenderEvent.title;
    }else{
        eventText.innerText;
    }

    calendarEvents[month][day - 1] = calenderEvent;
    localStorage.setItem('events', JSON.stringify(calendarEvents));
}

document.addEventListener('DOMContentLoaded', () => {
    saveButton.addEventListener('click', saveEvent);
});

//Cancel
cancelButton.addEventListener('click', ()=> {
    modalcontainer.classList.remove('show');
});

//Close
closeButton.addEventListener('click', () => {
    sidepanelcontainer.classList.remove('show');
});


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

document.querySelector(".date h1").innerHTML = months[date.getMonth()];

document.querySelector(".date p").innerHTML = date.toDateString();

let days = ""; 
var addeddays = 0;

for(let x = firstDayIndex; x > 0; x--, addeddays++) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
}

for(let i = 1; i <= lastDay; i++, addeddays++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
    days += `<div class = "today">${i}</div>`;
    }else{
        days += `<div>${i}</div>`;
    }
}

if(addeddays <= 35)
nextDays += 7;

for(let j = 1; j <= nextDays; j++)
    days += `<div class="next-date">${j}</div>`

monthDays.innerHTML = days;
}

document.querySelector(".prev").addEventListener('click', () =>{
    date.setMonth(date.getMonth() - 1);
    renderCalendar();

});

document.querySelector(".next").addEventListener('click', () =>{
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});
renderCalendar();
