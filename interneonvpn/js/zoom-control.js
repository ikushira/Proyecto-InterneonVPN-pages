/**
 * Control de Zoom al 90%
 * Asegura que el zoom se mantenga consistentemente en todas las páginas
 * Compatibilidad con navegadores modernos y antiguos
 */

(function() {
  'use strict';
  
  // Función para establecer el zoom
  function setZoom() {
    const zoomLevel = 0.9; // 90%
    
    // Método 1: CSS Zoom (navegadores modernos)
    document.documentElement.style.zoom = zoomLevel;
    
    // Método 2: Transform (compatibilidad)
    if (!document.documentElement.style.zoom) {
      document.documentElement.style.transform = `scale(${zoomLevel})`;
      document.documentElement.style.transformOrigin = 'top left';
      document.documentElement.style.width = (100 / zoomLevel) + '%';
      document.documentElement.style.height = (100 / zoomLevel) + '%';
    }
    
    // Restaurar zoom si el navegador lo cambia
    window.addEventListener('wheel', function(e) {
      if (e.ctrlKey) {
        e.preventDefault();
        document.documentElement.style.zoom = zoomLevel;
      }
    }, { passive: false });
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setZoom);
  } else {
    setZoom();
  }
  
  // Re-aplicar zoom después de que se carguen las imágenes y recursos
  window.addEventListener('load', setZoom);
  
  // Re-aplicar zoom periódicamente para asegurar consistencia
  setInterval(setZoom, 500);
})();
