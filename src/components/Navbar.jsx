"use client";

import Link from 'next/link';

function Navbar() {
    return(
        <nav className="flex justify-between bg-gray-950 text-white px-24 items-center">
            <h1 className='text-xl font-bold'>
                NextAuth
            </h1>

            <ul className='flex gap-x-2'>
                <li>
                    <Link href="/">
                    Home
                    </Link>
                </li>
                <li>
                    <Link href="/auth/login">
                    Login
                    </Link>
                </li>
                <li>
                    <Link href="/auth/register">
                    Register
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar