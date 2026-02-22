// ── MENSAJES NOCTURNOS ────────────────────────────────────────────────
// Edita o agrega los mensajes que quieras aquí
const mensajes = [
  "Que esta noche te cuide el mismo cielo que me cuida a mí. Duerme bonito, Phaython. Mañana cuando abras los ojos, estaré pensando en ti.",
  "Hay algo muy especial en saber que en algún lugar del mundo, tú también vas a cerrar los ojos esta noche. Descansa. Mereces cada hora de sueño.",
  "Que tus sueños sean tan bonitos como tu sonrisa. Buenas noches, mi amor. Esta noche, como todas, te llevo conmigo.",
  "El día se va, pero lo que siento por ti no descansa. Duerme tranquila, Phaython. Aquí estaré cuando amanezca.",
  "Las estrellas de esta noche son testigos de lo mucho que te quiero. Cierra los ojos. Mañana nos espera un día más juntos.",
  "Si esta noche sueñas con algo bonito, sabe que no es casualidad. Es que yo estaba pensando en ti justo antes de que te durmieras.",
  "Que la noche te abrace con suavidad y el descanso te encuentre rápido. Eres lo mejor que le pasó a mis días. Buenas noches.",
  "No hay noche tan larga que no termine en amanecer, y no hay amanecer en el que no piense en ti. Descansa, mi Phaython.",
];

// ── CURSOR ───────────────────────────────────────────────────────────
const cursorEl = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursorEl.style.left = e.clientX + 'px';
  cursorEl.style.top  = e.clientY + 'px';
});

// ── ESTRELLAS ─────────────────────────────────────────────────────────
const starsLayer = document.getElementById('starsLayer');
for (let i = 0; i < 180; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = 0.5 + Math.random() * 2.5;
  s.style.cssText = `
    left:               ${Math.random() * 100}vw;
    top:                ${Math.random() * 85}vh;
    width:              ${size}px;
    height:             ${size}px;
    animation-duration: ${2 + Math.random() * 4}s;
    animation-delay:    ${Math.random() * 4}s;
    opacity:            ${0.1 + Math.random() * 0.5};
  `;
  starsLayer.appendChild(s);
}

// ── POLVO ESTELAR ─────────────────────────────────────────────────────
const stardustEl = document.getElementById('stardust');
const dustColors = [
  'rgba(201,168,76,0.6)',
  'rgba(200,216,232,0.5)',
  'rgba(255,248,231,0.4)',
];

function spawnDust() {
  const d = document.createElement('div');
  d.className = 'dust';
  const size = 1 + Math.random() * 3;
  d.style.cssText = `
    left:               ${Math.random() * 100}vw;
    width:              ${size}px;
    height:             ${size}px;
    background:         ${dustColors[Math.floor(Math.random() * dustColors.length)]};
    --dx:               ${(Math.random() - 0.5) * 80}px;
    animation-duration: ${10 + Math.random() * 15}s;
    animation-delay:    ${Math.random() * 8}s;
  `;
  stardustEl.appendChild(d);
  setTimeout(() => d.remove(), 25000);
}
for (let i = 0; i < 12; i++) setTimeout(spawnDust, i * 400);
setInterval(spawnDust, 2000);

// ── MÁQUINA DE ESCRITURA ──────────────────────────────────────────────
const messageEl  = document.getElementById('messageText');
const typeCursor = document.getElementById('typeCursor');
const firmaBlock = document.getElementById('firmaBlock');
const replayBtn  = document.getElementById('replayBtn');

let typing = false;

function pickMessage() {
  // Mensaje diferente según la hora del día
  const hora = new Date().getHours();
  return mensajes[hora % mensajes.length];
}

function typeMessage(texto) {
  typing = true;
  messageEl.textContent = '';
  messageEl.appendChild(typeCursor);
  firmaBlock.classList.remove('visible');

  let i = 0;
  const speed = 38; // ms por carácter

  function typeChar() {
    if (i < texto.length) {
      const char = document.createTextNode(texto[i]);
      messageEl.insertBefore(char, typeCursor);
      i++;
      setTimeout(typeChar, speed + (Math.random() * 20 - 10));
    } else {
      setTimeout(() => {
        typeCursor.style.display = 'none';
        firmaBlock.classList.add('visible');
        typing = false;
        // Revelar sección del nombre después de la firma
        setTimeout(revelarNombre, 1200);
      }, 600);
    }
  }

  setTimeout(typeChar, 200);
}

