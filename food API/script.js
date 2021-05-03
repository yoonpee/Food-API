const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '7c5e1a13';
const APP_Keys = '7ac1f21706e4adfe2ecb762407ab5b60';


searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
})


async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Keys}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    generateHTML(data.hits);
}

function generateHTML(datas){
    container.classList.remove('initial');
    let generatedHTML = '';
    datas.map(e =>{
        
        generatedHTML += 
        `
        <div class="item">
           <img src="${e.recipe.image}" alt="">
           <div class="flex-container">
             <h1 class="title">${e.recipe.label}</h1>
             <a class="view-btn" href="${e.recipe.url}" target="_blank">View Recipe</a>
           </div>
           <p class="item-data">Calories: ${Math.floor(e.recipe.calories)}</p>
           <p class="item-data">CusinType: ${e.recipe.dietLabels.length > 0 ? e.recipe.dietLabels : e.recipe.dietLabels = "not found"}</p>
           <p class="item-data">disytype: ${e.recipe.dishType === undefined ? e.recipe.dishType ="not found" : e.recipe.dishType}</p>
           
        </div>

        `
    })
    searchResult.innerHTML = generatedHTML;
}


// async function fetchAPI(){
//     const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Keys}&to=20`;
//     const response = await fetch(baseURL);
//     const data = await response.json();// convert response made by bunch of data in to objects with json.
//     console.log(data);
//     generateHTML(data.hits);
// }

// function generateHTML(results){
//     container.classList.remove('initial');
//     let generatedHTML = '';
//     results.map( result =>{
//        generatedHTML += 
//        `
//        <div class="item">
//          <img src="${result.recipe.image}" alt="">
//          <div class="flex-container">
//            <h1 class="title">${result.recipe.label}</h1>
//            <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
//          </div>
//          <p class="item-data">Calories:${Math.floor(result.recipe.calories)}</p>
//          <p class="item-data">MealType:${result.recipe.mealType}</p>
//          <p class="item-data">Dietlabels:${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : result.recipe.dietLabels = 'No data found'}</p>
//        </div> 
//        `
//     })
//     searchResult.innerHTML = generatedHTML;
// }