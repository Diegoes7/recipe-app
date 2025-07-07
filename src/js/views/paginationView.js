import View from './View.js';
import icons from 'url:../../img/icons.svg';
// const icons = new URL('../../img/icons.svg', import.meta.url).href;

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
      // EVENT DELEGATION
    this._parentElement.addEventListener('click', function(e){
        // searches up in the DOM tree, looks for parents
        const btn = e.target.closest('.btn--inline')  
        
        if(!btn) return;

        const goToPage = +btn.dataset.goto;

        handler(goToPage)
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numbersOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numbersOfPages > 1) {
      return `
         <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Last Page
    if (currentPage === numbersOfPages && numbersOfPages > 1) {
      return `
          <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }
    // Other page between
    if (currentPage < numbersOfPages) {
      return `
         <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // Page 1, and there are NOT other pages
    return '';
  }
}

export default new PaginationView();
