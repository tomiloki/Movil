import Link from 'next/link'
import React from 'react'

function Prelogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgDark text-textLight p-4">

        <div>
            <label htmlFor="username" className="block text-3xl font-bold text-textLight mb-2">
                ¿Usted es pasajero o conductor?
            </label>
        </div>

        <form className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800">

          <Link href="/auth/login">
            <button 
            type="button" 
            className="w-full bg-blue-500 text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105"
            >Pasajero</button>
          </Link>

          <Link href="/auth/login">
            <button 
            type="button" 
            className="w-full bg-blue-500 text-bgDark font-semibold p-3 rounded-lg mt-2 transition duration-300 transform hover:scale-105"
            >Conductor</button>
          </Link>
        </form>
    </div>
  )
}

export default Prelogin;