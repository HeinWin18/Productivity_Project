//User clicks monthDays --> show a pop up --> User can enter event
//User double clicks monthDays --> show a side panel (With the events)

const date = new Date();

const renderCalendar = () => {
    date.setDate(1); 

const monthDays = document.querySelector(".days");
const lastDay = new Date(date.getFullYear(), date.getMonth()+ 1,0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+ 1,0).getDay();
var nextDays = 7 - lastDayIndex - 1;

const openModel = document.querySelector('.days'); //dot to select all all the days
const modalcontainer = document.getElementById('modalcontainer');
const eventTitleInput = document.getElementById('eventTitleInput');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById("cancelButton");

window.onload=function(){
openModel.addEventListener('click', ()=>{
    modalcontainer.classList.add('show');
});

cancelButton.addEventListener('click', ()=>{
    modalcontainer.classList.remove('show');
});
}

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
