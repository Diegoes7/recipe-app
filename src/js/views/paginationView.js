import View from './View.js';
// import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    // EVENT DELEGATION
    this._parentElement.addEventListener('click', function (e) {
      // searches up in the DOM tree, looks for parents
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numbersOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numbersOfPages > 1) {
      return `
         <button data-goto="${
           currentPage + 1
         }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
         <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><rect fill="none" height="24" width="24"/><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"/></svg>
          </button>`;
    }

    // Last Page
    if (currentPage === numbersOfPages && numbersOfPages > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><rect fill="none" height="24" width="24"/><path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z"/></svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }
    // Other page between
    if (currentPage < numbersOfPages) {
      return `
         <button data-goto="${
           currentPage - 1
         }" class="btn--inline pagination__btn--prev">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><rect fill="none" height="24" width="24"/><path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z"/></svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#e3ee3"><rect fill="none" height="24" width="24"/><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"/></svg>
          </button>
      `;
    }
    // Page 1, and there are NOT other pages
    return '';
  }
}

export default new PaginationView();
