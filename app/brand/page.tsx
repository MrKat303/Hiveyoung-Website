"use client";

import React from "react";
import { BrandSidebar } from "./components/BrandSidebar";
import "./brand.css";

export default function BrandHome() {
  return (
    <div className="brand-layout">
      <BrandSidebar defaultOpen />
    </div>
  );
}
