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

    // Definición de los proyectos (ACTUALIZADOS con links y títulos profesionales)
    const projects = [
        {
            title: "LSCF Central (Plataforma Principal)",
            description: "Dashboard centralizado para la gestión de servicios y recursos. Arquitectura modular y escalable.",
            tags: [{ name: "Next.js", bg: "bg-gray-100", text: "text-gray-800" }, { name: "SSR", bg: "bg-blue-100", text: "text-blue-800" }, { name: "API REST", bg: "bg-pink-100", text: "text-pink-800" }],
            linkText: "Acceder a Plataforma",
            link: "https://lscf-central.vercel.app/",
            image: "https://placehold.co/600x400/374151/ffffff?text=LSCF+Central"
        },
        {
            title: "Portfolio WebSteel (Estructuras Metálicas)",
            description: "Sitio web corporativo de alto impacto para una empresa de estructuras metálicas. Foco en branding y galería de proyectos.",
            tags: [{ name: "Web Corporativa", bg: "bg-green-100", text: "text-green-800" }, { name: "Tailwind CSS", bg: "bg-indigo-100", text: "text-indigo-800" }, { name: "SEO Optimizado", bg: "bg-yellow-100", text: "text-yellow-800" }],
            linkText: "Visitar WebSteel",
            link: "https://portfolio-websteel.vercel.app/",
            image: "https://placehold.co/600x400/1f2937/ffffff?text=WebSteel"
        },
        {
            title: "Portfolio Main LSCF (Presentación Ejecutiva)",
            description: "Mi portafolio personal principal, diseñado para una presentación ejecutiva y rápida de mis habilidades y experiencia clave.",
            tags: [{ name: "Portafolio", bg: "bg-purple-100", text: "text-purple-800" }, { name: "Diseño Limpio", bg: "bg-red-100", text: "text-red-800" }, { name: "Single Page App", bg: "bg-cyan-100", text: "text-cyan-800" }],
            linkText: "Ver Portafolio Ejec.",
            link: "https://portfolio-main-lscf.vercel.app/",
            image: "https://placehold.co/600x400/4f46e5/ffffff?text=Portfolio+Main"
        },
        {
            title: "App Demo Next.js (Modern Full-Stack)",
            description: "Demostración de una aplicación full-stack moderna construida con el stack más reciente de Next.js. Incluye autenticación y base de datos simulada.",
            tags: [{ name: "Next.js", bg: "bg-gray-100", text: "text-gray-800" }, { name: "Full-Stack", bg: "bg-orange-100", text: "text-orange-800" }, { name: "Vercel", bg: "bg-teal-100", text: "text-teal-800" }],
            linkText: "Explorar Demo",
            link: "https://portfolio-nextjs-vercel-app.vercel.app/",
            image: "https://placehold.co/600x400/065f46/ffffff?text=NextJS+Demo"
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
                /* Ajustes de tipografía para Modo Oscuro en elementos clave */
                .dark-mode .header-text-dark { color: #f9fafb; }
                .dark-mode .header-text-light { color: #d1d5db; }
                `}
            </style>
            
            {/* Contenedor Principal Centrado */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Selector de Tema (Theme Picker) y Modo Oscuro (MANTENIDO EN SU POSICIÓN) */}
                <div className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg flex space-x-2 transition duration-300 theme-controls-container">
                    <span className="text-sm font-medium text-gray-700 self-center hidden sm:inline">Tema:</span>
                    
                    {/* Botones de Color */}
                    {Object.entries(THEMES).map(([key, theme]) => (
                        <button 
                            key={key}
                            onClick={() => handleThemeChange(key)}
                            className={`w-8 h-8 rounded-full bg-${key}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${key}-600 transition duration-150 ${activeTheme === key ? 'ring-4 ring-offset-2' : ''}`}
                            title={`Tema ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            style={{ backgroundColor: `rgb(${THEMES[key]['primary-500']})` }} // Asegura el color directo en el botón
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

                {/* Sección de Encabezado y Presentación (Hero) - ESTILO MEJORADO */}
                <header className="text-center py-20 bg-white rounded-2xl shadow-2xl mb-16 transition duration-300 border-b-8 theme-border-top border-opacity-70">
                    {/* Placeholder para la imagen de perfil/logo profesional */}
                    <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-light text-gray-600 border-4 border-white dark:border-[#111827] shadow-inner">
                        LSCF
                    </div>

                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl tracking-tight header-text-dark">
                        Hub Central de Proyectos de Desarrollo
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto header-text-light">
                        Esta web actúa como el punto de acceso principal a mi ecosistema de aplicaciones y portafolios. Explora soluciones avanzadas de Next.js, plataformas modulares y sitios web corporativos de alto rendimiento.
                    </p>
                    {/* Botón de Llamada a la Acción */}
                    <div className="mt-10">
                        <a href="#proyectos" className="inline-flex items-center justify-center px-10 py-3.5 border border-transparent text-lg font-semibold rounded-lg shadow-xl text-white theme-bg-primary theme-hover-bg-primary transition duration-300 transform hover:scale-[1.02] active:scale-100 ring-4 ring-transparent hover:ring-white/30">
                            Explorar Soluciones
                        </a>
                    </div>
                </header>

                {/* Sección de Proyectos (Grid) - ESTILO MEJORADO */}
                <section id="proyectos" className="pt-10">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 header-text-dark">Showcase: Proyectos y Plataformas Conectadas</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {projects.map((project, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition duration-300 border-t-4 theme-border-top border-opacity-70 group" // Añade grupo para efectos de hover
                            >
                                {/* Imagen de Previsualización */}
                                <div className="h-40 bg-gray-100/50 flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        onError={(e) => e.target.src=`https://placehold.co/600x400/818cf8/ffffff?text=Previsualizaci%C3%B3n`} 
                                        alt={`Previsualización de ${project.title}`} 
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.05]"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 header-text-dark">{project.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 header-text-light">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className={`px-2.5 py-0.5 ${tag.bg} ${tag.text} rounded-full font-medium shadow-sm`}>
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Enlace al proyecto real */}
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="theme-text-primary theme-hover-text-primary font-semibold flex items-center text-sm mt-3 group-hover:underline">
                                        {project.linkText}
                                        <ExternalLinkIcon />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pie de Página */}
                <footer className="mt-24 text-center text-gray-500 text-sm">
                    <p>2025 LSCF Development Hub. Todos los derechos reservados. Desarrollado con 💙 y tecnología React, Next.js y Tailwind CSS.</p>
                </footer>

            </div>
        </>
    );
};

export default App;
