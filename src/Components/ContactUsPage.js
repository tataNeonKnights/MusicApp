import React from 'react';
import { useSpring, animated } from 'react-spring';
import Snowfall from 'react-snowfall';

const ContactUsPage = () => {
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 }, // Adjust duration as needed
    });

    return (
        <div className="relative">
            {/* Snowfall Animation */}
            <Snowfall snowflakeCount={50} color="#3498db" />

            <animated.div style={fadeIn} className="bg-green-100 p-8 rounded shadow-md w-full">
                {/* Jumbotron for the Contact Us section */}
                <div className="bg-green-100 body-font z-10 text-black p-8 rounded shadow-ms mb-8">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-2xl mb-4">We'd love to hear from you!</p>
                </div>

                {/* Contact Form */}
                <form action="https://formspree.io/f/mkndnqer" method="POST" className="mb-8">
                    
                    <div className="mb-4">
                        <label htmlFor="name" className="mr-80 block text-sm font-semibold mb-2">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-1/3 p-2 border rounded-md bg-green-30 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="mr-80 block text-sm font-semibold mb-2">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-1/3 p-2 border rounded-md bg-green-30 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="mr-80 block text-sm font-semibold mb-2">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-1/3 p-2 border rounded-md bg-green-30 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md transition duration-300 hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>

                {/* Location Map */}
                <div className="mb-8">
                    <iframe
                        title="Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.7221476618715!2d72.93689027435254!3d22.55207883372388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4fe2ab73314f%3A0xe10aa7f41c90c63b!2sTata%20Strive%20Extension%20Centre%20%2C%20Anand!5e0!3m2!1sen!2sin!4v1704433250152!5m2!1sen!2sin"  style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                        width="100%"
                        height="300"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>

                <div>
                    <p className="text-lg mb-4">Feel free to reach out to us through the contact form or connect with us on social media:</p>
                </div>
            </animated.div>
        </div>
    );
};

export default ContactUsPage;

