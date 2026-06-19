# ✡️ Vinicius - Portfolio & Security Honeypot System

Un sitio web portafolio personal de diseño exclusivo y alta gama orientado a tecnología, automatización y consultoría premium, que esconde en su interior un **sistema de engaño y seguridad activa (Honeypot)** para rastrear, perfilar e identificar atacantes.

El sitio simula la marca personal de **Vinicius (Tech Innovator & CEO)** con un diseño premium *dark gold*, integrando animaciones sutiles y secciones de proyectos reales como **Mercav** y consultoría para **Century 21**.

---

## 🍯 El Sistema Honeypot (Decepción Activa)

Detrás de la fachada de portafolio, el sistema cuenta con un panel administrativo simulado (`/admin`) diseñado para actuar como una "trampa de miel" (*honeypot*). Cuando un actor malicioso o escáner automatizado intenta buscar paneles vulnerables, es atraído a esta interfaz.

### Características del Honeypot:
*   **Falso Panel Administrativo (`admin.html`):** Una interfaz de administración muy convincente que aparenta permitir el cambio de colores, edición de contenidos, inyección de código HTML y JavaScript.
*   **Simulación de Éxito:** Devuelve respuestas de éxito falsas para mantener al atacante interactuando con la interfaz simulada mientras se le recolectan datos.
*   **Huella Digital del Navegador (`honeypot-logger.js`):** Registra silenciosamente metadatos técnicos avanzados del intruso, incluyendo:
    *   Información de hardware (GPU a través de WebGL, resolución de pantalla).
    *   Entorno (zona horaria, lenguaje del navegador, plugins instalados).
    *   Comportamiento (datos exactos que intentaron inyectar, cookies, etc.).
*   **Resiliencia de Registro:** Utiliza la **Beacon API** para asegurar el envío de datos al servidor remoto, incluso si el atacante cierra o recarga la pestaña abruptamente.

---

## 📁 Estructura del Proyecto

*   `index.html` - Página de inicio (Portafolio principal con diseño Glassmorphism y Tailwind CSS).
*   `styles.css` - Estilos globales y efectos visuales personalizados.
*   `script.js` - Lógica de interactividad del portafolio (cuenta regresiva, animaciones).
*   `admin.html` - La interfaz señuelo del panel de administración (Honeypot).
*   `honeypot-logger.js` - Módulo de telemetría y captura de huellas digitales (*fingerprinting*).
*   `.htaccess` - Configuración del servidor Apache para restringir el acceso directo a logs, definir cabeceras de seguridad y manejar redirecciones.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, JavaScript (ES6+).
*   **Estilos y Frameworks:** Tailwind CSS (configurado a medida), Google Material Symbols.
*   **Tipografías:** Outfit, Plus Jakarta Sans, JetBrains Mono.
*   **Servidor/Seguridad:** Apache `.htaccess` (Cabeceras de protección XSS, Clickjacking, control de caché).

---

## ⚙️ Configuración del Servidor de Logs

Por defecto, los intentos de intrusión se guardan localmente en el `localStorage` del navegador. Para enviar la información a un servidor de seguridad centralizado, edita el endpoint en [honeypot-logger.js](file:///d:/askforvinicius/honeypot-logger.js):

```javascript
const HoneypotLogger = {
    logEndpoint: 'https://tu-servidor-de-seguridad.com/api/logs',
    // ...
}
