"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//=========== LIGHTBOX COMPONENT ===========
const Lightbox = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        router.push("/thank-you");
      } else {
        console.error("Form submission failed");
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <FiX size={24} />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Download Brochure</h2>
          <p className="text-gray-500 mb-6">Discover your perfect property</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name*"
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="phone"
                type="tel"
                placeholder="Phone number*"
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email ID*"
                className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="4"
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-transform duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

//=========== NAVBAR COMPONENT ===========
const Navbar = ({ onDownloadClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#floor-plans", label: "Floor Plans" },
    { href: "#master-plan", label: "Master Plan" },
    { href: "#amenities", label: "Amenities" },
    { href: "#location", label: "Location" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.5, scrollTo: href, ease: "power2.inOut" });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
          <Image
            src="/logo.png"
            alt="Concorde Neo Logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/80 hover:text-blue-500 font-medium transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onDownloadClick}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Download Brochure
          </button>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-700 text-lg hover:text-blue-600 font-medium w-full text-center py-2"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onDownloadClick}
            className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300"
          >
            Download Brochure
          </button>
        </nav>
      </div>
    </header>
  );
};

//=========== HERO COMPONENT ===========
const heroImages = [
  "/aerial-cam.jpg",
  "/elevation-cam-1.jpg",
  "hero-3.jpg",
  "/hero-4.webp",
];

