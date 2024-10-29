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
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgDark text-textLight p-4">
            {session?.user?.name ? (
                <h1 className="text-3xl font-bold text-primaryBlue text-center">
                    Bienvenido, {session.user.name}!
                </h1>
            ) : (
                <h1 className="text-3xl font-bold text-primaryBlue text-center">
                    Bienvenido a la aplicación!
                </h1>
            )}
        </div>
    );
}
