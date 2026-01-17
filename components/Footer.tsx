import { Linkedin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black/20 border-t border-white/5 py-12 mt-20">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
                <div>
                    <h3 className="text-xl font-bold mb-4">AMEERALI K</h3>
                    <p className="opacity-60 max-w-xs">
                        Creative Graphic Designer & Web Developer crafting digital experiences that matter.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-[var(--primary)]">CONTACT</h4>
                    <div className="space-y-2 opacity-80">
                        <p className="flex items-center gap-2"><Mail size={16} /> ameeralikprm@gmail.com</p>
                        <p className="flex items-center gap-2"><Phone size={16} /> +971 56 242 8556</p>
                        <p className="flex items-center gap-2">Dubai, UAE</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-[var(--primary)]">FOLLOW ME</h4>
                    <div className="space-y-2">
                        <a href="https://linkedin.com/in/ameerali-k-860973163/" target="_blank" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                            <Linkedin size={16} /> LinkedIn
                        </a>
                        <a href="https://behance.net/ameerali19" target="_blank" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                            <ExternalLink size={16} /> Behance
                        </a>
                        <a href="https://fiverr.com/ameerali263" target="_blank" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                            <ExternalLink size={16} /> Fiverr
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/5 mt-10 pt-6 text-center opacity-40 text-xs">
                © {new Date().getFullYear()} Ameerali K. All rights reserved.
            </div>
        </footer>
    );
}
