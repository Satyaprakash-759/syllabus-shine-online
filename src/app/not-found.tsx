"use client";
import React, { useEffect, useRef } from "react";
import Link from 'next/link';
import { Home, Compass, Sparkles } from "lucide-react";
import Layout from "../components/Layout";

const NotFound = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        videoRef.current.volume = 0.5;
        try {
          // Attempt to play with sound
          videoRef.current.muted = false;
          await videoRef.current.play();
        } catch (error) {
          // Fallback to muted if blocked
          console.log("Autoplay with sound blocked. Falling back to muted.");
          if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
          }
        }
      }
    };

    playVideo();

    // Unmute on first interaction anywhere on the document
    const unmute = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
      }
      document.removeEventListener("click", unmute);
    };
    document.addEventListener("click", unmute);

    return () => document.removeEventListener("click", unmute);
  }, []);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 md:py-20 bg-white">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-12 items-center">

          {/* Left Side: Video Content */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/404-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Side: Text Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-cambridge-light text-primary px-4 py-2 rounded-full font-bold text-sm mb-6">
              <Sparkles size={16} />
              <span>404 - Page Not Found</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-navy mb-6 leading-tight">
              Oops! This page <br />
              <span className="text-primary">doesn't exist.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              But don't worry - our <span className="text-primary font-bold underline decoration-cambridge-light underline-offset-4">Cambridge English</span> courses are here to help! Let's get you back on track with quality education.
            </p>

            <div className="flex flex-col gap-4">
              <Link href="/"
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-4 md:px-8 py-4 rounded-full transition-all shadow-xl shadow-primary/30 active:scale-95 text-lg"
              >
                <Home className="w-5 h-5" /> Go Back Home
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/cambridge"
                  className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary font-bold px-6 py-3.5 rounded-full transition-all group"
                >
                  <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" /> Explore Cambridge
                </Link>

                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary font-bold px-6 py-3.5 rounded-full transition-all"
                >
                  <Sparkles className="w-5 h-5" /> Start Free Trial
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default NotFound;


