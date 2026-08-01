import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const words = [
  "requirement engineering",
  "product strategy",
  "user journey mapping",
  "product analytics",
  "information architecture",
  "customer research",
  "hypothesis validation",
  "acceptance criteria",
  "release planning",
  "business process modelling",
];

function Ticker() {
  return (
    <div className="ticker-mask relative h-[30vh] min-h-[200px] overflow-hidden md:h-[34vh]">
      <div className="ticker-track flex flex-col">
        {[0, 1].map(pass => (
          <div key={pass} className="flex flex-col gap-1 pb-1 md:gap-2 md:pb-2" aria-hidden={pass === 1}>
            {words.map(word => (
              <span
                key={word}
                className="whitespace-nowrap text-right font-sans text-lg font-light lowercase tracking-tight text-accent sm:text-xl md:text-2xl lg:text-3xl"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.3);
  const [userName, setUserName] = useState("");

  const sendGreeting = () => {
    const val = userName.trim();
    if (!val) return;
    const subject = "From Your Portfolio";
    const body = `Hey Kushagra,\nI am ${val}. Looking forward to our conversation.\n\nBest.`;
    window.location.href = `mailto:ua.kushagra@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={ref} className="deck-section justify-between">
      {/* Heading + input on the left, ticker level with them on the right. */}
      {/* Split at xl, not lg: at 1024-1279 the column is too narrow for the
          heading at its full size and it would wrap to six lines. */}
      <div className="deck-inner grid w-full gap-10 xl:grid-cols-2 xl:items-start xl:gap-16">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-8 font-sans text-3xl font-light lowercase tracking-tight text-foreground sm:text-4xl md:mb-12 md:text-6xl lg:text-7xl">
            you&apos;ve made it

            this far
            <br />
            The rest belongs in a <br/>conversation. <br />
          fancy exchanging ideas.
            
          </h2>

          <div className="flex max-w-xl items-center gap-3 border-b border-dashed border-foreground/35 pb-3">
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") sendGreeting();
              }}
              placeholder="your name, to begin..."
              aria-label="Your name"
              className="w-full bg-transparent font-sans text-lg font-light text-foreground outline-none placeholder:text-foreground/40 md:text-2xl"
            />
            <button
              type="button"
              onClick={sendGreeting}
              aria-label="Send greeting"
              className="shrink-0 text-foreground/70 transition-colors hover:text-primary"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Ticker />
        </div>
      </div>

      <div className="deck-inner mt-12 w-full">
        <div className="flex flex-col gap-6 border-t border-foreground/15 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href="mailto:ua.kushagra@gmail.com"
              className="block font-sans text-2xl font-light lowercase tracking-tight text-foreground transition-colors hover:text-primary md:text-4xl"
            >
              ua.kushagra@gmail.com
            </a>
            <a
              href="tel:+919305503667"
              className="block font-sans text-2xl font-light tracking-tight text-foreground/60 transition-colors hover:text-primary md:text-4xl"
            >
              (+91) 93055 03667
            </a>
          </div>
          <div className="md:text-right">
            <a
              href="https://www.linkedin.com/in/ukussh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-2xl font-light lowercase tracking-tight text-foreground transition-colors hover:text-primary md:text-4xl"
            >
              linkedin <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
            </a>
            <br />
            <a
              href="https://github.com/ukussh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-2xl font-light lowercase tracking-tight text-foreground transition-colors hover:text-primary md:text-4xl"
            >
              github <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
            </a>
          </div>
        </div>
        <p className="mt-8 font-mono text-[11px] text-foreground/40">
          © 2026 curiosity-build
        </p>
      </div>
    </section>
  );
}
