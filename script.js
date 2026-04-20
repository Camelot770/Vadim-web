// ---------- Данные галерей ----------
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

const imgSeq = (folder, count, ext = 'jpg', label = '') =>
  Array.from({ length: count }, (_, i) => ({
    type: 'image',
    src: `assets/${folder}/${pad(i + 1)}.${ext}`,
    title: label ? `${label} ${i + 1}` : '',
    wide: i === 0,
  }));

const GALLERIES = {
  // Креативные визуалы — 14 фото
  'creative-visuals': imgSeq('creative-visuals', 14, 'jpg', 'Креативный визуал'),
  // Видео-креативы — 7 роликов (4 mp4 + 3 mov)
  'video-creatives': [
    { type: 'video', src: 'assets/video-creatives/01.mp4', badge: 'VIDEO', title: 'Видео-креатив 1', wide: true },
    { type: 'video', src: 'assets/video-creatives/02.mp4', badge: 'VIDEO', title: 'Видео-креатив 2' },
    { type: 'video', src: 'assets/video-creatives/03.mp4', badge: 'VIDEO', title: 'Видео-креатив 3' },
    { type: 'video', src: 'assets/video-creatives/04.mp4', badge: 'VIDEO', title: 'Видео-креатив 4' },
    { type: 'video', src: 'assets/video-creatives/05.mov', badge: 'VIDEO', title: 'Видео-креатив 5' },
    { type: 'video', src: 'assets/video-creatives/06.mov', badge: 'VIDEO', title: 'Видео-креатив 6' },
    { type: 'video', src: 'assets/video-creatives/07.mov', badge: 'VIDEO', title: 'Видео-креатив 7' },
  ],
  // AI-аватары — 7 роликов
  'ai-avatars': Array.from({ length: 7 }, (_, i) => ({
    type: 'video',
    src: `assets/ai-avatars/${pad(i + 1)}.mp4`,
    badge: 'VIDEO',
    title: `AI-аватар ${i + 1}`,
    wide: i === 0,
  })),
  // Студийная съёмка — 2 видео + 29 фото (27 jpg + 2 png)
  'studio-shoot': [
    { type: 'video', src: 'assets/studio-shoot/video-01.mp4', badge: 'VIDEO', title: 'Студийное видео 1', wide: true },
    { type: 'video', src: 'assets/studio-shoot/video-02.mp4', badge: 'VIDEO', title: 'Студийное видео 2' },
    ...Array.from({ length: 27 }, (_, i) => ({
      type: 'image',
      src: `assets/studio-shoot/${pad(i + 1)}.jpg`,
      title: `Студийное фото ${i + 1}`,
    })),
    { type: 'image', src: 'assets/studio-shoot/28.png', title: 'Студийное фото 28' },
    { type: 'image', src: 'assets/studio-shoot/29.png', title: 'Студийное фото 29' },
  ],
  // Имиджевая съёмка — порядок: 5 ключевых кадров → мужские fashion → женские портреты → украшения/mood → мужские часы → прочее
  'image-shoot': [
    { type: 'image', src: 'assets/image-shoot/14.jpg', title: 'Имидж 1', wide: true },
    { type: 'image', src: 'assets/image-shoot/13.jpg', title: 'Имидж 2' },
    { type: 'image', src: 'assets/image-shoot/17.jpg', title: 'Имидж 3' },
    { type: 'image', src: 'assets/image-shoot/15.jpg', title: 'Имидж 4' },
    { type: 'image', src: 'assets/image-shoot/16.jpg', title: 'Имидж 5' },
    { type: 'image', src: 'assets/image-shoot/18.jpeg', title: 'Имидж 6' },
    { type: 'image', src: 'assets/image-shoot/20.jpeg', title: 'Имидж 7' },
    { type: 'image', src: 'assets/image-shoot/21.jpeg', title: 'Имидж 8' },
    { type: 'image', src: 'assets/image-shoot/19.jpeg', title: 'Имидж 9' },
    { type: 'image', src: 'assets/image-shoot/03.jpg', title: 'Имидж 10' },
    { type: 'image', src: 'assets/image-shoot/09.jpg', title: 'Имидж 11' },
    { type: 'image', src: 'assets/image-shoot/11.jpg', title: 'Имидж 12' },
    { type: 'image', src: 'assets/image-shoot/04.jpg', title: 'Имидж 13' },
    { type: 'image', src: 'assets/image-shoot/10.jpg', title: 'Имидж 14' },
    { type: 'image', src: 'assets/image-shoot/12.jpg', title: 'Имидж 15' },
    { type: 'image', src: 'assets/image-shoot/02.jpg', title: 'Имидж 16' },
    { type: 'image', src: 'assets/image-shoot/22.png', title: 'Имидж 17' },
    { type: 'image', src: 'assets/image-shoot/07.jpg', title: 'Имидж 18' },
    { type: 'image', src: 'assets/image-shoot/05.jpg', title: 'Имидж 19' },
    { type: 'image', src: 'assets/image-shoot/08.jpg', title: 'Имидж 20' },
    { type: 'image', src: 'assets/image-shoot/06.jpg', title: 'Имидж 21' },
    { type: 'image', src: 'assets/image-shoot/01.jpg', title: 'Имидж 22' },
  ],
  // Карточки для маркетплейсов — 14 карточек
  'marketplace': imgSeq('marketplace', 14, 'jpg', 'Карточка'),
  // Рекламные креативы — 8 баннеров
  'ad-creatives': imgSeq('ad-creatives', 8, 'jpg', 'Реклама'),
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
  // Превью: assets/<cat>/name.ext → assets/<cat>/thumbs/name.jpg
  const thumbOf = (src) => {
    if (!src) return '';
    const i = src.lastIndexOf('/');
    const dir = src.slice(0, i);
    const name = src.slice(i + 1);
    const base = name.replace(/\.[^.]+$/, '');
    return `${dir}/thumbs/${base}.jpg`;
  };
  grid.innerHTML = items.map((item) => {
    const wide = item.wide ? ' card--wide' : '';
    const badge = item.badge ? `<div class="card__badge">${item.badge}</div>` : '';
    const thumb = thumbOf(item.src);
    // В сетке всегда грузим лёгкое превью <img>; оригинал (фото или видео) откроется в лайтбоксе
    const media = `<img src="${thumb}" alt="${item.title || ''}" loading="lazy" />`;
    return `
      <div class="card${wide}" data-type="${item.type}" data-src="${item.src || ''}" data-title="${item.title || ''}">
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
