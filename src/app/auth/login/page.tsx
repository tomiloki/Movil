"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
    const {
      register, 
      handleSubmit, 
      formState: {errors},
    } = useForm();
    
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev); // Cambia entre true y false
    };

    const onSubmit = handleSubmit(async (data) => {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    });

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bgDark text-textLight p-4">
        <form onSubmit={onSubmit} className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800">
          
          {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-4">{error}</p>
          )}
          
          <h1 className="text-3xl font-bold text-primaryBlue mb-8 text-center">Iniciar sesión</h1>

          {/* Campo de Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-textLight mb-2">
              Email:
            </label>
            <input 
              type="email"
              {...register("email", { 
                required: {
                  value: true,
                  message: "Email is required"
                }
              })}
              className="p-3 rounded w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              placeholder="user@gmail.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{String(errors.email.message)}</span>
            )}
          </div>

          {/* Campo de Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-textLight mb-2">
              Password:
            </label>
            <div className="flex items-center bg-slate-900 rounded">
              <input 
                type={showPassword ? 'text' : 'password'}
                {...register("password", { 
                  required: {
                    value: true,
                    message: "Password is required"
                  }
                })}
                className="p-3 rounded-l w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                placeholder="********"
              />
              <span
                onClick={togglePasswordVisibility}
                className="p-3 cursor-pointer text-slate-500"
              >👁️</span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{String(errors.password.message)}</span>
            )}
          </div>

          {/* Botón de recuperación de contraseña */}
          <button 
            type="button" 
            onClick={() => router.push('/auth/reset-password')}
            className="text-bgDark underline text-sm mb-4"
          >
            ¿Olvidaste tu contraseña?
          </button>

          {/* Botón de Login */}
          <button className="w-full bg-primaryBlue text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105">
            Login
          </button>

          {/* Botón de Login con Google */}
          <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center w-full bg-white text-black font-semibold py-2 rounded-lg mt-2 shadow hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" className="mr-2">
                    <path fill="#4285F4" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l6-6C34.3 3.5 29.4 1 24 1 14.9 1 7.4 6.5 4 14l7.1 5.5C12.9 13.6 17.9 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.9 24.5c0-1.6-.2-3.2-.5-4.7H24v9h13.1c-1.1 5-4.5 8.6-8.6 11.2l7 5.5c5.6-5.1 9.4-12.5 9.4-20.5z"/>
                    <path fill="#FBBC05" d="M10.9 28.5c-1-2.5-1.6-5.2-1.6-8s.6-5.5 1.6-8l-7.1-5.5C2.5 10.6 1 17.1 1 24s1.5 13.4 4.8 18.5l7.1-5.5z"/>
                    <path fill="#EA4335" d="M24 47c6.5 0 11.9-2.2 15.9-5.8l-7-5.5c-2.3 1.6-5.3 2.5-8.9 2.5-6.9 0-12.9-4.7-15-11.1l-7.1 5.5C7.4 41.5 14.9 47 24 47z"/>
                </svg>
                <span>Continuar con Google</span>
            </button>

        </form>
      </div>
    );
}

export default LoginPage;
