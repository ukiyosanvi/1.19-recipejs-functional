// -------------------- DATA --------------------
const recipes = [
  { title: "Pasta", difficulty: "easy", time: 20 },
  { title: "Burger", difficulty: "easy", time: 25 },
  { title: "Pizza", difficulty: "medium", time: 40 },
  { title: "Biryani", difficulty: "hard", time: 60 },
  { title: "Salad", difficulty: "easy", time: 10 },
  { title: "Curry", difficulty: "medium", time: 35 },
  { title: "Noodles", difficulty: "easy", time: 15 },
  { title: "Steak", difficulty: "hard", time: 50 }
];

// -------------------- STATE --------------------
let currentFilter = "all";
let currentSort = "none";

// -------------------- DOM --------------------
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// -------------------- RENDER --------------------
const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = "";

  recipesToRender.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Difficulty: ${recipe.difficulty}</p>
      <p>Time: ${recipe.time} mins</p>
    `;

    recipeContainer.appendChild(card);
  });
};

// -------------------- FILTER FUNCTIONS (PURE) --------------------
const filterByDifficulty = (recipes, level) => {
  return recipes.filter(recipe => recipe.difficulty === level);
};

const filterByTime = (recipes, maxTime) => {
  return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
  switch (filterType) {
    case "easy":
    case "medium":
    case "hard":
      return filterByDifficulty(recipes, filterType);
    case "quick":
      return filterByTime(recipes, 30);
    default:
      return recipes;
  }
};

// -------------------- SORT FUNCTIONS (PURE) --------------------
const sortByName = (recipes) => {
  return [...recipes].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
};

const sortByTime = (recipes) => {
  return [...recipes].sort((a, b) => a.time - b.time);
};

const applySort = (recipes, sortType) => {
  switch (sortType) {
    case "name":
      return sortByName(recipes);
    case "time":
      return sortByTime(recipes);
    default:
      return recipes;
  }
};

// -------------------- UPDATE DISPLAY --------------------
const updateDisplay = () => {
  let result = recipes;

  result = applyFilter(result, currentFilter);
  result = applySort(result, currentSort);

  console.log(
    `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
  );

  renderRecipes(result);
};

// -------------------- ACTIVE BUTTON UI --------------------
const updateActiveButtons = () => {
  filterButtons.forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.filter === currentFilter
    );
  });

  sortButtons.forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.sort === currentSort
    );
  });
};

// -------------------- EVENTS --------------------
const setupEventListeners = () => {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentFilter = e.target.dataset.filter;
      updateActiveButtons();
      updateDisplay();
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentSort = e.target.dataset.sort;
      updateActiveButtons();
      updateDisplay();
    });
  });
};

// -------------------- INIT --------------------
setupEventListeners();
updateDisplay();
