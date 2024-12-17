"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

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
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role, // Incluye el rol en los datos enviados
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("../auth/login");
    } else {
      alert("Error al registrar el usuario");
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-bgDark text-textLight p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-primaryBlue mb-8 text-center">
          Registro
        </h1>

        {/* Campo de Username */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-textLight mb-2"
          >
            Nombre de usuario:
          </label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "name is required",
              },
            })}
            className="p-3 rounded w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            placeholder="YourUser1234"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {String(errors.name.message)}
            </span>
          )}
        </div>

        {/* Campo de Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-textLight mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            className="p-3 rounded w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            placeholder="user@email.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {String(errors.email.message)}
            </span>
          )}
        </div>

        {/* Campo de Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-textLight mb-2"
          >
            Contraseña:
          </label>
          <div className="flex items-center bg-slate-900 rounded">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value: passwordRegex,
                  message:
                    "Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo.",
                },
              })}
              className="p-3 rounded-l w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              placeholder="********"
            />
            <span
              onClick={togglePasswordVisibility}
              className="p-3 cursor-pointer text-slate-500"
            >
              👁️
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {String(errors.password.message)}
            </span>
          )}
        </div>

        {/* Campo de Confirmar Password */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-textLight mb-2"
          >
            Confirmar contraseña:
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
            })}
            className="p-3 rounded w-full bg-slate-900 text-slate-300 placeholder-grayAccent focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {String(errors.confirmPassword.message)}
            </span>
          )}
        </div>

        {/* Selección de Rol */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-textLight mb-2">
            Tipo de Usuario:
          </label>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="radio"
                value="PASSENGER"
                {...register("role", {
                  required: {
                    value: true,
                    message: "El rol es obligatorio",
                  },
                })}
                defaultChecked
              />
              Pasajero
            </label>
            <label>
              <input
                type="radio"
                value="DRIVER"
                {...register("role", {
                  required: {
                    value: true,
                    message: "El rol es obligatorio",
                  },
                })}
              />
              Conductor
            </label>
          </div>
          {errors.role && (
            <span className="text-red-500 text-sm">
              {String(errors.role.message)}
            </span>
          )}
        </div>

        {/* Botón de Registro */}
        <button className="w-full bg-blue-500 text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105">
          Registrar
        </button>

        {/* Botón de Limpiar */}
        <button
          type="button"
          onClick={handleClear}
          className="w-full bg-blue-500 text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105"
        >
          Limpiar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
