"use client";
import React from "react";
import Link from 'next/link';

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "light" | "dark";
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
    className = "",
    size = "md",
    variant = "dark",
    showText = true
}) => {
    const sizeMap = {
        sm: { icon: "w-8 h-8", text: "text-lg", subtext: "text-[8px]" },
        md: { icon: "w-10 h-10", text: "text-xl", subtext: "text-[10px]" },
        lg: { icon: "w-14 h-14", text: "text-3xl", subtext: "text-xs" },
    };

    const colors = {
        light: {
            text: "text-white",
            subtext: "text-emerald-200",
            iconBg: "from-emerald-500 to-emerald-700",
            monogram: "fill-white"
        },
        dark: {
            text: "text-gray-900",
            subtext: "text-emerald-600",
            iconBg: "from-[#040812] to-[#0D1B2A]",
            monogram: "fill-white"
        }
    };

    const currentSize = sizeMap[size];
    const currentColors = colors[variant];

    return (
        <Link href="/" className={`flex items-center group ${className}`}>
            <img 
                src="/logo.png" 
                alt="Ivy Bridge Logo" 
                className={`${size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-12'} w-auto object-contain transition-transform group-hover:scale-105 duration-500`}
            />
        </Link>
    );
};

export default Logo;



