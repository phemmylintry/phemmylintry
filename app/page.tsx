"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FDFBF7] text-black px-4 py-6 sm:px-8 sm:py-10 md:px-12 font-sans overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-start w-full max-w-7xl mx-auto z-10 mb-8 sm:mb-12">
        <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden bg-gray-200 border border-gray-900">
          <Image
            src="/profile.jpeg"
            alt="Oluwafemi Adenuga"
            fill
            className="object-cover"
            priority
          />
        </div>

        <nav className="flex gap-6 text-xs sm:text-sm font-medium font-sans text-gray-800">
          <a href="#about" className="hover:text-black hover:underline underline-offset-4 decoration-1 transition-all">about</a>
          <a href="mailto:phemmylintry@gmail.com" className="hover:text-black hover:underline underline-offset-4 decoration-1 transition-all">email</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col justify-start items-start max-w-7xl mx-auto w-full z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium mb-8 tracking-tighter leading-none text-black">
          Oluwafemi Adenuga
        </h1>

        <div id="about" className="space-y-4 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal text-gray-900">
          <p>
            I build scalable backend systems for real-world products, with a focus on reliability, clarity, and long-term sustainability. My work sits at the intersection of engineering, product, and operations.
          </p>

          <p>
            I’m a backend engineer and co-founder with an M.Sc. in Computer Science, and I’ve worked across fintech, logistics, data platforms, and applied AI. My experience centers on designing and operating backend services that handle complex, data-intensive workflows and continue to perform well as products grow in scale and complexity.
          </p>

          <p>
            I co-founded Go4mi, an online grocery delivery platform, where I led technical decisions around system design, transaction and payout workflows, and infrastructure. I’m motivated by challenging problems and opportunities where strong engineering directly improves how products and organizations operate.
          </p>
        </div>

        <div className="mt-8 text-xs font-medium font-sans border-t border-black/10 pt-4 w-full max-w-xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-900">
            <a href="https://drive.google.com/file/d/10wKxH5xyyFGoLe5B0_tjDkPNTz_HEldc/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-2 decoration-1 transition-all">Resume</a>
            <span className="text-gray-300">/</span>
            <a href="https://linkedin.com/in/phemmylintry" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-2 decoration-1 transition-all">LinkedIn</a>
            <span className="text-gray-300">/</span>
            <a href="https://github.com/phemmylintry" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-2 decoration-1 transition-all">GitHub</a>
            <span className="text-gray-300">/</span>
            <a href="https://instagram.com/phemmylin" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-2 decoration-1 transition-all">Instagram</a>
            <span className="text-gray-300">/</span>
            <a href="https://x.com/phemmylintry" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline underline-offset-2 decoration-1 transition-all">X (Twitter)</a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto z-10 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pt-6 border-t border-transparent">
          <div>
            <p className="font-cursive text-base text-gray-900" style={{ fontFamily: "cursive" }}>With ❤️ from Femi</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mt-1">© {new Date().getFullYear()} Oluwafemi Adenuga</p>
          </div>
        </div>
      </footer>
    </div>
  );
}