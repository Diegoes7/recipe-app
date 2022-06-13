import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

// if(module.hot){
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());

    //1. Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading Recipe
    await model.loadRecipe(id);

    // 3. Rendering Recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search
    await model.loadSearchResults(query);

    // 3. Render results
    //resultView.render(model.state.search.results)
    resultView.render(model.getSearchResultPage());

    //4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controler will execute when 1 of the buttons is clicked
const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultView.render(model.getSearchResultPage(goToPage));

  //4. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const constrolServings = function (newServings) {
  // 1. Update the recipe servings (in state)
  model.updateServings(newServings);

  //2. Update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/ Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update Recipe View
  recipeView.update(model.state.recipe);

  //3. Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  // Add bookmarks in the bookmark section of the app
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);
    

    // Success Message
    addRecipeView.renderMessage();

    // Render bookmark View
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🚀🚀🚀', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerUpdateServings(constrolServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
