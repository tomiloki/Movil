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
            className="text-blue-500 underline text-sm mb-4"
          >
            ¿Olvidaste tu contraseña?
          </button>

          {/* Botón de Login */}
          <button className="w-full bg-primaryBlue text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105">
            Login
          </button>

          {/* Botón de Login con Google */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-primaryBlue text-bgDark font-semibold p-3 rounded-lg mt-4 transition duration-300 transform hover:scale-105"
          >
            Continuar con Google
          </button>

        </form>
      </div>
    );
}

export default LoginPage;
