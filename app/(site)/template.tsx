"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Rutas que no tendrán el efecto de transición
    const excludedPaths = ["/", "/unete", "/somos", "/historia"];
    const shouldAnimate = !excludedPaths.includes(pathname);

    useLayoutEffect(() => {
        if (!shouldAnimate) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Prepare columns to cover screen at the start
            gsap.set(".transition-col", { scaleY: 1, transformOrigin: "bottom" });

            // Animate columns sliding out
            tl.to(".transition-col", {
                scaleY: 0,
                transformOrigin: "top",
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.inOut",
            });

            // Animate page content popping in
            tl.fromTo(contentRef.current,
                { opacity: 0, scale: 0.97, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

        }, overlayRef);

        return () => ctx.revert();
    }, [pathname, shouldAnimate]);

    if (!shouldAnimate) {
        return <>{children}</>;
    }

    return (
        <div ref={overlayRef}>
            {/* GSAP Staggered Curtains */}
            <div className="transition-overlay">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="transition-col"></div>
                ))}
            </div>
            
            {/* Page Content */}
            <div ref={contentRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
                {children}
            </div>
        </div>
    );
}
