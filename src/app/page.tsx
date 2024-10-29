// app/page.js
"use client"; // Marca solo esta página como cliente

import { SessionProvider, useSession } from 'next-auth/react';

export default function Home() {
    return (
        <SessionProvider>
            <HomeContent />
        </SessionProvider>
    );
}

function HomeContent() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {session?.user?.name ? (
                <h1 className="text-2xl font-bold text-white">
                    Bienvenido, {session.user.name}!
                </h1>
            ) : (
                <h1 className="text-2xl text-white font-bold">Bienvenido a la aplicación!</h1>
            )}
        </div>
    );
}
