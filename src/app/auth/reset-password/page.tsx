// /pages/index.js
import { SessionProvider, useSession } from 'next-auth/react';

const HomeContent = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {session?.user?.name ? (
                <h1 className="text-2xl font-bold">
                    Bienvenido, {session.user.name}!
                </h1>
            ) : (
                <h1 className="text-2xl font-bold">Bienvenido a la aplicación!</h1>
            )}
        </div>
    );
};

const Home = () => (
    <SessionProvider>
        <HomeContent />
    </SessionProvider>
);

export default Home;
