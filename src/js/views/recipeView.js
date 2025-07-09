import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#f38e82"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.54 14.53L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06zm6.797-12.72l4.607 3.845-1.28 1.535-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
     <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="42px" viewBox="0 0 20 20" width="48px" fill="#f38e82"><g><rect fill="none" height="20" width="20" x="0"/></g><g><g/><g><g><path d="M8.5,6C9.33,6,10,6.67,10,7.5S9.33,9,8.5,9S7,8.33,7,7.5S7.67,6,8.5,6 M8.5,5C7.12,5,6,6.12,6,7.5C6,8.88,7.12,10,8.5,10 S11,8.88,11,7.5C11,6.12,9.88,5,8.5,5L8.5,5z"/></g><g><path d="M10.99,9.95C11.16,9.98,11.33,10,11.5,10c1.38,0,2.5-1.12,2.5-2.5 C14,6.12,12.88,5,11.5,5c-0.17,0-0.34,0.02-0.51,0.05C11.61,5.68,12,6.55,12,7.5S11.61,9.32,10.99,9.95z" fill-rule="evenodd"/></g><g><path d="M8.5,12c2.15,0,4.38,0.77,4.5,1.23V14H4l0-0.77C4.12,12.77,6.35,12,8.5,12 M8.5,11C6.66,11,3,11.66,3,13.23V15h11v-1.77 C14,11.66,10.34,11,8.5,11L8.5,11z"/></g><g><path d="M13.73,11.23c0.75,0.48,1.27,1.12,1.27,2V15h2v-1.77 C17,12.18,15.36,11.54,13.73,11.23z" fill-rule="evenodd"/></g></g></g></svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
         <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </button>
      </div>
    </div>
        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#D16D6A"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 18c.2-.63 2.57-1.68 4.96-1.94l2.04-2c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-2-2H5zm15.6-5.5l-5.13 5.17-2.07-2.08L12 17l3.47 3.5L22 13.91z"/></svg>
        </div>
    <button class="btn--round btn-bookmark">
     ${
       this._data.bookmarked
         ? `
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="#D16D6A"><rect fill="none" height="20" width="20"/><path d="M13.5,9v5.78l-3.5-1.4l-3.5,1.4V4.5H11V3H6.5C5.67,3,5,3.67,5,4.5V17l5-2l5,2V9H13.5z M15.75,4.25v-1.5h-1.5v1.5h-1.5v1.5 h1.5v1.5h1.5v-1.5h1.5v-1.5H15.75z"/></svg>
    `
         : `
     <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#D16D6A"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
    `
     }
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}  
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><rect fill="none" height="32" width="32"/><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"/></svg>
    </a>
  </div> 
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#D16D6A"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
      <div class="recipe__quantity">${ing.quantity ? ing.quantity : ''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li> `;
  }
}

export default new RecipeView();
//! export just instance of the class to controller, NOT entire object
