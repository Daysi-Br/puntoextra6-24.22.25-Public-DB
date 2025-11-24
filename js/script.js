// script.js

// Función para inicializar todas las páginas
function inicializarPagina() {
    console.log('Página multimedia cargada correctamente');
    
    // Agregar el año actual al footer
    actualizarFooter();
    
    // Inicializar canvas si existe en la página
    inicializarCanvas();
    
    // Agregar efectos de hover a elementos de galería
    agregarEfectosHover();
    
    // Inicializar funcionalidades específicas de cada página
    inicializarFuncionalidadesEspecificas();
}

// Actualizar el año en el footer
function actualizarFooter() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const añoActual = new Date().getFullYear();
        footer.innerHTML = `Derechos de autor &copy; Diseñado por Daysi Britos - ${añoActual}`;
    }
}

// Inicializar canvas básico
function inicializarCanvas() {
    const canvas = document.getElementById('miCanvas');
    if (canvas && !canvas.classList.contains('interactivo')) {
        const ctx = canvas.getContext('2d');
        
        // Fondo
        ctx.fillStyle = "#8a2be2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Círculo
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 60, 0, Math.PI * 2);
        ctx.fillStyle = "#ffcc00";
        ctx.fill();
        
        // Texto
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Canvas en acción", canvas.width/2, canvas.height - 20);
    }
}

// Agregar efectos de hover a elementos de galería
function agregarEfectosHover() {
    const elementosGaleria = document.querySelectorAll('.imagen-item, .audio-item, .video-item');
    elementosGaleria.forEach(elemento => {
        elemento.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        elemento.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Funcionalidades específicas para cada página
function inicializarFuncionalidadesEspecificas() {
    const paginaActual = document.body.getAttribute('data-pagina') || 
                        window.location.pathname.split('/').pop().replace('.html', '');
    
    switch(paginaActual) {
        case 'index':
            inicializarPaginaInicio();
            break;
        case 'imagen':
            inicializarPaginaImagen();
            break;
        case 'audio':
            inicializarPaginaAudio();
            break;
        case 'video':
            inicializarPaginaVideo();
            break;
        case 'embebido':
            inicializarPaginaEmbebido();
            break;
        case 'opcional':
            inicializarPaginaOpcional();
            break;
        default:
            inicializarPaginaInicio();
    }
}

// Funcionalidades para la página de inicio
function inicializarPaginaInicio() {
    console.log('Inicializando página de inicio');
    
    // Agregar contador de visitas a elementos
    const elementosGaleria = document.querySelectorAll('.imagen-item');
    elementosGaleria.forEach((elemento, index) => {
        elemento.addEventListener('click', function() {
            console.log(`Clic en elemento de galería ${index + 1}`);
        });
    });
}

// Funcionalidades para la página de imágenes
function inicializarPaginaImagen() {
    console.log('Inicializando página de imágenes');
    
    // Agregar funcionalidad de zoom a imágenes
    const imagenes = document.querySelectorAll('.imagen-item img');
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            this.classList.toggle('zoom');
            console.log('Imagen clickeada: ' + this.alt);
        });
    });
    
    // Contador de descargas
    const botonesDescarga = document.querySelectorAll('.btn-descarga');
    botonesDescarga.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const nombreArchivo = this.getAttribute('download');
            console.log(`Descargando: ${nombreArchivo}`);
            
            // Podríamos agregar aquí analytics o contador real
            mostrarMensaje(`Descargando ${nombreArchivo}...`);
        });
    });
}

// Funcionalidades para la página de audio
function inicializarPaginaAudio() {
    console.log('Inicializando página de audio');
    
    // Control de reproducción de audio
    const elementosAudio = document.querySelectorAll('audio');
    elementosAudio.forEach((audio, index) => {
        audio.addEventListener('play', function() {
            console.log(`Reproduciendo audio ${index + 1}`);
            pausarOtrosAudios(this);
        });
        
        audio.addEventListener('ended', function() {
            console.log(`Audio ${index + 1} finalizado`);
        });
    });
    
    // Contador de descargas de audio
    const botonesDescargaAudio = document.querySelectorAll('.audio-item .btn-descarga');
    botonesDescargaAudio.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreArchivo = this.getAttribute('download');
            console.log(`Descargando audio: ${nombreArchivo}`);
            mostrarMensaje(`Iniciando descarga de ${nombreArchivo}`);
        });
    });
}

// Pausar otros audios cuando uno se reproduce
function pausarOtrosAudios(audioActual) {
    const todosAudios = document.querySelectorAll('audio');
    todosAudios.forEach(audio => {
        if (audio !== audioActual && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// Funcionalidades para la página de video
function inicializarPaginaVideo() {
    console.log('Inicializando página de video');
    
    // Control de reproducción de video
    const elementosVideo = document.querySelectorAll('video');
    elementosVideo.forEach((video, index) => {
        video.addEventListener('play', function() {
            console.log(`Reproduciendo video ${index + 1}`);
        });
        
        video.addEventListener('ended', function() {
            console.log(`Video ${index + 1} finalizado`);
        });
    });
    
    // Contador de descargas de video
    const botonesDescargaVideo = document.querySelectorAll('.video-item .btn-descarga');
    botonesDescargaVideo.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreArchivo = this.getAttribute('download');
            console.log(`Descargando video: ${nombreArchivo}`);
            mostrarMensaje(`Preparando descarga de ${nombreArchivo}`);
        });
    });
}

// Funcionalidades para la página de contenido embebido
function inicializarPaginaEmbebido() {
    console.log('Inicializando página de contenido embebido');
    
    // Verificar si los iframes se cargaron correctamente
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe, index) => {
        iframe.addEventListener('load', function() {
            console.log(`Iframe ${index + 1} cargado correctamente`);
        });
        
        iframe.addEventListener('error', function() {
            console.error(`Error cargando iframe ${index + 1}`);
            this.innerHTML = '<p>Error al cargar el contenido embebido</p>';
        });
    });
}

// Funcionalidades para la página opcional
function inicializarPaginaOpcional() {
    console.log('Inicializando página opcional');
    
    // El canvas interactivo ya está implementado en el HTML
    // Aquí podríamos agregar más funcionalidades si es necesario
    
    // Control para el GIF animado
    const gif = document.querySelector('img[src*="giphy.com"]');
    if (gif) {
        gif.addEventListener('load', function() {
            console.log('GIF animado cargado correctamente');
        });
    }
}

// Función auxiliar para mostrar mensajes al usuario
function mostrarMensaje(mensaje) {
    // Crear elemento de mensaje
    const mensajeElemento = document.createElement('div');
    mensajeElemento.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6a0dad;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    `;
    mensajeElemento.textContent = mensaje;
    
    document.body.appendChild(mensajeElemento);
    
    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeElemento.style.opacity = '0';
        setTimeout(() => {
            if (mensajeElemento.parentNode) {
                mensajeElemento.parentNode.removeChild(mensajeElemento);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos CSS dinámicamente para funcionalidades JS
function agregarEstilosDinamicos() {
    const estilos = `
        .imagen-item img.zoom {
            transform: scale(1.5);
            transition: transform 0.3s ease;
            z-index: 100;
            position: relative;
        }
        
        .audio-item audio:focus, 
        .video-item video:focus {
            outline: 2px solid #6a0dad;
            outline-offset: 2px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = estilos;
    document.head.appendChild(styleSheet);
}

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    agregarEstilosDinamicos();
    inicializarPagina();
});

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Exportar funciones para uso global (si es necesario)
window.MultimediaApp = {
    inicializarPagina,
    mostrarMensaje,
    actualizarFooter
};