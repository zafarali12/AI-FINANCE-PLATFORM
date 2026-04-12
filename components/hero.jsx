"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 opacity-50" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 ${mounted ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">AI-Powered Finance Management</span>
        </div>

        {/* Main Heading */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold pb-6 ${mounted ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          <span className="gradient-title">
            Manage Your Finances
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            with Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className={`text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights and smart recommendations.
        </p>

        {/* Feature Pills */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${mounted ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Smart Analytics</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-16 ${mounted ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 dark:border-gray-700 dark:hover:bg-gray-800">
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className={`hero-image-wrapper mt-12 ${mounted ? 'animate-scale-in stagger-6' : 'opacity-0'}`}>
          <div ref={imageRef} className="hero-image relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 mx-auto relative z-10 hover:scale-[1.02] transition-transform duration-500"
              priority
            />
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500 rounded-full blur-2xl opacity-50 animate-float" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500 rounded-full blur-2xl opacity-50 animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
