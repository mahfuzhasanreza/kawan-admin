import { Link, NavLink, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/kawanLogoMsg.png';
import { HiMenu, HiX } from 'react-icons/hi';
import Avatar from "../Avatar/Avatar";

const NAV_LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/user-list', label: 'User Management' },
    { to: '/professional-verification', label: 'Professional Verification' },
    { to: '/professional-management', label: 'Professional Management' },
    { to: '/manage-contact', label: 'Contact Messages' },
];

const desktopLinkClass = ({ isActive }) =>
    `whitespace-nowrap font-semibold transition-colors hover:text-yellow-200 ${isActive ? 'text-yellow-300' : ''}`;

const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2 font-medium ${isActive ? 'bg-fuchsia-100 text-fuchsia-700' : 'text-gray-700 hover:bg-gray-100'}`;

const Navbar = () => {
    const location = useLocation();
    const { user, signOutUser, theme } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus when the route changes.
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [location.pathname]);

    // Close the profile menu on outside click or Escape.
    useEffect(() => {
        const handleClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
        };
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                setIsProfileOpen(false);
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    const handleSignOut = () => {
        setIsProfileOpen(false);
        signOutUser();
    };

    return (
        <header
            className={`sticky top-0 z-50 bg-fuchsia-600 text-white shadow-md backdrop-blur-lg transition-colors duration-300 ${isScrolled ? 'bg-opacity-90' : 'bg-opacity-100'}`}
        >
            <Toaster />
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
                {/* Brand */}
                <Link to="/" className="flex shrink-0 items-center gap-3">
                    <img className="h-10 w-10 object-contain lg:h-12 lg:w-12" src={logo} alt="Kawan logo" />
                    <span className="text-xl font-bold tracking-wide">
                        Kawan <span className="font-medium text-yellow-200">Admin</span>
                    </span>
                </Link>

                {/* Desktop links (only useful once signed in) */}
                {user && (
                    <div className="hidden items-center gap-6 xl:flex">
                        {NAV_LINKS.map(({ to, label, end }) => (
                            <NavLink key={to} to={to} end={end} className={desktopLinkClass}>{label}</NavLink>
                        ))}
                    </div>
                )}

                {/* Right side */}
                <div className="flex shrink-0 items-center gap-2 lg:gap-3">
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                onClick={() => setIsProfileOpen((open) => !open)}
                                aria-haspopup="true"
                                aria-expanded={isProfileOpen}
                                aria-label="Open account menu"
                                className={`rounded-full ring-2 transition ${isProfileOpen ? 'ring-yellow-300' : 'ring-white/70 hover:ring-yellow-300'}`}
                            >
                                <Avatar user={user} size={40} />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 rounded-xl bg-white p-2 text-gray-700 shadow-lg">
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <Avatar user={user} size={40} />
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">{user.displayName || 'Administrator'}</p>
                                            <p className="truncate text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="whitespace-nowrap rounded-full border-2 border-yellow-300 bg-yellow-300 px-5 py-1.5 text-sm font-semibold text-gray-800 transition hover:bg-transparent hover:text-yellow-300 lg:px-6 lg:py-2 lg:text-base"
                        >
                            Login
                        </Link>
                    )}

                    {user && (
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            className="rounded-lg p-2 hover:bg-white/10 xl:hidden"
                        >
                            {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile / tablet menu */}
            {user && isMenuOpen && (
                <div className="border-t border-white/20 bg-white shadow-lg xl:hidden">
                    <ul className="mx-auto max-w-7xl space-y-1 px-4 py-3">
                        {NAV_LINKS.map(({ to, label, end }) => (
                            <li key={to}><NavLink to={to} end={end} className={mobileLinkClass}>{label}</NavLink></li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
