import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // npm install lucide-react

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: 'Holiday Packages', to: '/' },
        { label: 'Hotels', to: '/' },
        { label: 'Flights', to: '/' },
        { label: 'Travel Agents', to: '/' },
        { label: 'Blogs', to: '/' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-teal-600">TravelTriangle</Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link, i) => (
                        <Link key={i} to={link.to} className="text-gray-700 hover:text-teal-600 transition">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Buttons */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-600 hover:text-white transition">
                        Login
                    </Link>
                    <Link to="/register" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4">
                    <nav className="flex flex-col space-y-3">
                        {navLinks.map((link, i) => (
                            <Link key={i} to={link.to} className="text-gray-700 hover:text-teal-600">
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/login" className="mt-3 text-teal-600 border border-teal-600 px-4 py-2 rounded text-center">
                            Login
                        </Link>
                        <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded text-center">
                            Register
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