// ── REVELAR SECCIÓN DEL NOMBRE ────────────────────────────────────────
function revelarNombre() {
  const nombreSection = document.getElementById('nombreSection');
  const parrafos = [
    document.getElementById('np1'),
    document.getElementById('np2'),
    document.getElementById('np3'),
  ];

  // Limpiar estado anterior
  nombreSection.classList.remove('visible');
  parrafos.forEach(p => p.classList.remove('visible'));

  // Revelar la sección contenedora
  setTimeout(() => {
    nombreSection.classList.add('visible');
    // Revelar párrafos uno por uno con pausa entre cada uno
    parrafos.forEach((p, i) => {
      setTimeout(() => p.classList.add('visible'), 800 + i * 1400);
    });
  }, 600);
}

function startAnimation() {
  typeCursor.style.display = 'inline-block';
  firmaBlock.classList.remove('visible');

  // Ocultar sección del nombre al reiniciar
  const nombreSection = document.getElementById('nombreSection');
  const parrafos = [
    document.getElementById('np1'),
    document.getElementById('np2'),
    document.getElementById('np3'),
  ];
  nombreSection.classList.remove('visible');
  parrafos.forEach(p => p.classList.remove('visible'));

  typeMessage(pickMessage());
}

// Iniciar tras la animación de entrada
setTimeout(startAnimation, 2600);

// Botón repetir
replayBtn.addEventListener('click', () => {
  if (typing) return;
  startAnimation();
});

// ── POLVO AL MOVER EL MOUSE ───────────────────────────────────────────
let lastMouse = { x: 0, y: 0 };

// Keyframe dinámico para el polvo del mouse
const mouseStyle = document.createElement('style');
mouseStyle.textContent = `
  @keyframes mouse-dust {
    0%   { transform: translate(0, 0) scale(1); opacity: 0.8; }
    100% { transform: translate(0px, -30px) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(mouseStyle);

function spawnMouseDust(x, y) {
  for (let i = 0; i < 3; i++) {
    const d = document.createElement('div');
    const tx = (Math.random() - 0.5) * 40;
    const ty = 20 + Math.random() * 30;
    d.style.cssText = `
      position:       fixed;
      left:           ${x + (Math.random() - 0.5) * 20}px;
      top:            ${y + (Math.random() - 0.5) * 20}px;
      width:          ${1 + Math.random() * 3}px;
      height:         ${1 + Math.random() * 3}px;
      border-radius:  50%;
      background:     rgba(201,168,76,${0.3 + Math.random() * 0.4});
      pointer-events: none;
      z-index:        9998;
      transform:      translate(0,0) scale(1);
      transition:     transform ${0.6 + Math.random() * 0.6}s ease, opacity ${0.6 + Math.random() * 0.6}s ease;
      opacity:        0.8;
    `;
    document.body.appendChild(d);
    requestAnimationFrame(() => {
      d.style.transform = `translate(${tx}px, -${ty}px) scale(0)`;
      d.style.opacity   = '0';
    });
    setTimeout(() => d.remove(), 1200);
  }
}

document.addEventListener('mousemove', e => {
  const dx = Math.abs(e.clientX - lastMouse.x);
  const dy = Math.abs(e.clientY - lastMouse.y);
  if (dx + dy > 30) {
    spawnMouseDust(e.clientX, e.clientY);
    lastMouse = { x: e.clientX, y: e.clientY };
  }
});


// ── REVEAL CARTA DE AMOR POR SCROLL ──────────────────────────────────
const cartaElementos = document.querySelectorAll(
  '.carta-bloque, .carta-cita, .carta-cierre, .carta-section'
);

const cartaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      cartaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

cartaElementos.forEach(el => cartaObserver.observe(el));