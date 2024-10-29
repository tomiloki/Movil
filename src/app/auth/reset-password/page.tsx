// /pages/auth/reset-password.js
import Link from 'next/link';

const ResetPassword = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-slate-300 relative">
            {/* Flecha de regreso */}
            <Link href="/auth/login" className="absolute top-4 left-4 text-slate-300 text-xl">
                    ← Volver
            </Link>

            <h2 className="text-2xl mb-4">Restablecer Contraseña</h2>
            <form className="flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="p-3 rounded bg-slate-900 mb-4 w-full max-w-sm text-slate-300"
                />
                <button 
                    type="button"
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
