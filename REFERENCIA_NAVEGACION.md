# Punto de Referencia: Navegación y Selector Activo

## Configuración Correcta (Consolidada)

Este documento describe la configuración correcta del sitio web Interneon VPN después de la consolidación a un único archivo `index.html`.

### Estructura de Archivos

```
shadowguard_ikudev/
├── index.html (archivo principal)
├── interneonvpn/
│   ├── android.html
│   ├── seguridad.html
│   ├── testimonios.html
│   ├── proximamente.html
│   ├── libreria.html
│   ├── soporte.html
│   ├── contacto.html
│   ├── planes.html
│   ├── privacidad.html
│   ├── style.css
│   ├── js/
│   │   ├── javascript.js
│   │   ├── cookie.js
│   │   └── testimonios.js
│   └── images/
```

### Características Clave

**1. Punto de Entrada Único**
- Solo existe un archivo `index.html` en la raíz del proyecto
- No hay archivos `index.html` duplicados en subcarpetas
- Todos los demás archivos HTML de secciones están en la carpeta `interneonvpn/`

**2. Enlaces de Navegación**
- **Desde `index.html`**: Enlaces apuntan a `interneonvpn/[archivo].html`
  - Ejemplo: `<a href="interneonvpn/seguridad.html">Seguridad</a>`
- **Desde archivos en `interneonvpn/`**: Enlaces apuntan a la raíz o a otros archivos en el mismo directorio
  - Ejemplo: `<a href="../index.html">Inicio</a>`
  - Ejemplo: `<a href="seguridad.html">Seguridad</a>`

**3. Selector de Navegación Activa**
El script detecta automáticamente qué página está activa basándose en el **nombre del archivo HTML actual**:

```javascript
const navLinks = document.querySelectorAll('.nav-links a');
const currentPath = window.location.pathname.toLowerCase();
const filename = currentPath.split('/').pop();

navLinks.forEach(link => {
  const href = link.getAttribute('href').toLowerCase();
  let isActive = false;
  
  // Compara el nombre del archivo actual con el href del enlace
  if (filename === 'android.html' && href.includes('android.html')) {
    isActive = true;
  } else if (filename === 'seguridad.html' && href.includes('seguridad.html')) {
    isActive = true;
  }
  // ... más comparaciones para otras secciones
  
  if (isActive) {
    link.classList.add('active');
  }
});
```

**4. Funcionamiento Correcto**
- Cuando el usuario está en `index.html`, el enlace "Inicio" se marca como activo
- Cuando el usuario está en `interneonvpn/android.html`, el enlace "Android" se marca como activo
- Cuando el usuario está en `interneonvpn/seguridad.html`, el enlace "Seguridad" se marca como activo
- Y así sucesivamente para todas las secciones

### Archivos Críticos

1. **[index.html](index.html)** - Archivo principal de inicio
2. **[interneonvpn/android.html](interneonvpn/android.html)** - Sección Android
3. **[interneonvpn/seguridad.html](interneonvpn/seguridad.html)** - Sección Seguridad
4. **[interneonvpn/testimonios.html](interneonvpn/testimonios.html)** - Sección Testimonios
5. **[interneonvpn/proximamente.html](interneonvpn/proximamente.html)** - Sección Próximamente
6. **[interneonvpn/libreria.html](interneonvpn/libreria.html)** - Sección Librería
7. **[interneonvpn/soporte.html](interneonvpn/soporte.html)** - Sección Soporte
8. **[interneonvpn/contacto.html](interneonvpn/contacto.html)** - Página de Contacto
9. **[interneonvpn/planes.html](interneonvpn/planes.html)** - Página de Planes
10. **[interneonvpn/privacidad.html](interneonvpn/privacidad.html)** - Políticas de Privacidad

### Nota Importante

✅ **Esta configuración funciona correctamente.**
✅ **El selector de navegación activa detecta la página actual apropiadamente.**
✅ **No se deben crear nuevos archivos `index.html` en las subcarpetas.**
✅ **Mantener la estructura consolidada a un único archivo principal.**

### Cambios Realizados

**Commit**: `a98f9a5` - "Consolidar estructura a archivo index.html único y actualizar navegación"

**Cambios**:
- Eliminados 9 archivos `index.html` duplicados de las subcarpetas
- Actualizados todos los enlaces de navegación para apuntar a archivos `.html`
- Estandarizados los scripts de navegación activa en todos los archivos HTML
- Verificado que el selector de navegación activa funciona correctamente en todas las páginas

---

**Fecha**: 2024
**Idioma**: Español Latino
**Estado**: ✅ Funcional y Optimizado
