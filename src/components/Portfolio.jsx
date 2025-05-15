import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const navRef = useRef(null);
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const workRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,  // Service ID from .env
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID from .env
                formData,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY   // Public Key from .env
            );
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Email sending error:', error); // ✅ Debugging
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 3000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Custom Icons (same as before)
    const MenuIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const PhoneIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav ref={navRef} className="fixed w-full bg-gray-800 shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-purple-400">Saran Raj</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(
                                        item === 'About' ? aboutRef :
                                            item === 'Skills' ? skillsRef :
                                                item === 'Work' ? workRef :
                                                    contactRef
                                    )}
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-800">
                        <div className="px-2 pt-4 pb-6 space-y-1">
                            {['About', 'Skills', 'Work', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(
                                        item === 'About' ? aboutRef :
                                            item === 'Skills' ? skillsRef :
                                                item === 'Work' ? workRef :
                                                    contactRef
                                    )}
                                    className="block w-full text-left px-3 py-4 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="pt-32 pb-22 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <img
                                src={`${import.meta.env.BASE_URL}/images/saran.jpg`}
                                alt="Profile"
                                className="mx-auto h-40 w-40 rounded-full ring-4 ring-purple-500 ring-offset-4 ring-offset-gray-900 object-cover"
                            />
                        </div>
                        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold">
                            <span className="block text-white">Hello, I'm Saran</span>
                            <span className="block text-purple-400 mt-2">Full Stack Developer</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                            Building beautiful, functional, and scalable web applications with modern technologies.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="py-23 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        About Me
                    </h2>
                    <div className="prose prose-lg mx-auto text-gray-300 max-w-3xl">
                        <p className="text-gray-300 text-center text-lg">
                            I am a B.Tech IT student and Web Developer specializing in MERN Stack development, with focus on creating user-friendly interfaces and dynamic UI rendering. Experienced in React.js, MongoDB, and RESTful API design using Node.js. Passionate about web development and eager to contribute technical skills in a growth-oriented organization.
                        </p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Skills & Technologies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'React', imgPath: `${import.meta.env.BASE_URL}/images/react.svg` },
                            { name: 'Node.js', imgPath: `${import.meta.env.BASE_URL}/images/nodejs.svg` },
                            { name: 'Express.js', imgPath: `${import.meta.env.BASE_URL}/images/expressjs.svg` },
                            { name: 'Java', imgPath: `${import.meta.env.BASE_URL}/images/image.png` },
                            { name: 'MongoDB', imgPath: `${import.meta.env.BASE_URL}/images/mongodb.svg` },
                            { name: 'JavaScript', imgPath: `${import.meta.env.BASE_URL}/images/javascript.svg` },
                            { name: 'Tailwind CSS', imgPath: `${import.meta.env.BASE_URL}/images/tailwindcss.svg` },
                            { name: 'MySQL', imgPath: `${import.meta.env.BASE_URL}/images/img.png` }
                        ].map((skill) => (
                            <div
                                key={skill.name}
                                className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center">
                                    <img itemType='image/svg+xml'
                                        src={skill.imgPath} 
                                        alt={skill.name}
                                        className="w-16 h-16 mb-4 opacity-80 group-hover:opacity-100"
                                    />
                                    <p className="font-medium text-gray-300 group-hover:text-purple-400">{skill.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section ref={workRef} className="py-20 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Recent Work
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'CRUD Application Using MERN Stack',
                                description: 'This is Web application built with Mongo DB, Express JS, Node JS, React JS, Bootstrap. This gives a features of full CURD functionality, Responsive design, User Friendly Interface',
                                coverImage: `${import.meta.env.BASE_URL}/images/crud.png`, // Add your cover image path here
                                link: 'https://todo-frontend-react-js-six.vercel.app/'
                            },
                            {
                                title: 'Project On Movie Review Web Application',
                                description: 'The website is a movie review platform built with HTML, CSS, Bootstrap, and JavaScript, utilizing Java Spring Boot for the backend and MongoDB for the database. Users can submit reviews for movies by entering their name and review text, and they can also watch trailers for the films. The site does not require user authentication, making it easy for anyone to share their thoughts and engage with movie content.',
                                coverImage: `${import.meta.env.BASE_URL}/images/Movie.png`, // Add your cover image path here
                                link: 'https://moviereview-front.vercel.app/'
                            },
                            {
                                title: 'Chat-Bot Application',
                                description: "This is a React-based chat application that uses Google's Gemini Pro AI model to create an interactive chatbot experience. This project demonstrates a practical implementation of AI chat functionality with a focus on user experience and modern web design principles. It's built using React, Axios for API calls, and Tailwind CSS for styling.",
                                coverImage:`${import.meta.env.BASE_URL}/images/ai.png`,// Add your cover image path here
                                link: 'https://gemi-ai-livid.vercel.app/'
                            }
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                <img src={project.coverImage} alt={project.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        className="inline-flex items-center text-purple-400 hover:text-purple-300"
                                    >
                                        View Project
                                        <span className="ml-2">→</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Resume Download Section */}
                    <div className="text-center mt-12">
                        <a
                            href="images\Resume.pdf" // Replace with your resume path
                            download
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                            Download My Resume
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Get In Touch
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-purple-400">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <PhoneIcon />
                                    <span>+91 9025180221</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>saranraj1962006@gmail.com</span>
                                </div>
                            </div>
                            <div className="pt-6">
                                <h3 className="text-xl font-semibold text-purple-400 mb-4">Follow Me</h3>
                                <div className="flex space-x-4">
                                    <a href="https://github.com/Sa-ran-raj" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/saran-raj-635aa0189/" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
                  ${isSubmitting
                                        ? 'bg-purple-700 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submitStatus === 'success' && (
                                <div className="text-green-400 text-sm mt-2">
                                    Message sent successfully!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-400">
                        <p>© {new Date().getFullYear()} Saran Raj. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;