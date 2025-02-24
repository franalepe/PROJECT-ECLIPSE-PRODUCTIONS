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
    // Manejo de espacio
    if (char === ' ') {
      span.style.width = '0.5em';
    }
    // Animación
    span.style.animation = 'fadeInUp 0.6s forwards';
    span.style.animationDelay = `${i * delayIncrement}ms`;
    element.appendChild(span);
  }
}

/*********************************
 * Animación “Blur Text” (palabra x palabra)
 * Conservando el color en "Eclipse," si existe
 *********************************/
function animateBlurText(selector, delayIncrement = 100) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Obtenemos el texto original (incluye el <span> si está)
  // Reemplazamos <span> por un marcador temporal para no perderlo
  let originalHTML = element.innerHTML;
  // Ejemplo: "Bienvenidos a <span class=\"logo-name\">Eclipse,</span> donde..."
  // Reemplazamos el span por un token => (ECLIPSE_TOKEN)
  originalHTML = originalHTML.replace(/<span.*?>(.*?)<\/span>/, 'ECLIPSE_TOKEN');

  const words = originalHTML.trim().split(' ');
  element.textContent = ''; // Limpiamos el contenido

  words.forEach((word, index) => {
    const span = document.createElement('span');
    // Si detectamos el token, volvemos a poner el span con la clase .logo-name
    if (word.includes('ECLIPSE_TOKEN')) {
      // Quitamos el token de la palabra y le devolvemos el texto "Eclipse,"
      const replacedText = word.replace('ECLIPSE_TOKEN', 'Eclipse,');
      span.innerHTML = `<span class="logo-name">${replacedText}</span> `;
    } else {
      span.textContent = word + ' ';
    }
    span.style.display = 'inline-block';
    span.style.opacity = 0;
    // Animación blurIn
    span.style.animation = 'blurIn 0.8s forwards';
    span.style.animationDelay = `${index * delayIncrement}ms`;

    element.appendChild(span);
  });
}

/*********************************
 * Lanzar animaciones al cargar la página
 *********************************/
window.addEventListener('load', () => {
  // Solo se activan si existen esos elementos
  animateBlurText('#frase-blur', 120);
  animateSplitText('#frase-split', 50);
});

