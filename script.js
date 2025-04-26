const userinput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');
const container = document.querySelector('.container');
const content = document.querySelector('.content');
const closecontent = document.getElementById('back');
const contentbox = document.querySelector('.contentbox');
const adv = document.querySelector('.adv');

const fetchdat = async (query) => {
    container.innerHTML = `<h2>Recipe Fetching..</h2>`;
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    container.innerHTML = ``;
    response.meals.forEach((meal) => {

        const respidiv = document.createElement('div');
        respidiv.className = "resipicard";
        respidiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dishe</p>
        <p>Belongs to <span>${meal.strCategory}<span> Dishe</p>
        `;
        const button = document.createElement('button');
        button.className = "view-recipe";

        button.textContent = "view recipe";
        respidiv.appendChild(button);
        button.addEventListener("click", () => {
            display(meal);
        })
        container.appendChild(respidiv);
        button.addEventListener('click', () => {
            window.scroll({
                top: 0,
                behavior: "smooth"
            })
        })
    });
  } catch (error) {
    container.innerHTML = `<h2>Sorry! There is no such type of food. Thank you!</h2>`;
   }




    const fetchingredient = (meal) => {
        let value = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                value += `<li>${measure} ${ingredient}</li>`;
            }
            else {
                break;
            }
        }
        return value;
    }
    const display = (meal) => {
        contentbox.style.display = "flex";
        content.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchingredient(meal)}</ul>
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
        <h3>Watch Recipe Video:</h3>
        <iframe width="560" height="315 " class="iframe" 
        src="${meal.strYoutube.replace("watch?v=", "embed/")}" 
        frameborder="0" allowfullscreen>
    </iframe>
        `
    }
}


back.addEventListener('click', () => {

    contentbox.style.display = "none";
})
searchBtn.addEventListener('click', () => {
    const input = userinput.value.trim();
    if (!input) {
        container.innerHTML = `<h2>please search  food Name in search bar</h2>`;
        console.log("ok")
    }
    else { fetchdat(input) }
    adv.style.display = "none";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "white";

});
userinput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const input = userinput.value.trim();
        if (input) {
            fetchdat(input);
        } else {
            container.innerHTML = "<h2>Please search food name in search bar</h2>";
        }
        adv.style.display = "none";
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "white";
    }
  
});
