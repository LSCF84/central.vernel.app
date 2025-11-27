import React, { useState, useEffect, useCallback } from 'react';

// Definición de los temas predefinidos en formato RGB (para usar con la función rgb() en CSS)
const THEMES = {
    'indigo': {
        'primary-500': '48 44 233', // Indigo 600
        'primary-600': '67 56 202', // Indigo 700
        'border-color': '79 70 229'  // Indigo 500
    },
    'green': {
        'primary-500': '22 163 74',  // Green 600
        'primary-600': '21 128 61',  // Green 700
        'border-color': '34 197 94'  // Green 500
    },
    'purple': {
        'primary-500': '124 58 237', // Purple 600
        'primary-600': '109 40 217', // Purple 700
        'border-color': '168 85 247' // Purple 500
    }
};

// Componente principal de la aplicación
const App = () => {
    // Estado para el tema de color ('indigo', 'green', 'purple')
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('portfolioTheme') || 'indigo');
    
    // MODIFICACIÓN CLAVE: El modo oscuro ('dark') es ahora el valor predeterminado si no hay preferencia guardada.
    const [colorMode, setColorMode] = useState(localStorage.getItem('colorMode') || 'dark');

    // Función para aplicar las variables CSS del tema
    const applyThemeStyles = useCallback((themeName) => {
        const theme = THEMES[themeName];
        if (theme) {
            const root = document.documentElement;
            root.style.setProperty('--color-primary-500', theme['primary-500']);
            root.style.setProperty('--color-primary-600', theme['primary-600']);
            root.style.setProperty('--color-border-color', theme['border-color']);
            localStorage.setItem('portfolioTheme', themeName);
        }
    }, []);

    // Función para aplicar la clase de modo oscuro
    const applyColorMode = useCallback((mode) => {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('colorMode', mode);
    }, []);

    // Efecto de inicialización: Carga las preferencias guardadas y aplica los estilos al DOM
    useEffect(() => {
        applyThemeStyles(activeTheme);
        applyColorMode(colorMode);
    }, [activeTheme, colorMode, applyThemeStyles, applyColorMode]);


    // Manejador para cambiar el tema de color
    const handleThemeChange = (themeName) => {
        setActiveTheme(themeName);
    };

    // Manejador para alternar el modo oscuro
    const handleToggleDarkMode = () => {
        const newMode = colorMode === 'dark' ? 'light' : 'dark';
        setColorMode(newMode);
    };

    // El SVG de enlace externo (para reutilizar)
    const ExternalLinkIcon = (props) => (
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
    );

    // Definición de los proyectos
    const projects = [
        {
            title: "Portafolio UX/UI (Behance)",
            description: "Mi colección de diseños de interfaz de usuario y experiencia de usuario. Incluye prototipos y estudios de caso.",
            tags: [{ name: "Diseño", bg: "bg-yellow-100", text: "text-yellow-800" }, { name: "Figma", bg: "bg-blue-100", text: "text-blue-800" }, { name: "Prototipos", bg: "bg-pink-100", text: "text-pink-800" }],
            linkText: "Ver Portafolio",
            image: "https://placehold.co/600x400/818cf8/ffffff?text=Previsualizaci%C3%B3n+UX%2FUI"
        },
        {
            title: "Administrador de Tareas (SaaS)",
            description: "Una aplicación web para gestionar proyectos y tareas en tiempo real, con autenticación de usuarios.",
            tags: [{ name: "React", bg: "bg-red-100", text: "text-red-800" }, { name: "Node.js", bg: "bg-indigo-100", text: "text-indigo-800" }, { name: "MongoDB", bg: "bg-green-100", text: "text-green-800" }],
            linkText: "Ver Demo en Vivo",
            image: "https://placehold.co/600x400/34d399/ffffff?text=Demo+SaaS+React"
        },
        {
            title: "Librería de Componentes (GitHub)",
            description: "Un conjunto de componentes reutilizables y accesibles construidos con Vue.js para la comunidad.",
            tags: [{ name: "Vue.js", bg: "bg-lime-100", text: "text-lime-800" }, { name: "Código Abierto", bg: "bg-gray-100", text: "text-gray-800" }, { name: "CSS Utility", bg: "bg-cyan-100", text: "text-cyan-800" }],
            linkText: "Ver Repositorio",
            image: "https://placehold.co/600x400/a78bfa/ffffff?text=Libreria+Vue.js"
        },
        {
            title: "Web Corporativa para Startup",
            description: "Diseño y desarrollo de la página de inicio, servicios y contacto para una nueva empresa de tecnología.",
            tags: [{ name: "HTML/CSS", bg: "bg-teal-100", text: "text-teal-800" }, { name: "Tailwind CSS", bg: "bg-indigo-100", text: "text-indigo-800" }, { name: "JavaScript", bg: "bg-gray-100", text: "text-gray-800" }],
            linkText: "Ir al Sitio Web",
            image: "https://placehold.co/600x400/06b6d4/ffffff?text=Web+Corporativa"
        },
    ];

    return (
        <>
            {/* Estilos CSS (Incluye la lógica de Dark Mode y las variables dinámicas) */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f7f9fb; /* Light Mode */
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                /* Definición de variables CSS para el tema (Inicializado por JS) */
                :root {
                    --color-primary-500: 48 44 233;
                    --color-primary-600: 67 56 202;
                    --color-border-color: 79 70 229;
                }
                .theme-bg-primary { background-color: rgb(var(--color-primary-500) / 1); }
                .theme-hover-bg-primary:hover { background-color: rgb(var(--color-primary-600) / 1); }
                .theme-border-top { border-top-color: rgb(var(--color-border-color) / 1); }
                .theme-text-primary { color: rgb(var(--color-primary-500) / 1); }
                .theme-hover-text-primary:hover { color: rgb(var(--color-primary-600) / 1); }

                /* --- Estilos para el Modo Oscuro (Dark Mode) --- */
                .dark-mode { background-color: #111827; }
                .dark-mode .bg-white { 
                    background-color: #1f2937;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
                }
                /* Ajuste de color de texto */
                .dark-mode .text-gray-900 { color: #f9fafb; }
                .dark-mode .text-gray-600 { color: #d1d5db; }
                .dark-mode .text-gray-500 { color: #9ca3af; }
                .dark-mode .theme-controls-container { background-color: #1f2937; }
                .dark-mode .theme-toggle-button {
                    background-color: #374151;
                    color: #f9fafb;
                }
                `}
            </style>
            
            {/* Contenedor Principal Centrado */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Selector de Tema (Theme Picker) y Modo Oscuro */}
                <div className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg flex space-x-2 transition duration-300 theme-controls-container">
                    <span className="text-sm font-medium text-gray-700 self-center hidden sm:inline">Tema:</span>
                    
                    {/* Botones de Color */}
                    {Object.entries(THEMES).map(([key, theme]) => (
                        <button 
                            key={key}
                            onClick={() => handleThemeChange(key)}
                            className={`w-8 h-8 rounded-full bg-${key}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${key}-600 transition duration-150 ${activeTheme === key ? 'ring-4 ring-offset-2' : ''}`}
                            title={`Tema ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                        ></button>
                    ))}
                    
                    {/* Separador */}
                    <div className="border-l border-gray-300 mx-1"></div>

                    {/* Botón para alternar Modo Oscuro/Claro */}
                    <button 
                        onClick={handleToggleDarkMode}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 theme-toggle-button" 
                        title="Alternar Modo Oscuro"
                    >
                        {/* Icono de Luna (Modo Oscuro) */}
                        <svg className={`w-5 h-5 ${colorMode === 'dark' ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M21.73,15.75A9.43,9.43,0,0,1,16,19.5,9.55,9.55,0,0,1,6.5,10,9.43,9.43,0,0,1,10.25,4.27a.5.5,0,0,0-.49-.24A10,10,0,1,0,22,16.24a.5.5,0,0,0-.27-.49Z"/></svg>
                        {/* Icono de Sol (Modo Claro) */}
                        <svg className={`w-5 h-5 ${colorMode === 'light' ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12,4a1,1,0,0,0-1,1V7a1,1,0,0,0,2,0V5A1,1,0,0,0,12,4Zm7.66,4.66a1,1,0,0,0-.71.29L17.59,9.88a1,1,0,0,0,1.42,1.42l1.34-1.34a1,1,0,0,0,0-1.42A1,1,0,0,0,19.66,8.66ZM12,17a5,5,0,1,0,5,5A5,5,0,0,0,12,17Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,25ZM4.34,9.99a1,1,0,0,0,1.42,0l1.34-1.34a1,1,0,0,0-1.42-1.42L4.34,8.57A1,1,0,0,0,4.34,9.99ZM5,12a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V13A1,1,0,0,0,5,12Zm2,7.34a1,1,0,0,0,1.42,0l1.34-1.34a1,1,0,0,0-1.42-1.42L6,17.59A1,1,0,0,0,7.34,19.34Z"/></svg>
                    </button>
                </div>

                {/* Sección de Encabezado y Presentación (Hero) */}
                <header className="text-center py-16 bg-white rounded-xl shadow-xl mb-12 transition duration-300">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl tracking-tight">
                        Portafolio Único de Proyectos
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Aquí unifico todos mis trabajos y creaciones web. Explora mis proyectos más recientes y accede a mis portafolios específicos.
                    </p>
                    {/* Botón de Llamada a la Acción */}
                    <div className="mt-8">
                        <a href="#proyectos" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-semibold rounded-full shadow-lg text-white theme-bg-primary theme-hover-bg-primary transition duration-300 transform hover:scale-[1.03] active:scale-100">
                            Ver Proyectos Ahora
                        </a>
                    </div>
                </header>

                {/* Sección de Proyectos (Grid) */}
                <section id="proyectos" className="pt-10">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Mis Proyectos Destacados</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projects.map((project, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.03] transition duration-300 border-t-8 theme-border-top border-opacity-70"
                            >
                                {/* Placeholder de Vercel/Imagen de Previsualización */}
                                <div className="h-32 bg-gray-100/50 flex items-center justify-center">
                                    <img 
                                        src={project.image} 
                                        onError={(e) => e.target.src=`https://placehold.co/600x400/818cf8/ffffff?text=Previsualizaci%C3%B3n`} 
                                        alt={`Previsualización de ${project.title}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className={`px-2 py-0.5 ${tag.bg} ${tag.text} rounded-full font-medium`}>
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <a href="#" target="_blank" className="theme-text-primary theme-hover-text-primary font-semibold flex items-center text-sm">
                                        {project.linkText}
                                        <ExternalLinkIcon />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pie de Página */}
                <footer className="mt-20 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 [Tu Nombre]. Todos los derechos reservados. Desarrollado con 💙 y React/Tailwind CSS.</p>
                </footer>

            </div>
        </>
    );
};

export default App;
