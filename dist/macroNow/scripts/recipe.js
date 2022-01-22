// Variables
const searchBtn = document.getElementById('searchBtn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal__details__content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// Get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('searchInput').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal__search__item" data-id = "${meal.idMeal}">
                        <div class = "meal__item__img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal__item__name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipeBtn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipeBtn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "meal__details--title">${meal.strMeal}</h2>
        <p class = "meal__details__category">${meal.strCategory}</p>
        <div class = "meal__details__instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "meal__details__img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "details__recipe__link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}