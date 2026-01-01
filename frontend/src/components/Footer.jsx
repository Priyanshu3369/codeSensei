import { Code2, Github, Linkedin, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-zinc-950 border-t border-zinc-800/50 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-center md:text-left">
              <div className="font-bold text-white">
                Codezy
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Powered by Gemini</span>
              </div>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-8 text-sm">
            <a href="/dashboard" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-200">
              Dashboard
            </a>
            <a href="/submit" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-200">
              Submit
            </a>
            <a href="/reviews" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-200">
              Reviews
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Priyanshu3369"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            </a>

            <a 
              href="https://www.linkedin.com/in/priyanshu-ml/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Codezy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
