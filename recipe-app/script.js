const mealsElement=document.getElementById("meals");
const favMeals=document.getElementById("favorite-meals");
const searchTerm=document.getElementById("search-term");
const searchBtn=document.getElementById("search");
const mealPopupContainer=document.getElementById("meal-popup-container");
const mealInfo=document.getElementById("meal-info");
const popupCloseBtn=document.getElementById("popup-close");

getRandomMeal();
fetchFavMeals();

//!!!!!a console is in here
//fetch a rendom meal and call addMeal() function
async function getRandomMeal(){
    //get the random meal data from api
    const resp=await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData=await resp.json();
    const randomMeal=respData.meals[0];
    console.log(randomMeal);

    //add random meal to html
    addMeal(randomMeal,true);
}
//return a meal msg from id
async function getMealById(id){
    const resp=await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData=await resp.json();
    const meal=respData.meals[0];
    return meal;
}
//search the meals by term
async function getMealsBySearch(term){
    const resp=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const respData=await resp.json();
    const meals= respData.meals;

    return meals;
}
function addMeal(mealData,random=false){
    const newMeal=document.createElement('div');
    newMeal.classList.add('meal');

    newMeal.innerHTML=`
        <div class="meal-header">
            ${random?`<span class="random">Random Recipe</span>`:''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h3>${mealData.strMeal}</h3>
            <button class="favorite-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    //change the color of the like button
    const btn=newMeal.querySelector(".meal-body .favorite-btn");
    btn.addEventListener("click",(e)=>{
        if(btn.classList.contains("active")){
            e.stopPropagation();
            removeFavMealFromLS(mealData.idMeal);
            btn.classList.remove("active");
        }else{
            e.stopPropagation();
            addFavMealToLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });

    newMeal.addEventListener("click",()=>{
        showMealInfo(mealData);
    });

    mealsElement.appendChild(newMeal);
}
//add favorite meal to local storage
function addFavMealToLS(mealId){
    const mealIds=getFavMealFromLS();

    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]));
}
//remove favorite meal from local storage
function removeFavMealFromLS(mealId){
    const mealIds=getFavMealFromLS();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter(id=>id!==mealId)));
}
//get favorite meals from local storage
function getFavMealFromLS(){
    const mealIds=JSON.parse(localStorage.getItem("mealIds"));
    
    //check if mealIds is null, keep it iterable
    return mealIds===null?[]:mealIds;
}
//fetch favorite meals to the "favorate meals" scroll bar
async function fetchFavMeals(){
    //clean the container
    favMeals.innerHTML='';

    const mealIds=getFavMealFromLS();

    for(let i=0;i<mealIds.length;i++){
        const mealId=mealIds[i];
        const meal=await getMealById(mealId);
        addMealToFavBar(meal);
    }
    // console.log(meals);
}
//add the favorite meal to the favorite meals bar
function addMealToFavBar(mealData){
    const meal=document.createElement('li');

    meal.innerHTML=`
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span title="${mealData.strMeal}">${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    //use a close button to remove the favorite meal from favorite meal bar
    const btn=meal.querySelector(".clear");
    btn.addEventListener("click",(e)=>{
        e.stopPropagation();
        removeFavMealFromLS(mealData.idMeal);
        fetchFavMeals();
    })

    //click the favorite meal on the favorite meal bar to show meal infomation
    meal.addEventListener("click",()=>{
        showMealInfo(mealData);
    });

    favMeals.appendChild(meal);
}

searchBtn.addEventListener("click", async ()=>{
    const term=searchTerm.value;
    const meals=await getMealsBySearch(term);

    //clean the container first
    mealsElement.innerHTML="";

    if(meals){
        meals.forEach(meal=>{
            addMeal(meal);
        });
    }
});

//click the close button on popup window to close the whole popup widow
popupCloseBtn.addEventListener("click",()=>{
    mealPopupContainer.classList.add("hidden");
})

function showMealInfo(mealData){
    //clear the previous append if exist
    mealInfo.innerHTML="";
    //the meal info page must always show the top
    mealInfo.scrollBy(0,-100000000);

    const mealInfoElement=document.createElement("div");

    //get ingredients and measures
    const ingredients=[];
    let i=1;
    while(mealData['strIngredient'+i] && i<=20){
        ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        i++;
    }

    mealInfoElement.innerHTML=`
        <h2>${mealData.strMeal}</h2>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <h3>Instructions:</h3>
        <p>
            ${mealData.strInstructions.replace(/\r\n/g,"<br/><br/>").replace(/\n/g,"<br/><br/>")}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing)=>`
                <li>${ing}</li>
            `).join("")}
        </ul>
    `

    mealInfo.appendChild(mealInfoElement);

    //show the popup window
    mealPopupContainer.classList.remove("hidden")
}