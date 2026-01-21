"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Si estamos en el home ('/'), no hacemos la animación
        if (pathname === "/") return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Animación de las cortinas
            tl.to(".curtain-col", {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1,
                ease: "power3.inOut",
                stagger: {
                    amount: 0.5,
                },
                onComplete: () => {
                    if (overlayRef.current) {
                        overlayRef.current.style.display = "none";
                    }
                },
            });
        }, overlayRef);

        return () => ctx.revert();
    }, [pathname]);

    // Si es home, solo renderizamos children (sin overlay)
    if (pathname === "/") {
        return <>{children}</>;
    }

    return (
        <>
            <div ref={overlayRef} className="curtain-overlay">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="curtain-col"></div>
                ))}
            </div>
            {children}
        </>
    );
}
