import { Rocket, Globe, MonitorPlay, Share2, Send } from "lucide-react";

const exploreLinks = [
  { label: "Popular Games", href: "#" },
  { label: "New Releases", href: "#" },
  { label: "Top Developers", href: "#" },
  { label: "Community Picks", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Safety Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-primary/5 bg-primary/5 py-12 px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-black uppercase tracking-tighter">
              GAME<span className="text-primary">PORTAL</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            The world&apos;s leading destination for high-engagement web gaming.
            Play instantly, no downloads required.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
            Newsletter
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Get the latest game updates and news.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} GamePortal. Built for the future of
          web gaming.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <MonitorPlay className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
