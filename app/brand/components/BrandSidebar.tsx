"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import "../brand.css";

const MENU_TILES = [
  { id: "logo",        label: "Logo",         href: "/brand/logo",             bgColor: "#3A1B4E", textColor: "#FFFFFF", artColor: "#FFFFFF", type: "logo" },
  { id: "voice",       label: "Voice & Tone", href: "/brand/voice",            bgColor: "#FFC100", textColor: "#1A1200", artColor: "#3A1B4E", type: "voice" },
  { id: "framework",   label: "Framework",    href: "/brand",                  bgColor: "#2196F3", textColor: "#FFFFFF", artColor: "#2DC7ED", type: "framework" },
  { id: "typography",  label: "Typography",   href: "/brand/tipografia",       bgColor: "#2EB67D", textColor: "#FFFFFF", artColor: "#FFFFFF", type: "typography" },
  { id: "iconography", label: "Iconography",  href: "/brand/uso",              bgColor: "#C22359", textColor: "#FFFFFF", artColor: "#FFFFFF", type: "iconography" },
  { id: "color",       label: "Color",        href: "/brand/color",            bgColor: "#529CE8", textColor: "#FFFFFF", artColor: "#FFC100", type: "color" },
  { id: "imagery",     label: "Ilustraciones",href: "/brand/ilustraciones",    bgColor: "#EE6352", textColor: "#FFFFFF", artColor: "#FFFFFF", type: "imagery" },
  { id: "submarcas",   label: "Submarcas",    href: "/brand/submarcas",        bgColor: "#9063AD", textColor: "#FFFFFF", artColor: "#ECB0E1", type: "submarcas" },
];

interface BrandSidebarProps {
  defaultOpen?: boolean;
}

export function BrandSidebar({ defaultOpen = false }: BrandSidebarProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [warpClass, setWarpClass] = useState("");

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Swipe to Open (overscroll check)
  useEffect(() => {
    const handleSwipe = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY > totalScroll + 40 && !open) {
        handleOpenMenu();
      }
    };
    window.addEventListener("scroll", handleSwipe);
    return () => window.removeEventListener("scroll", handleSwipe);
  }, [open]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleTileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <aside className="brand-sidebar" aria-label="Sidebar navigation">
        <div className="sidebar-top-section" />

        <button
          ref={buttonRef}
          className="sidebar-btn-menu"
          onClick={open ? handleCloseMenu : handleOpenMenu}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <span className="sidebar-btn-icon">{open ? "✕" : "☰"}</span>
        </button>

        <div className="sidebar-bottom-section" />
      </aside>

      {/* FULLSCREEN MENU */}
      <div
        className={`brand-fullscreen-menu${open ? " open" : ""}`}
        ref={menuRef}
        aria-hidden={!open}
      >
        <div className="menu-header">
          <button
            className="menu-close-btn"
            onClick={handleCloseMenu}
            aria-label="Cerrar menú"
            style={{
              color: "#ffffff",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 0,
              width: 44,
              height: 44,
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            ×
          </button>
        </div>

        <div className="menu-slide-main" style={{ width: "100%", height: "100%" }}>
          <div className="menu-grid">
            {MENU_TILES.map((tile) => (
              <a
                key={tile.id}
                href={tile.href}
                className="menu-tile"
                style={{ background: tile.bgColor, color: tile.textColor }}
                onClick={(e) => handleTileClick(e, tile.href)}
              >
                <div>
                  <div style={{
                    fontSize: "10px",
                    color: tile.textColor === "#FFFFFF" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    fontFamily: "var(--font-ui)",
                    marginBottom: 4,
                  }}>
                    {tile.id}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: tile.textColor,
                  }}>
                    {tile.label}
                  </div>
                </div>

                <div className="tile-hover-art">
                  {tile.type === "framework" && (
                    <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
                      <path className="art-bezier-path" d="M10 50 C 20 10, 40 10, 50 50" stroke={tile.artColor} strokeWidth="3" />
                      <circle cx="10" cy="50" r="3" fill={tile.artColor} />
                      <circle cx="50" cy="50" r="3" fill={tile.artColor} />
                    </svg>
                  )}
                  {tile.type === "voice" && (
                    <>
                      <span className="art-quote art-quote-left" style={{ color: tile.artColor }}>"</span>
                      <span className="art-quote art-quote-right" style={{ color: tile.artColor }}>"</span>
                    </>
                  )}
                  {tile.type === "logo" && (
                    <svg width="36" height="36" viewBox="0 0 40 40" fill={tile.artColor}>
                      <polygon className="art-logo-shape" points="20,5 35,15 20,25 5,15" />
                      <polygon className="art-logo-shape" points="20,35 35,25 20,15 5,25" />
                    </svg>
                  )}
                  {tile.type === "typography" && (
                    <span className="art-type-letter" style={{ color: tile.artColor, fontSize: 40, fontWeight: 700, fontFamily: "var(--font-display)" }}>a</span>
                  )}
                  {tile.type === "color" && (
                    <>
                      <div className="art-circle art-circle-1" style={{ background: "#ffffff" }} />
                      <div className="art-circle art-circle-2" style={{ background: "#FFC100" }} />
                    </>
                  )}
                  {tile.type === "iconography" && (
                    <svg className="art-lock" width="28" height="36" viewBox="0 0 30 40" fill="none" stroke={tile.artColor} strokeWidth="3">
                      <rect className="art-lock-body" x="3" y="18" width="24" height="18" rx="3" />
                      <path d="M7 18V11 A 8 8 0 0 1 23 11V18" />
                    </svg>
                  )}
                  {tile.type === "imagery" && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="14" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                      <circle cx="15" cy="16" r="3" fill="rgba(255,255,255,0.8)" />
                      <path d="M6 30 L14 22 L20 28 L26 21 L34 30" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                  {tile.type === "submarcas" && (
                    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <circle cx="8" cy="14" r="7" fill={tile.artColor} opacity="0.9" />
                      <circle cx="22" cy="14" r="7" fill={tile.artColor} opacity="0.7" />
                      <circle cx="36" cy="14" r="7" fill={tile.artColor} opacity="0.5" />
                    </svg>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
