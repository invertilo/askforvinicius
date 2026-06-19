/**
 * Honeypot Logger - Sistema de Registro de Intentos de Ataque
 * Monitorea intentos de acceso no autorizado al panel admin
 */

const HoneypotLogger = {
    // Endpoint donde se envían los datos (configurar según sea necesario)
    logEndpoint: 'https://your-security-service.com/api/log',
    
    /**
     * Registra un intento de acceso o modificación
     * @param {Object} attempt - Datos del intento
     */
    logAttempt(attempt) {
        const payload = {
            timestamp: new Date().toISOString(),
            type: attempt.type,
            action: attempt.action,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer,
            currentUrl: window.location.href,
            data: attempt.data,
            // Información adicional de seguridad
            hasLocalStorage: this.checkLocalStorage(),
            hasIndexedDB: this.checkIndexedDB(),
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            plugins: this.getPluginsInfo(),
            webgl: this.getWebGLInfo()
        };

        // Registrar en localStorage como backup
        this.saveToLocalStorage(payload);

        // Intentar enviar a servidor
        this.sendToServer(payload);

        // Registrar en consola con estilo
        this.logToConsole(payload);
    },

    /**
     * Guarda los intentos en localStorage
     */
    saveToLocalStorage(payload) {
        try {
            const attempts = JSON.parse(localStorage.getItem('honeypot_attempts') || '[]');
            attempts.push(payload);
            // Mantener últimos 100 intentos
            localStorage.setItem('honeypot_attempts', JSON.stringify(attempts.slice(-100)));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage:', e);
        }
    },

    /**
     * Envía los datos del ataque a un servidor de logging
     */
    sendToServer(payload) {
        // Usar beacon si está disponible (más confiable)
        if (navigator.sendBeacon) {
            navigator.sendBeacon(this.logEndpoint, JSON.stringify(payload));
        } else {
            // Fallback a fetch
            fetch(this.logEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                keepalive: true // Importante para que complete aunque se cierre la página
            }).catch(e => {
                // Silenciosamente fallar
            });
        }
    },

    /**
     * Registra en consola con formato especial
     */
    logToConsole(payload) {
        console.group('%c🍯 HONEYPOT - INTENTO DETECTADO', 'color: #FF4757; font-weight: bold; font-size: 14px;');
        console.log('%cTipo:', 'color: #FFB000; font-weight: bold;', payload.type);
        console.log('%cAcción:', 'color: #FFB000; font-weight: bold;', payload.action);
        console.log('%cNavegador:', 'color: #FFB000; font-weight: bold;', payload.userAgent);
        console.log('%cTimestamp:', 'color: #FFB000; font-weight: bold;', payload.timestamp);
        console.log('%cDatos Completos:', 'color: #FFB000; font-weight: bold;', payload);
        console.groupEnd();
    },

    /**
     * Verifica si LocalStorage está disponible
     */
    checkLocalStorage() {
        try {
            const test = '__honeypot_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Verifica si IndexedDB está disponible
     */
    checkIndexedDB() {
        return !!window.indexedDB;
    },

    /**
     * Obtiene información de plugins
     */
    getPluginsInfo() {
        try {
            const plugins = [];
            for (let i = 0; i < navigator.plugins.length; i++) {
                plugins.push({
                    name: navigator.plugins[i].name,
                    description: navigator.plugins[i].description
                });
            }
            return plugins;
        } catch (e) {
            return [];
        }
    },

    /**
     * Obtiene información de WebGL
     */
    getWebGLInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                return {
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                };
            }
        } catch (e) {
            return null;
        }
    },

    /**
     * Genera un hash simple para identificar el atacante
     */
    generateFingerprint() {
        const fp = navigator.userAgent + navigator.language + screen.width + screen.height;
        let hash = 0;
        for (let i = 0; i < fp.length; i++) {
            const char = fp.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32bit integer
        }
        return Math.abs(hash).toString(16);
    },

    /**
     * Obtiene todos los intentos registrados
     */
    getAllAttempts() {
        try {
            return JSON.parse(localStorage.getItem('honeypot_attempts') || '[]');
        } catch (e) {
            return [];
        }
    },

    /**
     * Limpia el registro de intentos
     */
    clearAttempts() {
        try {
            localStorage.removeItem('honeypot_attempts');
            console.log('Registro de honeypot limpiado');
        } catch (e) {
            console.error('Error al limpiar registro:', e);
        }
    },

    /**
     * Exporta todos los intentos en formato JSON
     */
    exportAttempts() {
        const attempts = this.getAllAttempts();
        const json = JSON.stringify(attempts, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `honeypot_attempts_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// ============================================================
// INICIALIZACIÓN Y MONITOREO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Registrar que el panel admin fue accedido
    if (window.location.pathname.includes('/admin')) {
        HoneypotLogger.logAttempt({
            type: 'admin_access',
            action: 'Panel admin accedido',
            data: {
                path: window.location.pathname,
                search: window.location.search
            }
        });
    }

    // Monitorear intentos de cambio
    const forms = document.querySelectorAll('.honeypot-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            HoneypotLogger.logAttempt({
                type: 'form_submission',
                action: `Intento de ${form.dataset.type}`,
                data: Object.fromEntries(formData)
            });
        });
    });

    // Log inicial
    console.log('%c🍯 HONEYPOT SYSTEM INITIALIZED', 'color: #FF4757; font-size: 12px; font-weight: bold;');
    console.log('%cTodos los intentos de acceso están siendo monitorados y registrados.', 'color: #FFB000;');
});

// Registrar antes de descargar la página (si hay intentos registrados)
window.addEventListener('beforeunload', () => {
    if (HoneypotLogger.getAllAttempts().length > 0) {
        // Enviar datos antes de cerrar
        if (navigator.sendBeacon) {
            const attempts = HoneypotLogger.getAllAttempts();
            navigator.sendBeacon(HoneypotLogger.logEndpoint, JSON.stringify({
                type: 'final_flush',
                attempts: attempts
            }));
        }
    }
});

// Exportar para uso en consola
window.HoneypotLogger = HoneypotLogger;
