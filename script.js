/* -------------------------------------------------------------
   Vinicius | Interactive Scripts
   "Seamless Cinematic Experience" Logic - V2.0.0 (Redesign)
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(6, 6, 7, 0.94)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 1px 0 rgba(212,175,55,0.05)';
        } else {
            header.style.padding = '18px 0';
            header.style.background = 'rgba(6, 6, 7, 0.75)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Scroll Reveal System (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for legacy browsers
        revealElements.forEach(el => {
            el.classList.add('reveal-visible');
        });
    }

    // --- Interactive Live Code Terminal Simulator ---
    const runBtn = document.getElementById('run-terminal-btn');
    const terminalScreen = document.getElementById('terminal-screen');

    const simulationLogs = [
        { text: '\n>> [SYS] Inicializando orquestador de flujos inteligentes de Vinicius...', class: 'text-gold' },
        { text: '>> [INFO] Cargando variables globales en entorno productivo...', class: 'text-gray' },
        { text: '>> [API] Sincronizando con WhatsApp Cloud API... [CONEXIÓN EXITOSA]', class: 'text-light-green' },
        { text: '>> [API] Vinculando con Telegram Webhook Gateway... [CONEXIÓN EXITOSA]', class: 'text-blue' },
        { text: '>> [DB] Prisma ORM estableciendo pool de conexiones con PostgreSQL... [OK]', class: 'text-gray' },
        { text: '>> [SYS] Nodo de digitalización Vinicius escuchando eventos de API... [ACTIVO]', class: 'text-green' },
        { text: '\n[ALERTA - WEBHOOK] Evento de Captación de Clientes en Century 21 Home:', class: 'text-gold' },
        { text: '  - Prospecto: Carlos Mendoza (+591 71234567)', class: 'text-gray' },
        { text: '  - Requerimiento: Tasación e Inversión de Departamento Premium', class: 'text-gray' },
        { text: '>> [SYS] Iniciando automatización para erradicar procesos manuales...', class: 'text-gold' },
        { text: '>> [DB] Creando registro de prospecto de forma automática en PostgreSQL... [OK]', class: 'text-green' },
        { text: '>> [SYS] Ejecutando algoritmo de pre-calificación y enrutamiento inteligente...', class: 'text-gray' },
        { text: '>> [API] Desplegando respuesta interactiva vía WhatsApp API al cliente... [ENTREGADO]', class: 'text-light-green' },
        { text: '   -> "Estimado Carlos, el consultor de Century 21 Home ha recibido sus datos para coordinar la tasación..."', class: 'text-gray' },
        { text: '>> [MAIL] Transmitiendo alerta instantánea a: vipasa.gbc@gmail.com... [ENVIADO]', class: 'text-green' },
        { text: '>> [API] Notificando a Vinicius vía Telegram Bot a su móvil (+591 69613270)... [ENTREGADO]', class: 'text-blue' },
        { text: '   -> "¡Lead Pre-calificado! Carlos Mendoza listo para llamada comercial. Acceda a c21-crm/leads/8892"', class: 'text-gray' },
        { text: '>> [SYS] Tarea manual tediosa digitalizada y optimizada con éxito en 1.15 segundos.', class: 'text-green' },
        { text: '>> [SYS] Orquestación de Hashem activa. Esperando nueva interacción operativa...', class: 'text-gold' }
    ];

    let isRunning = false;

    if (runBtn && terminalScreen) {
        runBtn.addEventListener('click', async () => {
            if (isRunning) return;
            isRunning = true;
            
            // Disable button
            runBtn.disabled = true;
            runBtn.style.opacity = '0.5';
            runBtn.style.cursor = 'not-allowed';
            runBtn.innerHTML = `
                <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 10px; height: 10px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                Orquestando...
            `;

            // Reset screen contents
            terminalScreen.innerHTML = `
                <div class="terminal-line text-gray"># Simulador interactivo de Script de Automatización de Chats (APIs Telegram & WhatsApp)</div>
                <div class="terminal-line text-gray"># Vinicius Tech Studio - v2.0.0</div>
                <div class="terminal-line"><span class="text-gold">import</span> os, time, sys</div>
                <div class="terminal-line"><span class="text-gold">from</span> apis <span class="text-gold">import</span> WhatsAppCloudAPI, TelegramBotAPI</div>
            `;

            // Type logs line-by-line
            for (let i = 0; i < simulationLogs.length; i++) {
                await delay(i === 0 ? 400 : Math.floor(Math.random() * 200) + 100); // Shorter realistic delays
                
                const log = simulationLogs[i];
                const lineDiv = document.createElement('div');
                lineDiv.className = `terminal-line ${log.class || ''}`;
                
                terminalScreen.appendChild(lineDiv);
                await typeText(lineDiv, log.text);
                
                // Keep terminal scrolled to bottom
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }

            // Restore button
            runBtn.disabled = false;
            runBtn.style.opacity = '1';
            runBtn.style.cursor = 'pointer';
            runBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Ejecutar Automatización Demo
            `;
            isRunning = false;
        });
    }

    // Helper utilities
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function typeText(element, text) {
        return new Promise(resolve => {
            let index = 0;
            if (text.length <= 1) {
                element.innerText = text;
                resolve();
                return;
            }
            
            const interval = setInterval(() => {
                element.innerText += text[index];
                index++;
                if (index >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 8); // Slightly faster typing for elite user feel
        });
    }

    // Embed rotation style for loader button
    const spinStyle = document.createElement('style');
    spinStyle.innerHTML = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(spinStyle);
});

// Función para manejar el envío del formulario de contacto hacia WhatsApp
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validar que los campos no estén vacíos
    if (!name || !email || !message) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Crear el mensaje formateado para WhatsApp
    const whatsappMessage = `Hola Vinicius, me llamo ${name}.\n\nEmail: ${email}\n\nMensaje:\n${message}`;
    
    // Número de WhatsApp (reemplazar con el número real de Vinicius)
    // Formato: +país código sin el +, seguido del número
    const whatsappPhone = '59169613270';
    
    // Crear la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Redirigir a WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpiar el formulario
    document.getElementById('contact-form').reset();
}