const Hero = ({ onContactClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isClient]);

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-gray-200"
    >
      {heroImages.map((src, index) => {
        const isVisible = index === currentImageIndex;
        const hasLoaded = loadedImages[src];
        return (
          <Image
            key={src}
            src={src}
            alt="Luxury apartment exterior"
            fill
            sizes="100vw"
            className={`object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isVisible && hasLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            onLoad={() => handleImageLoad(src)}
          />
        );
      })}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Welcome to Concorde Neo — Redefining Luxury Living in Thanisandra
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-up">
          Discover thoughtfully designed 2 &amp; 3 BHK homes, 78% open space,
          and 40+ world-class amenities in the heart of North Bengaluru.
        </p>
        <button
          onClick={onContactClick}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-transform duration-300 hover:scale-105 animate-fade-in-up"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

//=========== ABOUT COMPONENT ===========
const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 md:h-[500px]">
          <div
            id="about-img-1"
            className="absolute top-0 left-0 w-2/3 h-2/3 rounded-lg shadow-2xl overflow-hidden"
          >
            <Image
              src="/about1.webp"
              alt="Modern interior living room"
              fill
              className="object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div
            id="about-img-2"
            className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-lg shadow-2xl overflow-hidden border-8 border-white"
          >
            <Image
              src="/about2.jpg"
              alt="Serene balcony view"
              fill
              className="object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <div id="about-text" className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About Concorde Neo, Thanisandra
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            Nestled in the vibrant corridor of North Bengaluru, Concorde Neo is
            a 4.02-acre residential enclave featuring 6 towers with G + 18
            floors and 424 units. Offering 2 & 3 BHK premium apartments ranging
            from 1,125 to 1,539 sq ft, it brings together luxury, connectivity,
            and a thriving community.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            With 78% open spaces, a rooftop Sky Evolve Clubhouse, and over 40
            lifestyle amenities — including pool, gym, landscaped gardens, and
            kids’ play areas — Concorde Neo blends smart-home innovation with
            serene living.
          </p>
          <p className="text-gray-600 text-lg">
            Located on Thanisandra Main Road, it offers quick access to Manyata
            Tech Park, ORR, metro stations, international schools, hospitals,
            and shopping hubs — ensuring your life stays connected yet peaceful.
          </p>
        </div>
      </div>
    </section>
  );
};

//=========== GALLERY COMPONENT ===========

const galleryImages = [
  {
    src: "/Living_Cam.jpg",
    title: "Spacious Living Room",
    description:
      "Open-plan living space with abundant natural light and premium finishes.",
  },
  {
    src: "/Master_Bedroom.jpg",
    title: "Elegant Master Bedroom",
    description:
      "A serene retreat featuring wooden flooring, large windows, and ensuite bath.",
  },
  {
    src: "/Dining_Cam.jpg",
    title: "Modern Modular Kitchen",
    description:
      "Fully equipped kitchen with top-quality fittings and optimal storage space.",
  },
  {
    src: "/balcony-cam.jpg",
    title: "Stunning Balcony Views",
    description:
      "Private balcony with panoramic views of landscaped gardens and skyline.",
  },
  {
    src: "/aerial-cam.jpg",
    title: "Grand Entrance Lobby",
    description:
      "Double-height lobby welcoming residents with elegance and sophistication.",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slide = (direction) => {
    const newIndex =
      (currentIndex + direction + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      slide(1); // Move to the next slide automatically
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="section-title text-4xl font-bold text-white mb-12">
          Explore Our Project Highlights
        </h2>
        <div className="gallery-slider relative w-full max-w-5xl mx-auto h-[60vh] rounded-lg shadow-2xl group overflow-hidden">
          <div className="relative w-full h-full">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col items-center justify-end p-6 text-center space-y-2">
                  <h3 className="text-white text-2xl font-bold">
                    {image.title}
                  </h3>
                  <p className="text-white text-sm md:text-base opacity-90 max-w-xl mx-auto">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Left Arrow */}
          <button
            onClick={() => slide(-1)}
            className="absolute top-1/2 -translate-y-1/2 left-5 z-10 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiChevronLeft size={30} />
          </button>
          {/* Right Arrow */}
          <button
            onClick={() => slide(1)}
            className="absolute top-1/2 -translate-y-1/2 right-5 z-10 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiChevronRight size={30} />
          </button>
        </div>
      </div>
    </section>
  );
};

//=========== FLOOR PLANS COMPONENT ===========
const floorPlanData = [
  { name: "2 BHK", size: "1250 sqft", image: "/2-bhk.jpg" },
  { name: "3 BHK + 2T", size: "1550 sqft", image: "/3-bhk-2t.jpg" },
  { name: "3 BHK + 3T", size: "1750 sqft", image: "/3-bhk.jpg" },
];

const FloorPlanCard = ({ plan, onDownloadClick }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  return (
    <div className="floor-plan-card relative rounded-lg shadow-2xl overflow-hidden group h-80">
      <Image
        src={plan.image}
        alt={`${plan.name} floor plan`}
        fill
        className="object-cover"
      />
      <div
        className={`absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-white transition-all duration-500 ${
          isBlurred ? "backdrop-blur-sm" : "backdrop-blur-none"
        }`}
      >
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-lg mb-6">{plan.size}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsBlurred(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            View Plan
          </button>
          <button
            onClick={onDownloadClick}
            className="bg-white/90 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-white transition-transform duration-300 hover:scale-105"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

const FloorPlans = ({ onDownloadClick }) => {
  return (
    <section
      id="floor-plans"
      className="py-24 relative bg-cover bg-fixed"
      style={{ backgroundImage: "url('/Club_Cam.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="section-title text-4xl font-bold text-white mb-12">
          Choose Your Space
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {floorPlanData.map((plan) => (
            <FloorPlanCard
              key={plan.name}
              plan={plan}
              onDownloadClick={onDownloadClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

//=========== MASTER PLAN COMPONENT ===========
const MasterPlan = () => {
  return (
    <section
      id="master-plan"
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center"
    >
      <Image
        id="masterplan-image"
        src="/master-plan.jpg"
        alt="Project Master Plan"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center">
        <h2 className="section-title text-5xl font-extrabold text-white">
          Master Plan
        </h2>
      </div>
    </section>
  );
};

//=========== AMENITIES COMPONENT ===========
const amenitiesImages = [
  {
    src: "/Club_Cam.jpg",
    title: "Rooftop Club House",
    description:
      "Sky Evolve Clubhouse at 17th & 18th floors offering premium leisure and entertainment facilities.",
  },
  {
    src: "/Pool_Cam.jpg",
    title: "Swimming Pool",
    description:
      "Temperature-controlled pool with kids’ section and lounge deck for relaxation.",
  },
  {
    src: "/gym.webp",
    title: "Modern Gym",
    description:
      "Fully equipped fitness center with cardio, weights, and yoga studio.",
  },
  {
    src: "/yoga.jpg",
    title: "Yoga Room",
    description:
      "Dedicated indoor yoga/meditation room fostering wellness and mindfulness.",
  },
  {
    src: "/kidsplayarea.jpg",
    title: "Kids Play Area",
    description:
      "Safe and vibrant outdoor play zone designed for children of all ages.",
  },
  {
    src: "/garden.jpg",
    title: "Landscaped Gardens",
    description:
      "Beautifully curated green spaces covering 78% of the project area for fresh air and relaxation.",
  },
];

const Amenities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? amenitiesImages.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === amenitiesImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section
      id="amenities"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="section-title text-4xl font-bold text-white mb-12">
          Over 40 Premium Amenities at Your Doorstep
        </h2>
        <div className="amenities-slider relative w-full max-w-4xl mx-auto h-96 rounded-lg shadow-2xl overflow-hidden group">
          <div className="w-full h-full relative">
            {amenitiesImages.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.title}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col items-center justify-end p-6 text-center space-y-2">
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                {amenitiesImages[currentIndex].title}
              </h3>
              <p className="text-white text-sm md:text-base opacity-90 max-w-xl mx-auto">
                {amenitiesImages[currentIndex].description}
              </p>
            </div>
          </div>
          {/* Left Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <FiChevronLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <FiChevronRight onClick={nextSlide} size={30} />
          </div>
        </div>
      </div>
    </section>
  );
};

//=========== LOCATION COMPONENT ===========
const Location = () => {
  const benefits = [
    "5 mins to Tech Park",
    "10 mins to Metro Station",
    "Close to International Schools",
    "Nearby Hospitals & Malls",
  ];

  return (
    <section id="location" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-4xl font-bold text-center text-gray-800 mb-12">
          Prime Connectivity
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="location-map h-96 md:h-[500px] rounded-lg shadow-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0242936536383!2d77.63125277484367!3d13.097646887229436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1962fc00043b%3A0x4d612a6b52e57e47!2sConcorde%20Neo%20-%20Apartments%20in%20Thanisandra!5e0!3m2!1sen!2sin!4v1758773371386!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="location-benefits">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Location Advantages:
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-center text-lg text-gray-600 benefit-item"
                >
                  <FaMapMarkerAlt className="text-blue-600 mr-4" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

//=========== FOOTER COMPONENT ===========
const Footer = () => {
  return (
    <footer className="bg-black text-center py-12 px-6">
      <div className="container mx-auto">
        <p className="text-white text-xs tracking-wider mb-1">
          RERA No. - PRM/KA/RERA/1251/446/PR/210325/007608
        </p>
        <p className="text-white text-xs leading-relaxed max-w-5xl mx-auto">
          All illustrations, videos, and images are the property of Concorde
          Group and are used for representational purposes only. This project is
          marketed by Property Pulse Realty, the official channel partner.
        </p>
      </div>
    </footer>
  );
};

//=========== MAIN PAGE COMPONENT ===========
export default function Home() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLightboxOpen(true);
    }, 3000); // Open after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  useEffect(() => {
    // GSAP Animations Setup
    const ctx = gsap.context(() => {
      // About Section Parallax and Fade-in
      gsap.from("#about-text", {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: { trigger: "#about", start: "top 70%" },
      });
      gsap.to("#about-img-1", {
        y: -60,
        scrollTrigger: { trigger: "#about", scrub: true },
      });
      gsap.to("#about-img-2", {
        y: 60,
        scrollTrigger: { trigger: "#about", scrub: true },
      });

      // Section Titles Fade-in
      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: { trigger: title, start: "top 85%" },
        });
      });

      // Gallery Slider Fade-in
      gsap.from(".gallery-slider", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: { trigger: "#gallery", start: "top 70%" },
      });

      // Floor Plan Cards Staggered Fade-in
      gsap.from(".floor-plan-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: "#floor-plans", start: "top 70%" },
      });

      // Master Plan Parallax Scroll
      gsap.to("#masterplan-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#master-plan",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Amenities Slider Fade-in
      gsap.from(".amenities-slider", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: { trigger: "#amenities", start: "top 70%" },
      });

      // Location Section Fade-in
      gsap.from(".location-map", {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: { trigger: "#location", start: "top 70%" },
      });
      gsap.from(".benefit-item", {
        opacity: 0,
        x: 50,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: { trigger: ".location-benefits", start: "top 80%" },
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main className="bg-white overflow-hidden">
      <Navbar onDownloadClick={() => setIsLightboxOpen(true)} />
      <Hero onContactClick={() => setIsLightboxOpen(true)} />
      <About />
      <Gallery />
      <FloorPlans onDownloadClick={() => setIsLightboxOpen(true)} />
      <MasterPlan />
      <Amenities />
      <Location />
      <Footer />
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </main>
  );
}
