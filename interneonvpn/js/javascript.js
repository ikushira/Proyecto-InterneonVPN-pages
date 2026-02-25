// 1. Variables y funciones
let testimonios = [
  { nombre: "Ana", mensaje: "Excelente servicio y seguridad." },
  { nombre: "Luis", mensaje: "La app es fácil de usar y rápida." }
];

function mostrarTestimonios() {
  const contenedor = document.getElementById("lista-testimonios");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  for (let t of testimonios) {
    let div = document.createElement("div");
    div.className = "tarjeta-contacto";
    div.innerHTML = `<strong>${t.nombre}:</strong> <span>${t.mensaje}</span>`;
    contenedor.appendChild(div);
  }
}

// 2. Estructuras de control y bucles ya usados arriba

// 3. Manipulación del DOM
document.addEventListener("DOMContentLoaded", function() {
  mostrarTestimonios();
});

// 4. Manejo de eventos
document.querySelectorAll(".btn-descargar").forEach(btn => {
  btn.addEventListener("click", function(e) {
  alert("¡Gracias por descargar la app InterNeon VPN!");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Solo números en teléfono
  const telefonoEl = document.getElementById('telefono');
  if (telefonoEl) {
    telefonoEl.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // Validación y popup
  const contactoForm = document.getElementById('contacto-form');
  if (contactoForm) {
    contactoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombreEl = document.getElementById('nombre');
      const correoEl = document.getElementById('correo');
      const telefonoEl2 = document.getElementById('telefono');
      const mensajeEl = document.getElementById('mensaje');
      const popup = document.getElementById('popup-mensaje');
      const popupTexto = document.getElementById('popup-texto');

      const nombre = nombreEl ? nombreEl.value.trim() : '';
      const correo = correoEl ? correoEl.value.trim() : '';
      const telefono = telefonoEl2 ? telefonoEl2.value.trim() : '';
      const mensaje = mensajeEl ? mensajeEl.value.trim() : '';

      if (popup && popupTexto) {
        if (nombre && correo && telefono && mensaje) {
          popupTexto.textContent = "Mensaje Enviado";
          popup.classList.remove('popup-error');
          popup.classList.add('popup-success');
          this.reset();
        } else {
          popupTexto.textContent = "Datos Incompletos!";
          popup.classList.remove('popup-success');
          popup.classList.add('popup-error');
        }
        popup.style.display = "flex";
        setTimeout(() => { popup.style.display = "none"; }, 2200);
      }
    });
  }

  // Nota: El código del carrusel se encuentra en cada página HTML que lo necesita
  // para manejar correctamente las rutas relativas según su ubicación
});

// Redirigir a contacto al hacer click en cualquier botón de elegir plan
document.querySelectorAll('.choose-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    window.location.href = "contacto.html";
  });
});

// Efecto interactivo de cursor con canvas (global para todas las páginas)
(function() {
  let mouseMoved = false;
  const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
  };
  const params = {
    // adaptive number of points for performance
    pointsNumber: window.innerWidth < 800 ? 28 : 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
    idleTimeout: 900 // ms to consider idle and reduce updates
  };
  let points = [];

  function initPoints() {
    points = [];
    for (let i = 0; i < params.pointsNumber; i++) {
      points.push({
        x: pointer.x,
        y: pointer.y,
        vx: 0,
        vy: 0,
      });
    }
  }

  // throttle mousemove to 60fps max and update pointer
  let lastMouseTime = 0;
  function updateMousePosition(e) {
    const now = Date.now();
    if (now - lastMouseTime < 16) return; // ~60fps
    lastMouseTime = now;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    mouseMoved = true;
    lastActive = now;
  }

  function setupCanvas() {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;
    // handle devicePixelRatio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initPoints();
  }

  let lastActive = Date.now();
  function update() {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  // clear using CSS pixel size (ctx is transformed to devicePixelRatio)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Primer punto sigue al mouse
    points[0].vx += (pointer.x - points[0].x) * params.spring;
    points[0].vy += (pointer.y - points[0].y) * params.spring;
    points[0].vx *= params.friction;
    points[0].vy *= params.friction;
    points[0].x += points[0].vx;
    points[0].y += points[0].vy;

    // Los demás puntos siguen al anterior
    for (let i = 1; i < points.length; i++) {
      points[i].vx += (points[i - 1].x - points[i].x) * params.spring;
      points[i].vy += (points[i - 1].y - points[i].y) * params.spring;
      points[i].vx *= params.friction;
      points[i].vy *= params.friction;
      points[i].x += points[i].vx;
      points[i].y += points[i].vy;
    }

    // Dibujar líneas de colores
    for (let i = 1; i < points.length; i++) {
      ctx.strokeStyle = `hsl(${(i * 360 / points.length)}, 100%, 60%)`;
      ctx.lineWidth = 2 + Math.sin(i + Date.now() * 0.002) * 1.5;
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }

    // if idle, reduce CPU by skipping frames occasionally
    const now = Date.now();
    if (now - lastActive > params.idleTimeout) {
      // skip next frame to reduce work (but keep occasional updates)
      setTimeout(() => { requestAnimationFrame(update); }, 120);
    } else {
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('mousemove', updateMousePosition);
  window.addEventListener('resize', setupCanvas);

  document.addEventListener('DOMContentLoaded', () => {
    setupCanvas();
    update();
  });
})();

// Overlay de publicidad - Manejador con mejor tolerancia
document.addEventListener("DOMContentLoaded", function() {
  const cerrarBtn = document.getElementById("cerrarBtnPublicidad");
  const overlay = document.getElementById("overlay-publicidad");
  
  if (!overlay) return; // Salir si no existe el overlay
  
  // Función para cerrar el overlay
  function cerrarOverlay() {
    if (overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
  
  // Bloquea el scroll mientras el overlay está visible
  document.body.style.overflow = "hidden";
  
  // Agregar evento al botón cerrar
  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      cerrarOverlay();
    });
    
    // Agregar también soporte a teclado (Escape)
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && overlay.style.display !== 'none') {
        cerrarOverlay();
      }
    });
  }
  
  // Cerrar automáticamente después de 5 segundos
  setTimeout(function() {
    cerrarOverlay();
  }, 5000);
  
  // Smooth scroll a las secciones al hacer clic en los enlaces del menú
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Si es un enlace interno a la misma página
      if (href === 'index.html' || href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Si es un enlace a otra página, permite la navegación normal
      // pero también agregamos smooth scroll para cuando se cargue
      const targetPage = href.split('/').pop();
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      if (targetPage === currentPage) {
        e.preventDefault();
        // Buscar el h2 que corresponde a la página actual
        const h2Elements = document.querySelectorAll('main h2');
        if (h2Elements.length > 0) {
          h2Elements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // Cuando la página carga, si viene de un hash, scroll a esa sección
  window.addEventListener('load', function() {
    const h2Elements = document.querySelectorAll('main h2');
    if (h2Elements.length > 0 && !window.location.hash) {
      // Scroll suave al primer h2 de la sección principal
      setTimeout(() => {
        h2Elements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  });
});
