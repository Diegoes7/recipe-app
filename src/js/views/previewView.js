import View from './View.js';
// import icons from 'url:../../img/icons.svg';


class PreviewView extends View {
  // _parentElement = '';
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return ` 
    <li class="preview">
     <a class="preview__link ${
       this._data.id === id ? 'preview__link--active' : ' '
     }" href="#${this._data.id}">
      <figure class="preview__fig">
        <img src="${this._data.image}" alt="${this._data.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${this._data.title}</h4>
        <p class="preview__publisher">${this._data.publisher}</p>
        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#D16D6A"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 18c.2-.63 2.57-1.68 4.96-1.94l2.04-2c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-2-2H5zm15.6-5.5l-5.13 5.17-2.07-2.08L12 17l3.47 3.5L22 13.91z"/></svg>
        </div>
      </div>
     </a>
  </li>
    `;
  }

  _enableFloatingPreviewTooltip() {
    const container = document.querySelector('.results'); // or your actual parent element
    if (!container) return;

    container.addEventListener('mouseover', e => {
      const link = e.target.closest('.preview__link');
      if (!link || window.innerWidth > 660) return;

      const data = link.querySelector('.preview__data');
      if (!data) return;

      const clone = data.cloneNode(true);
      clone.classList.add('floating-preview');

      const rect = link.getBoundingClientRect();
      clone.style.position = 'absolute';
      clone.style.top = `${window.scrollY + rect.top}px`;
      clone.style.left = `${window.scrollX + rect.right -15}px`;
      clone.style.zIndex = '9999';
      clone.style.background = '#fff';
      clone.style.padding = '0.75rem';
      clone.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
      clone.style.borderRadius = '8px';
      clone.style.maxWidth = '220px';
      clone.style.width = 'max-content';
      clone.style.pointerEvents = 'none'; // Prevent flicker on hover
      clone.style.overflowWrap = 'break-word';

      document.body.appendChild(clone);

      const remove = () => clone.remove();
      link.addEventListener('mouseleave', remove, { once: true });
    });
  }
}

export default new PreviewView();
