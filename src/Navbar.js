import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [rotate, setRotate] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setRotate(true);
        setTimeout(() => setRotate(false), 1000);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogoHover = () => {
        setRotate(true);
        setTimeout(() => setRotate(false), 1000);
    };

    const navItems = [
        { name: "Home", icon: <FaHome />, path: "/" },
        { name: "Coffee Dashbord", icon: <img src="https://i2.wp.com/mediahipradio.com/wp-content/uploads/2017/08/icon-coffee-white-01.png?ssl=1" className="rounded-full h-7 pb-2" alt="coffee_icon" />, path: "/Coffees" },
        { name: "About", icon: <FaInfoCircle />, path: "/About" },
        { name: "Contact", icon: <FaEnvelope />, path: "/Contact" }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md z-50 p-2">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center h-12">
                        <div className="text-lg font-bold cursor-default transform transition-transform duration-200 hover:scale-110">
                            <img src="https://static.vecteezy.com/system/resources/previews/017/485/092/non_2x/vintage-coffee-logo-template-caffeine-logotype-retro-vintage-insignia-retro-coffee-badge-illustration-free-vector.jpg"
                                className={`rounded-full h-12 transition-transform duration-1000 ${rotate ? 'rotate-360' : ''}`}
                                alt="logo" onMouseEnter={handleLogoHover}
                            />
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-white focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <FaTimes className="h-5 w-5" />
                                ) : (
                                    <FaBars className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <div className={`md:flex ${isMobile && !isOpen ? "hidden" : ""}`}>
                            <ul
                                className={`md:flex md:space-x-4 ${isMobile
                                    ? "absolute top-16 left-0 right-0 bg-gray-800 shadow-md py-2 px-4 space-y-2 transition-all duration-300 ease-in-out " +
                                    (isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full")
                                    : ""
                                    }`}
                            >
                                {navItems.map((item, index) => (
                                    <li key={index} className="py-1 px-2">
                                        <Link
                                            to={item.path}
                                            className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200 text-base"
                                            aria-label={item.name}
                                        >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="row">
                <div className="col m-3">
                    <Outlet />
                </div>
            </div>
            <style jsx>{`
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                .rotate-360 {
                    animation: rotate 1s ease-in-out;
                }
            `}</style>
        </>
    );
};

export default Navbar;