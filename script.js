// ---------- Данные галерей ----------
// Пока используются плейсхолдеры. Заменить на реальные файлы:
// { type: 'image', src: 'assets/studio-photo/1.jpg', title: 'Название' }
// { type: 'video', src: 'assets/studio-video/1.mp4', poster: 'assets/studio-video/1.jpg' }
const pad = (n) => String(n).padStart(2, '0');

// ---------- Описания вкладок ----------
const DESCRIPTIONS = {
  'marketplace': {
    title: 'Продающая инфографика для Wildberries и Ozon',
    text: 'Создаём карточки, которые увеличивают CTR и конверсию в корзину. Работаем с любой категорией товаров — от косметики до электроники.',
  },
  'studio-shoot': {
    title: 'Чистая студийная съёмка для каталогов и лукбуков',
    text: 'Полный цикл студийного контента: модели на циклораме, ghost mannequin для одежды и предметная съёмка аксессуаров. Статика и видео-проходки — всё, что нужно для маркетплейсов, интернет-магазинов и каталогов бренда.',
  },
  'image-shoot': {
    title: 'Модели, украшения и атмосфера уровня глянца',
    text: 'Fashion-контент для соцсетей, сайта и рекламных кампаний. Реальные локации, кинематографичный свет, редакторская подача — без затрат на студию, моделей и продакшен.',
  },
  'ad-creatives': {
    title: 'Performance-статика, которая приносит заявки',
    text: 'Баннеры и креативы для таргета в Meta, VK, Яндекс.Директ. Оффер, CTA и визуал в одном кадре — готово к запуску в рекламный кабинет.',
  },
  'video-creatives': {
    title: 'Ролики, которые останавливают скролл',
    text: 'Короткие видео для соцсетей, сайта и рекламы. От динамичных продуктовых тизеров до кинематографичных имиджевых роликов — любой формат под задачу бренда.',
  },
  'ai-avatars': {
    title: 'Цифровые герои, которые работают на ваш бренд 24/7',
    text: 'Создаём AI-креаторов для соцсетей и полноценных амбассадоров бренда под ключ — с внешностью, голосом, характером и ИИ-агентом, который пишет сценарии. Замена инфлюенсерам без ограничений по времени и бюджету.',
  },
  'creative-visuals': {
    title: 'Арт-направление и концептуальные генерации',
    text: 'Нестандартные визуалы для имиджевых задач: коллаборации, кампании, спецпроекты, контент для соцсетей. Там, где нужна смелая идея и визуальный характер.',
  },
};

function renderPanelHeader(key) {
  const panel = document.getElementById(key);
  if (!panel) return;
  if (panel.querySelector('.panel__header')) return;
  const d = DESCRIPTIONS[key];
  if (!d) return;
  const header = document.createElement('div');
  header.className = 'panel__header';
  header.innerHTML = `
    <h3 class="panel__title">${d.title}</h3>
    <p class="panel__desc">${d.text}</p>
  `;
  panel.insertBefore(header, panel.firstChild);
}

const GALLERIES = {
  // Пока пусто — ждём материалы
  'creative-visuals': [],
  // 6 имиджевых + 2 студийных = 8 видео
  'video-creatives': [
    ...Array.from({ length: 6 }, (_, i) => ({
      type: 'video',
      src: `assets/image-video/${pad(i + 1)}.mp4`,
      poster: `assets/image-video/${pad(i + 1)}.jpg`,
      badge: 'VIDEO',
      title: `Видео ${i + 1}`,
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
      type: 'video',
      src: `assets/studio-video/${pad(i + 1)}.mp4`,
      poster: `assets/studio-video/${pad(i + 1)}.jpg`,
      badge: 'VIDEO',
      title: `Видео ${i + 7}`,
    })),
  ],
  // Пока пусто — ждём материалы
  'ai-avatars': [],
  // studio-photo/05..25 — каталожные кадры моделей
  'studio-shoot': Array.from({ length: 21 }, (_, i) => ({
    type: 'image',
    src: `assets/studio-photo/${pad(i + 5)}.jpg`,
    title: `Студийная съёмка ${i + 1}`,
    wide: i === 0,
  })),
  // все 14 из имидж фото
  'image-shoot': Array.from({ length: 14 }, (_, i) => ({
    type: 'image',
    src: `assets/image-photo/${pad(i + 1)}.jpg`,
    title: `Имиджевая съёмка ${i + 1}`,
    wide: i === 0,
  })),
  // studio-photo/01..04 — карточки товаров
  'marketplace': Array.from({ length: 4 }, (_, i) => ({
    type: 'image',
    src: `assets/studio-photo/${pad(i + 1)}.jpg`,
    title: `Карточка ${i + 1}`,
    wide: i === 0,
  })),
  // Пока пусто — ждём материалы
  'ad-creatives': [],
};

// ---------- Рендер карточек ----------
function renderGrid(key) {
  const grid = document.querySelector(`[data-grid="${key}"]`);
  if (!grid || grid.dataset.rendered === '1') return;
  const items = GALLERIES[key] || [];
  if (items.length === 0) {
    grid.classList.add('grid--empty');
    grid.innerHTML = `
      <div class="coming-soon">
        <div class="coming-soon__icon">✨</div>
        <h3>Контент готовится</h3>
        <p>Скоро наполним этот раздел свежими работами</p>
      </div>
    `;
    grid.dataset.rendered = '1';
    return;
  }
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

const emptyState = document.getElementById('empty-state');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach((p) => p.classList.toggle('is-active', p.id === key));
    if (emptyState) emptyState.style.display = 'none';
    renderPanelHeader(key);
    renderGrid(key);
  });
});

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
