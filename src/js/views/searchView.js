class SearchView {
  _parentEl = document.querySelector('.search');
  _searchField = document.querySelector('.search__field');
  _searchButton = document.querySelector('.search__btn');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchField.value = '';
    this._searchButton.disabled = true; 
  }
  
  focusInput() {
    this._searchField.focus();
  }

  addHandlerSearch(handler) {
    this._searchField.addEventListener('input', () => {
      if (this._searchField.value.trim() !== '') {
        this._searchButton.disabled = false;
      } else {
        this._searchButton.disabled = true;
      }
    });

    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();

      if (this._searchField.value === '') {
        this._searchButton.disabled = true;
      } else {
        this._searchButton.disabled = false;
      }

      handler();
    });
  }
}

//! we export the instance of the class /NOT the class itself/,
//!object that was created by this class!!!
export default new SearchView();
