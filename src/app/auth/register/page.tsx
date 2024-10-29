"use client";
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function RegisterPage() {
    const { 
        register,
        reset,
        handleSubmit, 
        formState: {errors} 
    } = useForm();
    const router = useRouter()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Cambia entre true y false
    };

    const handleClear = () => {
        reset(); // Limpia todos los valores del formulario
      };

    const onSubmit = handleSubmit(async (data) => {

        if (data.password !== data.confirmPassword) {
            return alert("Password do not match");
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
        ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            router.push("../auth/login")
        }
        console.log(res)
    })

    console.log(errors)



  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className='text-slate-200 font-bold text-4x1 mb-4'>
            Register
        </h1>



        <label htmlFor="username" className='text-slate-500 mb-2 block text-sm'>
            Username:
        </label>
        <input type="text"
            {...register("username", { 
                required: {
                    value: true,
                    message: "Username is required"
                    }
            } )}
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='YourUser1234'
        />
        {
            errors.username && (
                <span className= "text-red-500 text-sm">{String(errors.username.message)}</span>
            )
        }



        <label htmlFor="email" className='text-slate-500 mb-2 block text-sm'>
            Email:
        </label>
        <input type="email"
            {...register("email", {
                required: {
                    value: true,
                    message: "Email is required"
                    }
            } )}
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='user@email.com'
        />
        {
            errors.email && (
                <span className= "text-red-500 text-sm">{String(errors.email.message)}</span>
            )
        }



        <label htmlFor="password" className='text-slate-500 mb-2 block text-sm'>
            Password:
        </label>
        <div className="flex items-center bg-slate-900 rounded mb-2">
            <input 
                type={showPassword ? 'text' : 'password'} // Alterna entre texto y contraseña
                {...register("password", { 
                    required: {
                        value: true,
                        message: "Password is required" 
                    },
                    pattern: {
                        value: passwordRegex,
                        message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
                    }
                })}
                className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                placeholder='********'
            />

            <span
                onClick={togglePasswordVisibility}
                className="p-3 cursor-pointer text-slate-500" // Ajustes de posición y estilo
            >👁️
            </span>
        </div>

        {
            errors.password && (
                <span className= "text-red-500 text-sm">{String(errors.password.message)}</span>
            )
        }



        <label htmlFor="confirmPassword" className='text-slate-500 mb-2 block text-sm'>
            Confirm Password:
        </label>

        <input type="password"
            {...register("confirmPassword", { 
                required: {
                    value: true,
                    message: "Confirm password is required" }
                } )}
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='********'
        />
        {
            errors.confirmPassword && (
                <span className= "text-red-500 text-sm">{String(errors.confirmPassword.message)}</span>
            )
        }


        <div>
            <button className='w-full bg-blue-500 text-white px-30 py-2 rounded-lg mt-2 transition duration-300 transform hover:scale-105'>
            Register
            </button>

            <button type="button" onClick={handleClear} className='w-full bg-blue-500 text-white px-30 py-2 rounded-lg mt-2 transition duration-300 transform hover:scale-105'>
            Limpiar
            </button>
        </div>

      </form>
    </div>
    
  );
}

export default RegisterPage;