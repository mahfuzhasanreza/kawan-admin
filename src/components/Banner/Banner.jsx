import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json';
import bannerBg from '../../assets/banner/bannerBg3.jpg';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const primaryBtn =
    'inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-400';
const secondaryBtn =
    'inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-fuchsia-700';

const Banner = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="relative overflow-hidden shadow-lg">
            {/* Background on its own layer so the 80% opacity doesn't fade the text */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${bannerBg})`,
                }}
            />
            <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 lg:grid-cols-2 lg:px-8 lg:py-16">
                {/* Text */}
                <div className="text-center lg:text-left">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-300 sm:text-sm">
                        Kawan administration
                    </p>

                    <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                        Admin Dashboard
                        <span className="mt-3 block">
                            <span className="inline-block rounded-bl-full rounded-tr-full border-b-4 border-fuchsia-600 bg-yellow-400 px-6 text-fuchsia-900 sm:px-10">
                                Control Center
                            </span>
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg lg:mx-0">
                        Welcome to the Kawan Admin Dashboard, the central hub for managing mental health and
                        self-development support.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                        {user ? (
                            <>
                                <Link to="/professional-verification" className={primaryBtn}>Verify Professionals</Link>
                                <Link to="/user-list" className={secondaryBtn}>Manage Users</Link>
                            </>
                        ) : (
                            <Link to="/login" className={primaryBtn}>Login to continue</Link>
                        )}
                    </div>
                </div>

                {/* Illustration */}
                <div className="mx-auto w-full max-w-sm sm:max-w-md lg:mr-0 lg:max-w-lg lg:justify-self-end xl:-mr-8">
                    <Lottie animationData={bannerLottieData} loop aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

export default Banner;
