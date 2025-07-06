import View from './View.js';
import icons from 'url:../../../icons.c5b0f01c.svg'; // Importing icons with URL loader

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
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
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
