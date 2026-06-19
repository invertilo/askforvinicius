# 🍯 HONEYPOT SYSTEM - Documentación

## ¿Qué es el Honeypot?

Un honeypot (trampa de miel) es un sistema de seguridad que simula ser un objetivo vulnerable para detectar y registrar intentos de ataque. En este caso, el panel `/admin` aparenta permitir cambios en el sitio web, pero en realidad es una trampa que captura todos los intentos de acceso y modificación.

## 📁 Archivos del Sistema

### 1. **admin.html** - Panel Admin Falso
- Interfaz profesional que parece un panel de administración real
- Formularios que simulan permitir:
  - Cambio de colores del sitio
  - Edición de contenido
  - Reemplazo de HTML (defacement simulado)
  - Inyección de JavaScript
- Mensajes de éxito falsos que engañan al atacante
- Sistema de logs visible que monitorea cambios

### 2. **honeypot-logger.js** - Sistema de Registro
- Captura todos los intentos de acceso y modificación
- Registra información detallada del atacante:
  - User Agent y navegador
  - Resolución de pantalla
  - Idioma y zona horaria
  - Plugins instalados
  - Información WebGL (tarjeta gráfica)
- Almacena datos en localStorage
- Envía información a servidor de seguridad (configurable)

## 🎯 Cómo Funciona

### Flujo de Ataque Capturado:

1. **Acceso inicial** → Se registra la visita al `/admin`
2. **Rellenado de formulario** → Se captura cada dato ingresado
3. **Envío de formulario** → Se ejecuta la trampa
4. **Registro** → Se guardan todos los detalles en múltiples ubicaciones
5. **Falso éxito** → Se muestra mensaje de éxito para mantener al atacante engañado

## 📊 Datos Capturados

El sistema registra:
- **Timestamp**: Cuándo ocurrió el intento
- **Tipo de ataque**: Qué intentó hacer (theme, content, html, script, etc.)
- **User Agent**: Navegador y sistema operativo
- **Resolución pantalla**: `1920x1080`
- **Lenguaje navegador**: `es-ES`, `en-US`, etc.
- **Timezone**: Zona horaria del atacante
- **Plugins**: Flash, Java, etc. instalados
- **WebGL Info**: Información de la tarjeta gráfica
- **Cookies**: Si están habilitadas
- **Datos del formulario**: Exactamente qué intentó inyectar

## 🔐 Características de Seguridad

### Protección Multinivel:

1. **localStorage Backup** - Los datos se guardan localmente como respaldo
2. **Beacon API** - Envía datos incluso si el usuario cierra la pestaña
3. **Console Logging** - Registra en la consola del navegador
4. **Servidor Remoto** - Envía a servidor de seguridad (configurable)
5. **Fingerprinting** - Genera ID único para cada atacante

## 💻 Cómo Usar

### Para Consultar Intentos Capturados:

En la consola del navegador del sitio (F12), ejecuta:

```javascript
// Ver todos los intentos capturados
HoneypotLogger.getAllAttempts()

// Exportar como JSON
HoneypotLogger.exportAttempts()

// Limpiar registro
HoneypotLogger.clearAttempts()

// Ver información del sistema
HoneypotLogger.logAttempt({
    type: 'manual_test',
    action: 'Test manual',
    data: { test: true }
})
```

### Configurar Endpoint de Servidor:

Editar en `honeypot-logger.js`:

```javascript
const HoneypotLogger = {
    logEndpoint: 'https://tu-servidor.com/api/security/log',
    // ... resto del código
}
```

## 🚨 Seguridad Física

El panel está protegido por:

1. **`.htaccess`** - Bloquea acceso directo a archivos sensibles
2. **Archivos de error 403/404** - Intenta redirigir atacantes
3. **Headers de seguridad** - Protege contra XSS, Clickjacking
4. **Caché optimizado** - Los logs no se cachean

## 📈 Información que Verás en los Logs

```
{
  "timestamp": "2024-05-28T00:05:12.000Z",
  "type": "form_submission",
  "action": "Intento de theme",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "platform": "Win32",
  "language": "es-ES",
  "timezone": "America/La_Paz",
  "screenResolution": "1920x1080",
  "referrer": "",
  "currentUrl": "https://example.com/admin",
  "data": {
    "primary_color": "#FF0000",
    "bg_color": "#000000"
  },
  "cookiesEnabled": true,
  "plugins": [...],
  "webgl": {...}
}
```

## ⚠️ Notas Importantes

1. **No es un verdadero panel admin** - Nada se modifica realmente
2. **No ejecuta código** - Todo es simulado y capturado
3. **Privacidad** - Solo usa para detectar intentos de ataque
4. **Legal** - Es una técnica de seguridad legítima y ampliamente usada
5. **Disuasivo** - El atacante creerá que sus cambios fueron aplicados

## 🛡️ Mejores Prácticas

1. **Monitorea regularmente** - Revisa los logs capturados
2. **Configura alertas** - Usa webhook o email para notificaciones
3. **Cambia la URL** - No mantengas el panel en `/admin` públicamente
4. **Agrega autenticación real** - Ten un panel admin real protegido
5. **Documenta intentos** - Guarda evidencia para análisis

## 🎓 Recursos Adicionales

- [OWASP Honeypot](https://owasp.org/)
- [Deception Technology](https://www.gartner.com/)
- [Security Monitoring](https://www.cybersecurity.gov/)

---

**Desarrollado por:** Vinicius Tech Security System
**Última actualización:** Mayo 2024
**Estado:** Activo y Monitoreado 🍯
