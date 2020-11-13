const meals=document.getElementById("meals");

getRandomMeal();



async function getRandomMeal(){
    //get the random meal data from api
    const resp=await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData=await resp.json();
    const randomMeal=respData.meals[0];
    console.log(randomMeal);

    //add random meal to html
    addMeal(randomMeal,true);
}

async function getMealById(id){
    const meal=await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
}

async function getMealsBySearch(term){
    const meals=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
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
            <h4>${mealData.strMeal}</h4>
            <button class="favorite-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    //change the color of the like button
    const btn=newMeal.querySelector(".meal-body .favorite-btn");
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("active")){
            removeFavMealFromLS(mealData.idMeal);
            btn.classList.remove("active");
        }else{
            addFavMealToLS(mealData.idMeal);
            btn.classList.add("active");
        }
    });


    meals.appendChild(newMeal);
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