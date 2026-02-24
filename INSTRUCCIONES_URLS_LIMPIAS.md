# 🔒 URLs LIMPIAS - Guía de Implementación

## ✅ Lo que se ha completado:

### 1. **Archivo .htaccess creado**
   - Ubicación: `/interneonvpn/.htaccess`
   - Función: Reescribir URLs para mostrar `/pagina` en lugar de `/pagina.html`
   - Incluye optimizaciones de caché y compresión GZIP

### 2. **Estructura de carpetas reorganizada**
   Ahora cada página está en su propia carpeta con un `index.html`:
   ```
   interneonvpn/
   ├── .htaccess (nuevo)
   ├── android/
   │   └── index.html
   ├── planes/
   │   └── index.html
   ├── seguridad/
   │   └── index.html
   ├── contacto/
   │   └── index.html
   ├── soporte/
   │   └── index.html
   ├── testimonios/
   │   └── index.html
   ├── proximamente/
   │   └── index.html
   ├── libreria/
   │   └── index.html
   ├── privacidad/
   │   └── index.html
   ├── style.css
   ├── images/
   ├── js/
   └── scripts/
   ```

### 3. **Enlaces actualizados**
   - ✅ Todos los `href="pagina.html"` cambiados a `href="/pagina"`
   - ✅ Rutas de recursos (CSS, JS, imágenes) ajustadas correctamente
   - ✅ El archivo principal `index.html` actualizado

## 🌐 Cómo se verá después de subir a cPanel:

**Antes (feo):**
- `tundominio.com/interneonvpn/android.html`
- `tundominio.com/interneonvpn/planes.html`
- `tundominio.com/interneonvpn/seguridad.html`

**Después (profesional):**
- `tundominio.com/android`
- `tundominio.com/planes`
- `tundominio.com/seguridad`

## 📤 Pasos para subir a cPanel:

### 1. **Descarga los archivos nuevos**
   - Descarga todas las carpetas nuevas (`android/`, `planes/`, `seguridad/`, etc.)
   - Descarga el archivo `.htaccess` (asegúrate de que sea visible - en Windows aparece como un archivo oculto)

### 2. **Sube a través de cPanel File Manager**
   - Abre **File Manager** en cPanel
   - Navega a la carpeta `public_html/interneonvpn/`
   - Sube las carpetas nuevas
   - Sube el archivo `.htaccess` (muy importante para el URL rewriting)

### 3. **Alternativa: Carga por FTP**
   Si usas FTP:
   - Conéctate al servidor con un cliente FTP (FileZilla, WinSCP, etc.)
   - Navega a `/public_html/interneonvpn/`
   - Sube todos los archivos y carpetas

### 4. **Verifica los permisos**
   En cPanel:
   - `.htaccess` debe tener permisos **644**
   - Las carpetas deben tener permisos **755**
   - Los archivos deben tener permisos **644**

### 5. **Prueba los enlaces**
   Una vez subido, intenta acceder desde tu navegador:
   - `tudominio.com/android` (debe cargar sin mostrar .html)
   - `tudominio.com/planes`
   - `tudominio.com/seguridad`

## ⚙️ Qué hace el .htaccess:

```apache
RewriteBase /interneonvpn/
RewriteCond %{REQUEST_FILENAME} !-f  # No reescribir archivos reales
RewriteCond %{REQUEST_FILENAME} !-d  # No reescribir directorios reales
RewriteRule ^([a-zA-Z0-9_-]+)/?$ $1.html [L]  # Reescribir a .html
```

Esto hace que:
- `/android` apunte a `/android.html` (antes)
- Ahora `/android` apunta a `/android/index.html` (después)

## 📊 Beneficios para SEO:

✅ URLs limpias y profesionales
✅ Mejor experiencia de usuario
✅ Google aprecia URLs semánticas
✅ Más fácil de compartir en redes sociales
✅ No afecta negativamente al SEO (mantiene estructura similar)

## 🔄 Si necesitas revertir:

1. Elimina el archivo `.htaccess`
2. Usa los archivos `.html` originales de la carpeta `interneonvpn/`
3. Actualiza los enlaces en los HTML a apuntar a `pagina.html`

## ⚠️ Notas importantes:

- Los archivos `.html` originales en `interneonvpn/` pueden eliminarse (ya están en las subcarpetas)
- Mantén una copia de respaldo en local de todo
- Comprueba que las imágenes, CSS y JS se cargan correctamente
- Si en el navegador ves 404, revisa que el `.htaccess` esté en la carpeta correcta

---

**Estado:** ✅ Listo para subir a cPanel
**Fecha:** 23 de febrero de 2026
**Desarrollador:** Ikushira Dev
