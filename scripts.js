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
 * Menú hamburguesa
 *********************************/
// Toggle para el menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');  // Agrega animación de cambio de color al icono del menú
  });
}

/*********************************
 * ShinyText
 *********************************/
function applyShinyText(selector, speed = 5) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.style.backgroundSize = '200% 100%';
    element.style.animation = `shine ${speed}s linear infinite`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyShinyText('.shiny-text', 4);
});

/*********************************
 * Lanzar animaciones al cargar
 *********************************/
window.addEventListener('load', () => {
  // Blur en la frase 1
  animateBlurText('#frase-blur', 120);
  // Split en la frase 2
  animateSplitText('#frase-split', 50);
});

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
    span.style.animation = 'fadeInUp 0.6s forwards';
    span.style.animationDelay = `${i * delayIncrement}ms`;
    element.appendChild(span);
  }
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('touch');
  });
});

/*********************************
 * Enviar mensajes por Telegram
 *********************************/
// Variables para CallMeBot
const callMeBotUser = "BustillosFrank";

// Función para enviar mensajes por Telegram
function enviarMensajeTelegram(mensaje) {
  const url = `http://api.callmebot.com/text.php?user=${callMeBotUser}&text=${encodeURIComponent(mensaje)}`;
  fetch(url)
    .then(response => console.log("Mensaje enviado:", mensaje))
    .catch(error => console.error("Error enviando mensaje:", error));
}

// Configurar el envío del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = contactForm.querySelector('input[placeholder="Nombre"]').value;
      const email = contactForm.querySelector('input[placeholder="Email"]').value;
      const mensaje = contactForm.querySelector('textarea[placeholder="Mensaje"]').value;

      const mensajeTelegram = `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`;
      enviarMensajeTelegram(mensajeTelegram);

      // Limpiar el formulario después de enviar
      contactForm.reset();
      alert("Mensaje enviado con éxito.");
    });
  }
});
