"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:phemmylintry@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold hover:text-gray-600 transition-colors">OA</a>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-gray-600 transition-colors">Home</a>
              <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
              <a href="#experience" className="hover:text-gray-600 transition-colors">Experience</a>
              <a href="#skills" className="hover:text-gray-600 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-gray-600 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-4 text-lg">Hello, I&apos;m</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Oluwafemi
                <br />
                <span className="text-gray-400">Adenuga</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Senior Backend Engineer
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                I architect scalable backend systems with clean architecture principles, 
                focusing on robust API design, system reliability, and performance optimization.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a 
                  href="https://drive.google.com/open?id=1wQLCNf8gg4eVPy60mST0h0y1obYUuzpt&usp=drive_fs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  View Resume
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/profile.jpeg"
                  alt="Oluwafemi Adenuga"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gray-200 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-700 mb-6">
                With over 4 years of experience in backend development, I specialize in building 
                robust, scalable systems using Python, Django, and FastAPI. My expertise spans 
                from developing real-time applications to implementing complex AI solutions.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                I specialize in designing and implementing backend systems with a focus on 
                clean architecture, scalability, and maintainability. I have extensive experience 
                collaborating with ML engineers to deploy LLM systems, build RAG services, 
                and implement embedding retrieval solutions.
              </p>
              <p className="text-lg text-gray-700">
                I&apos;m passionate about clean architecture, API design, and creating systems that 
                make a real impact. When I&apos;m not coding, you&apos;ll find me enjoying classical music 
                or exploring nature trails.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-gray-600">M.Sc. Computer Science (2024-2025)</p>
                <p className="text-gray-600">York St John University, London, United Kingdom</p>
                <p className="text-gray-600 mt-3">B.Sc. Computer Science (2015-2018)</p>
                <p className="text-gray-600">Olabisi Onabanjo University, Ogun State, Nigeria</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <p className="text-gray-600">English, Yoruba</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Work Experience</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-gray-300 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Software Engineer</h3>
                  <p className="text-gray-600">EDI GmbH • Karlsruhe, Germany</p>
                </div>
                <span className="text-gray-500">Feb 2023 - Present</span>
              </div>
            </div>
            
            <div className="border-l-4 border-gray-300 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Software Engineer (Freelance)</h3>
                  <p className="text-gray-600">Logic • Athens, Greece</p>
                </div>
                <span className="text-gray-500">Jul 2022 - Aug 2024</span>
              </div>
            </div>

            <div className="border-l-4 border-gray-300 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Backend Developer</h3>
                  <p className="text-gray-600">GetKeel • Ontario, Canada</p>
                </div>
                <span className="text-gray-500">May 2021 - Jul 2022</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">What I Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">System Design & Architecture</h3>
              <p className="text-gray-600">
                Designing scalable backend systems with clean architecture principles, 
                focusing on maintainability, testability, and performance.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">API Development</h3>
              <p className="text-gray-600">
                Building robust RESTful APIs and real-time systems using Django, FastAPI, 
                and WebSockets with proper authentication and security measures.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Database Optimization</h3>
              <p className="text-gray-600">
                Optimizing database performance with PostgreSQL, implementing efficient 
                caching strategies with Redis, and working with vector databases.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">ML Systems Integration</h3>
              <p className="text-gray-600">
                Collaborating with ML engineers to deploy LLM models, build RAG services, 
                implement semantic search, and develop document embedding and retrieval systems.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">DevOps & CI/CD</h3>
              <p className="text-gray-600">
                Implementing containerized deployments with Docker and Kubernetes, 
                setting up CI/CD pipelines, and managing cloud infrastructure.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Real-time Systems</h3>
              <p className="text-gray-600">
                Building event-driven architectures with Celery and Redis, implementing 
                WebSocket connections, and handling real-time data processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-lg">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Python</li>
                <li>Django / DRF</li>
                <li>FastAPI</li>
                <li>Flask</li>
                <li>Celery</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg">Databases</h3>
              <ul className="space-y-2 text-gray-700">
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>Vector Databases (Milvus)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg">DevOps</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Docker</li>
                <li>Docker Swarm</li>
                <li>Kubernetes</li>
                <li>GitHub Actions</li>
                <li>AWS</li>
                <li>Terraform</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg">Others</h3>
              <ul className="space-y-2 text-gray-700">
                <li>REST APIs</li>
                <li>WebSockets</li>
                <li>CI/CD</li>
                <li>TDD</li>
                <li>Agile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">GitHub Activity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Contribution Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Repositories</span>
                  <span className="font-semibold">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Contributions (2024)</span>
                  <span className="font-semibold">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Languages Used</span>
                  <span className="font-semibold">Python, JavaScript, Go</span>
                </div>
              </div>
              <a 
                href="https://github.com/phemmylintry" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-6 text-black hover:text-gray-600 font-semibold"
              >
                View GitHub Profile →
              </a>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium">🔧 Backend API Development</p>
                  <p className="text-sm text-gray-600">Implementing RESTful endpoints with Django DRF</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="font-medium">🚀 DevOps Automation</p>
                  <p className="text-sm text-gray-600">CI/CD pipelines with GitHub Actions</p>
                </div>
                <div>
                  <p className="font-medium">📊 Database Optimization</p>
                  <p className="text-sm text-gray-600">Query performance improvements in PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-8">
                I&apos;m always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:phemmylintry@gmail.com" className="text-gray-600 hover:text-black">
                    phemmylintry@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Social</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://linkedin.com/in/phemmylintry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://github.com/phemmylintry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Oluwafemi Adenuga. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}