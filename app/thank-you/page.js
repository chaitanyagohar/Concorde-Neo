'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ThankYouPage() {
    useEffect(() => {
        gsap.fromTo('.thank-you-card', 
            { opacity: 0, y: -50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo('.thank-you-card *', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5 }
        );
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="thank-you-card bg-white p-10 md:p-12 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
                <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
                <p className="text-gray-600 mb-8">
                    Your enquiry has been received. We will get back to you shortly.
                </p>
                <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300 hover:scale-105 inline-block">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
