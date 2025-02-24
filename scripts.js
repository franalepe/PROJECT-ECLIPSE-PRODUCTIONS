/*********************************
 * Generar estrellas animadas
 *********************************/
const starsContainer = document.querySelector('.stars');
if (starsContainer) {
  const numStars = 100;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    starsContainer.appendChild(star);
  }
}

/*********************************
 * Eclipse móvil (cambia con scroll)
 *********************************/
const eclipse = document.getElementById('eclipse');
window.addEventListener('scroll', () => {
  if (!eclipse) return;
  let scrollPos = window.scrollY;
  let newSize = 100 + scrollPos / 10;
  eclipse.style.width = newSize + 'px';
  eclipse.style.height = newSize + 'px';
  eclipse.style.opacity = Math.max(0.4, 1 - scrollPos / 800);
});

/*********************************
 * Animación “Split Text” (letra x letra)
 *********************************/
function animateSplitText(selector, delayIncrement = 50) {
  const element = document.querySelector(selector);
  if (!element) return;

  const text = element.textContent.trim();
  element.textContent = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = 0;
    if (char === ' ') {
      span.style.width = '0.5em';
    }
    // fadeInUp
    span.style.animation = 'fadeInUp 0.6s forwards';
    span.style.animationDelay = `${i * delayIncrement}ms`;
    element.appendChild(span);
  }
}

/*********************************
 * Animación “Blur Text” (palabra x palabra)
 * Respetando el span de "Eclipse,"
 *********************************/
function animateBlurText(selector, delayIncrement = 100) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Reemplazamos temporalmente el span
  let originalHTML = element.innerHTML;
  // Sustituimos <span class="logo-name">Eclipse,</span> por un token ECLIPSE_TOKEN
  originalHTML = originalHTML.replace(
    /<span class="logo-name">(.*?)<\/span>/,
    'ECLIPSE_TOKEN'
  );

  const words = originalHTML.trim().split(' ');
  element.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');

    // Si el token está en la palabra, lo reponemos con el span original
    if (word.includes('ECLIPSE_TOKEN')) {
      span.innerHTML = `<span class="logo-name">Eclipse,</span>`;
    } else {
      span.textContent = word;
    }

    span.style.display = 'inline-block';
    span.style.opacity = 0;
    // blurIn
    span.style.animation = 'blurIn 0.8s forwards';
    span.style.animationDelay = `${index * delayIncrement}ms`;

    element.appendChild(span);

    // Añadimos un espacio después de cada palabra
    const space = document.createElement('span');
    space.textContent = ' ';
    element.appendChild(space);
  });
}

/*********************************
 * Lanzar animaciones al cargar
 *********************************/
window.addEventListener('load', () => {
  // Blur en la frase 1
  animateBlurText('#frase-blur', 120);
  // Split en la frase 2
  animateSplitText('#frase-split', 50);
});

