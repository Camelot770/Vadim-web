// ---------- Данные галерей ----------
// Пока используются плейсхолдеры. Заменить на реальные файлы:
// { type: 'image', src: 'assets/studio-photo/1.jpg', title: 'Название' }
// { type: 'video', src: 'assets/studio-video/1.mp4', poster: 'assets/studio-video/1.jpg' }
const pad = (n) => String(n).padStart(2, '0');

const GALLERIES = {
  // Пока плейсхолдеры — папки «карточки товаров» / «Каталожка» ещё не распределены по вкладкам
  'studio-photo': Array.from({ length: 8 }, (_, i) => ({
    type: 'placeholder',
    title: `Студийное фото ${i + 1}`,
    wide: i === 0,
  })),
  'studio-video': Array.from({ length: 6 }, (_, i) => ({
    type: 'placeholder',
    title: `Студийное видео ${i + 1}`,
    badge: 'VIDEO',
  })),
  // Реальный контент из гугл-диска
  'image-video': Array.from({ length: 6 }, (_, i) => ({
    type: 'video',
    src: `assets/image-video/${pad(i + 1)}.mp4`,
    poster: `assets/image-video/${pad(i + 1)}.jpg`,
    badge: 'VIDEO',
    title: `Имидж видео ${i + 1}`,
  })),
  'image-photo': Array.from({ length: 14 }, (_, i) => ({
    type: 'image',
    src: `assets/image-photo/${pad(i + 1)}.jpg`,
    title: `Имидж фото ${i + 1}`,
    wide: i === 0,
  })),
};

// ---------- Рендер карточек ----------
function renderGrid(key) {
  const grid = document.querySelector(`[data-grid="${key}"]`);
  if (!grid || grid.dataset.rendered === '1') return;
  const items = GALLERIES[key] || [];
  grid.innerHTML = items.map((item) => {
    const wide = item.wide ? ' card--wide' : '';
    const badge = item.badge ? `<div class="card__badge">${item.badge}</div>` : '';
    let media = '';
    if (item.type === 'image') {
      media = `<img src="${item.src}" alt="${item.title || ''}" loading="lazy" />`;
    } else if (item.type === 'video') {
      const poster = item.poster ? ` poster="${item.poster}"` : '';
      media = `<video${poster} muted playsinline preload="metadata"><source src="${item.src}" /></video>`;
    } else {
      media = `<div class="card__placeholder">${item.title || 'PLACEHOLDER'}</div>`;
    }
    return `
      <div class="card" data-type="${item.type}" data-src="${item.src || ''}" data-title="${item.title || ''}">
        ${badge}
        ${media}
      </div>`.trim();
  }).join('');
  grid.dataset.rendered = '1';
}

// ---------- Табы ----------
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach((p) => p.classList.toggle('is-active', p.id === key));
    renderGrid(key);
  });
});

// Первичная отрисовка активной вкладки
const initialTab = document.querySelector('.tab.is-active')?.dataset.tab;
if (initialTab) renderGrid(initialTab);

// ---------- Лайтбокс ----------
const lightbox = document.getElementById('lightbox');
const lightboxContent = lightbox.querySelector('.lightbox__content');
const lightboxClose = lightbox.querySelector('.lightbox__close');

function openLightbox(html) {
  lightboxContent.innerHTML = html;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const type = card.dataset.type;
  const src = card.dataset.src;
  const title = card.dataset.title || '';
  if (!src) return; // плейсхолдеры не открываем
  if (type === 'image') {
    openLightbox(`<img src="${src}" alt="${title}" />`);
  } else if (type === 'video') {
    openLightbox(`<video src="${src}" controls autoplay playsinline></video>`);
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();
