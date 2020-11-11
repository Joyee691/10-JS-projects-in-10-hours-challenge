//init the quiz Data
const quizData=[
    {
        question:'Who won the US election 2020?',
        a:'Donald J. Trump',
        b:'Joe Biden',
        c:'Jo Jorgensen',
        d:'Howie Hawkins',
        ans:'b'
    },{
        question:'What is the biggest island in the world?',
        a:'Capri, Italy',
        b:'Hvar, Croatia',
        c:'Greenland, Denmark',
        d:'Cocos Keeling, Australia',
        ans:'c'
    },{
        question:'Which Country Produces The Most Coffee In The World?',
        a:'Brazil',
        b:'Vietnam',
        c:'Colombia',
        d:'Indonesia',
        ans:'a'
    },{
        question:'What is the brightest star in the sky?',
        a:'Arcturus',
        b:'Vega',
        c:'Rigel',
        d:'Sirius',
        ans:'d'
    },{
        question:'Which contry has the most vending machine per capita?',
        a:'China',
        b:'Japan',
        c:'Canada',
        d:'Gremany',
        ans:'b'
    }
]

const quiz=document.getElementById('quiz');
const questionElement=document.getElementById('question');
const aText=document.getElementById('a_text');
const bText=document.getElementById('b_text');
const cText=document.getElementById('c_text');
const dText=document.getElementById('d_text');
const submitBtn=document.getElementById('submit'); 
let currentQuiz=0;      //the index of current Quiz number
let score=0;            //to record the right answers you made

//first call
loadQuiz();

//To load and show the next quiz
function loadQuiz(){
    const currentQuizData=quizData[currentQuiz];

    questionElement.innerText=currentQuizData.question;
    aText.innerText=currentQuizData.a;
    bText.innerText=currentQuizData.b;
    cText.innerText=currentQuizData.c;
    dText.innerText=currentQuizData.d;

    if(currentQuiz==quizData.length-1){
        submitBtn.innerText='Submit';
    }
}

submitBtn.addEventListener('click',()=>{
    let selected=getSelected();
    
    //console.log(selected,quizData[currentQuiz].ans);
    if(selected===quizData[currentQuiz].ans){
        score++;
    }

    currentQuiz++;
    if(currentQuiz<quizData.length){
        loadQuiz();
    }else{
        alert("Congratulation! You scored at "+score+"/"+quizData.length+"!");
        quiz.innerHTML='<button onclick="location.reload()">Reload</button>'
    }
})

//return the selected radio element; if nothing selected: return undefined
function getSelected(){
    const selectedElements=document.querySelectorAll(".answer");
    let selectedID=undefined;
    
    selectedElements.forEach((element)=>{
        if(element.checked){
            element.checked=false;
            //console.log(element.id);
            selectedID=element.id;
        }
    });
    //console.log(selectedID);
    return selectedID;
}