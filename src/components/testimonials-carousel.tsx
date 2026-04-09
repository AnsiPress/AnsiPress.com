"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

interface Recommendation {
  text: string;
  name: string;
  role: string;
  linkedin: string;
}

// All recommendations ordered by relevance to AnsiPress value prop
const recommendations: Recommendation[] = [
  {
    text: "Mitesh is a rare blend of infrastructure architect, automation engineer, and security thinker. He designs systems the right way from day one — automated, scalable, and secure by default. His strength lies in turning complex hosting and server operations into simple, reliable workflows. From zero-touch provisioning and large-scale deployments to hardened production environments, he consistently eliminates manual effort and builds platforms that run themselves.",
    name: "Immanuel Raj",
    role: "DevOps Engineer",
    linkedin: "https://www.linkedin.com/in/iamimmanuelraj/",
  },
  {
    text: "Mitesh brings a rare mindset to systems engineering and automation — he believes in solving problems once and solving them so well that they never need to be touched again. His approach scales effortlessly, whether managing one server or hundreds of thousands. He builds infrastructure that makes even 99.99% reliability feel easy. When it comes to real-world engineering, he operates at a level that rivals many senior leaders and CTOs.",
    name: "Akhil",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/akhil255231/",
  },
  {
    text: "Mitesh has been a lifesaver. I was having some server issues due to poor configurations of previous admins. Mitesh stepped in and resolved things without hesitations. I now have great speed and reliability. He's very responsive and I feel safe in his hands. I would definitely recommend Mitesh for your server needs.",
    name: "Chris Nolte",
    role: "CEO, Nolte",
    linkedin: "https://www.linkedin.com/in/chrisnolte2nd/",
  },
  {
    text: "Mitesh is an exceptional Systems Engineer and manager who masters the rare balance of deep technical expertise and impactful mentorship. Mitesh's architectural philosophy is centered on elegant simplicity; he consistently advocates for designs with fewer moving parts, ensuring systems are robust, scalable, and require minimal intervention. Any team would be lucky to have his steady hand and 'keep it simple' mindset.",
    name: "Dipankar Das",
    role: "Systems Engineer",
    linkedin: "https://www.linkedin.com/in/dipankar-das-1324b6206/",
  },
  {
    text: "Mitesh and I have worked together at rtCamp across two overlapping tenures, over four years in total. He has a sharp eye for security. He's the kind of person who proactively goes looking for vulnerabilities, even in internal deployment scripts and tooling that most people never think to audit. He treats infrastructure like it's his own.",
    name: "Gagan Deep Singh",
    role: "Engineer, rtCamp",
    linkedin: "https://www.linkedin.com/in/gagan0123/",
  },
  {
    text: "Mitesh worked mainly on EasyEngine @rtCamp. He single-handedly coded entire EasyEngine in early days. Later on, he built a nice team to handle growth of the project. From hiring, training to mentoring - he managed his team very well. rtCamp is honored to have Mitesh working with us.",
    name: "Rahul Bansal",
    role: "CEO, rtCamp",
    linkedin: "https://www.linkedin.com/in/rahul286/",
  },
  {
    text: "Mitesh is easily one of the best DevOps engineers I've worked with. He's the person you want in your corner when things get complicated. Reliable, sharp, and always willing to jump in and help. Highly recommend!",
    name: "Niraj Giri",
    role: "DevOps Engineer",
    linkedin: "https://www.linkedin.com/in/nirajgirixd/",
  },
  {
    text: "Mitesh is one of the most experienced sysadmins and network engineers I've ever worked with. He is highly passionate about his work and he knows what he is doing really well. He never said no whenever he was contacted regarding anything within his domain and he always came up with an innovative and effective solution.",
    name: "Rupok Chowdhury Protik",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/rupok/",
  },
  {
    text: "I worked with Mitesh for several years in two different stints. His expertise is wide-ranging and he contributed to multiple projects in meaningful ways. He also was always willing to jump in and lend a hand even when not directly his designated task. Mitesh would be a great addition to any Systems or DevOps team.",
    name: "Ronnie Burt",
    role: "Director, WPMUDEV",
    linkedin: "https://www.linkedin.com/in/ronnieburt/",
  },
  {
    text: "I had the privilege of working alongside Mitesh as a fellow DevOps and System Administrator. His exceptional technical expertise and meticulous attention to detail significantly contributed to the success of our projects. Mitesh is an invaluable asset to any team.",
    name: "Jovan Kitanovic",
    role: "DevOps Engineer",
    linkedin: "https://www.linkedin.com/in/jovankitanovic/",
  },
  {
    text: "I've been working with Mitesh for around a year and in that time Mitesh has supported and advised me. He is highly skilled and clearly has a passion for what he does. He is fair, professional, trustworthy and reliable. I will continue to work with Mitesh and am very pleased to have met him.",
    name: "Rob Locke",
    role: "Client",
    linkedin: "https://www.linkedin.com/in/roblockeuk/",
  },
  {
    text: "Mitesh is extremely knowledgable and efficient, not just in Linux, but in how your application relates to Linux. As a contributor to EasyEngine, Mitesh has built many time-saving solutions and understands how best to customize new ones. We love to lean on Mitesh because we know he is dependable and will do a great job.",
    name: "Thomas Bennett",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/thomas-bennett-94765333/",
  },
  {
    text: "Mitesh is one of the best technical Hacker I ever worked with. His high expertise in Networking and Server Management made our jobs easier at Perk and Corona Labs. He was responsible for the Security at Corona Labs and Perk. His high expertise in Network and Security is highly needed for any company.",
    name: "RanjithKumar Matheswaran",
    role: "Engineer, Corona Labs",
    linkedin: "https://www.linkedin.com/in/iranjith4/",
  },
  {
    text: "Mitesh is a very proactive person and very professional and friendly to work with. His skills in Ubuntu, System administration and Nginx is exceptional. He spearheaded one of the prime products at rtCamp called EasyEngine. He is creative and simplistic in his approach to solve problems and focuses on automation.",
    name: "Harsh Malewar",
    role: "Engineer, rtCamp",
    linkedin: "https://www.linkedin.com/in/harshmalewar/",
  },
  {
    text: "Mitesh is good at Shell Scripting and Linux System administration. He is capable of handling the whole team. He developed the EasyEngine-CLI tool to manage WordPress and other PHP hosting and handled all the support and other tasks related to it.",
    name: "Umesh Kumar",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/umeshsingla/",
  },
  {
    text: "Mitesh is a proactive and tireless contributor who would make a great addition to any team. He is a Top Notch Linux System Administrator and server security expert. He makes routine server tasks very easy by automating them with shell script. EasyEngine is best example for his shell scripting.",
    name: "Harshad Yeola",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/harshadyeola/",
  },
  {
    text: "If it's Linux, there is Mitesh. Mitesh has extraordinary skills for system administration. He is a product head and lead developer of the EasyEngine project developed by rtCamp. He is very helpful to the colleagues and one will certainly enjoy and be benefited working with him.",
    name: "Ankit Gade",
    role: "Engineer, rtCamp",
    linkedin: "https://www.linkedin.com/in/ankitgade/",
  },
  {
    text: "Mitesh's shell scripting skills are really great. He has always helped in fixing issues related to servers of large traffic websites. EasyEngine was developed from scratch by Mitesh single handedly and it has made the life of WordPress developers very easy.",
    name: "Chirag Swadia",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/chiragswadia/",
  },
  {
    text: "Mitesh was the most geekish guy in the company. Go to him with any linux based problem and he would solve it in a jiffy. He paved the pioneer code for EasyEngine product for rtCamp.",
    name: "Udit Desai",
    role: "Developer, rtCamp",
    linkedin: "https://www.linkedin.com/in/desaiuditd/",
  },
  {
    text: "I can say Mitesh is a Technical giant and always keeps updating himself with latest technologies. I always like his approach while scrutinizing the issue and providing multiple solutions. He will be a critical piece to any company, especially for startups.",
    name: "Venkat Batchu",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/venkatbatchu/",
  },
  {
    text: "I was in the same team with Mitesh and he's one person I reach out to with tough issues, and he helps with insights and ideas that lead to the solutions. He is a gem to have in a team. Don't take my word for it, check his projects EasyEngine and AnsiPress.",
    name: "Promise Akpan",
    role: "Engineer, WPMUDEV",
    linkedin: "https://www.linkedin.com/in/prhomhyse/",
  },
  {
    text: "Mitesh and I are colleagues for around two years and for a year in the same team. I recognized him as someone very passionate about his ideas and adept at making ideas work. I have even seen him working around 2 AM his time. He is indeed one of the best people to work with.",
    name: "Aditya Shah",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/ethicaladitya/",
  },
  {
    text: "Mitesh showed incredible talent for Server Configuration, Systems Administration and Automation. His comprehension of Linux Systems and Cloud computing makes him a key member. It's a pleasure to work with Mitesh because of his incredibly positive mentality and commitment.",
    name: "Juan Carlos Álvarez Vélez",
    role: "Engineer",
    linkedin: "https://www.linkedin.com/in/vantares/",
  },
  {
    text: "I have been working with Mitesh for almost 2 years now and boy he is amazing at what he does. He is one of the best tech nerds I have known in my entire life. Plus an amazing person by heart.",
    name: "Adnan Safdar",
    role: "Engineer, WPMUDEV",
    linkedin: "https://www.linkedin.com/in/adnan-safdar-26277990/",
  },
  {
    text: "Mitesh Shah was our sysadmin until 2022, and I can't recommend him enough. He kept everything running seamlessly, tackled issues quickly, and was always approachable and reliable. His professionalism and dedication made a lasting impression.",
    name: "David Orozco",
    role: "SEO Specialist",
    linkedin: "https://www.linkedin.com/in/david-orozco-seo/",
  },
];

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Check scroll position for button states
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft >= scrollWidth - clientWidth - 5) {
        // Reset to beginning smoothly
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 380, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Listen for scroll events
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 border-t border-white/10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by{" "}
            <GradientText>Industry Professionals</GradientText>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            What colleagues and clients say about the engineer behind AnsiPress.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm -translate-x-1 md:translate-x-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm translate-x-1 md:translate-x-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                className="shrink-0 w-[340px] snap-start"
              >
                <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex flex-col">
                  <Quote className="w-8 h-8 text-purple-500/40 mb-4 shrink-0" />
                  <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5">
                    &ldquo;{rec.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white font-medium text-sm">{rec.name}</p>
                      <p className="text-zinc-500 text-xs">{rec.role}</p>
                    </div>
                    <a
                      href={rec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      aria-label={`${rec.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          {recommendations.length} recommendations from LinkedIn · Scroll or hover to pause
        </p>
      </div>
    </section>
  );
}
