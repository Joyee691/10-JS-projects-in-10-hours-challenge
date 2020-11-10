const daysElement=document.getElementById("days");
const hoursElement=document.getElementById("hours");
const minsElement=document.getElementById("mins");
const secondsElement=document.getElementById("seconds");



const nextChristmas='25 Dec 2020';

function countdown(){
    const christmasDate=new Date(nextChristmas);
    const curDate=new Date();

    const totalSeconds=(christmasDate - curDate)/1000;

    const days=Math.floor(totalSeconds/3600/24);
    const hours=Math.floor(totalSeconds/3600)%24;
    const mins=Math.floor(totalSeconds/60)%60;
    const seconds=Math.floor(totalSeconds)%60;

    daysElement.innerText=days;
    hoursElement.innerText=hours;
    minsElement.innerText=formateTime(mins);
    secondsElement.innerText=formateTime(seconds);
}

function formateTime(time){
    return time<10?'0'+time:time;
}

//call the funtion every second
setInterval(countdown,1000);


