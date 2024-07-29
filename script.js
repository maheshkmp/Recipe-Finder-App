document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchRecipes(query);
    } else {
        alert('Please enter a recipe name.');
    }
});

async function fetchRecipes(query) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key from a recipe API service
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes.');
    }
}

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = '';

    if (recipes.length === 0) {
        recipeResults.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100px;height:auto;">
            <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
        `;
        recipeResults.appendChild(recipeElement);
    });
}
