const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo y descripción */}
            <div>
              <h2 className="text-2xl font-bold text-white">EpicFooter</h2>
              <p className="mt-2 text-sm">
                Diseñando experiencias digitales increíbles. Síguenos en nuestras redes sociales y mantente actualizado.
              </p>
            </div>
            {/* Links rápidos */}
            <div>
              <h3 className="text-lg font-semibold text-white">Enlaces rápidos</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/" className="hover:underline">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:underline">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            {/* Redes sociales */}
            <div>
              <h3 className="text-lg font-semibold text-white">Síguenos</h3>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://twitter.com"
                  className="hover:text-blue-500 transition"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.936 9.936 0 0 1-2.828.775 4.937 4.937 0 0 0 2.165-2.724 9.867 9.867 0 0 1-3.127 1.195A4.917 4.917 0 0 0 16.845 3c-2.737 0-4.952 2.224-4.952 4.964 0 .39.044.765.128 1.125C7.725 8.847 4.1 7.057 1.671 4.149c-.426.733-.666 1.583-.666 2.485 0 1.716.873 3.233 2.2 4.124a4.905 4.905 0 0 1-2.241-.619v.061c0 2.393 1.692 4.387 3.946 4.836a4.946 4.946 0 0 1-2.236.084c.63 1.965 2.449 3.393 4.604 3.432a9.87 9.87 0 0 1-6.096 2.104c-.395 0-.786-.022-1.17-.067a13.94 13.94 0 0 0 7.548 2.213c9.056 0 14.01-7.505 14.01-14.01 0-.213-.005-.426-.014-.636a10.008 10.008 0 0 0 2.46-2.548z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  className="hover:text-blue-700 transition"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12v-9.294H9.293V12H12V9.294c0-2.683 1.641-4.147 4.038-4.147 1.149 0 2.137.086 2.424.124v2.81h-1.662c-1.305 0-1.56.62-1.56 1.53V12h3.122l-.406 2.706H15.24V24h7.435c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
                <a
                    href="https://instagram.com"
                    className="hover:text-pink-500 transition"
                    aria-label="Instagram"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 3.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
                </svg>
                </a>

              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4">
            <p className="text-center text-sm">&copy; 2024 EpicFooter. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;