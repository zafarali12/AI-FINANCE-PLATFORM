"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Everything You Need
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Powerful features to help you take control of your financial future
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card 
                  className="p-6 card-hover group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors h-full"
                >
                  <CardContent className="space-y-4 pt-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
              Get started in three simple steps
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="text-center group">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      {step.icon}
                    </div>
                    {index < howItWorksData.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-30" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
              Join thousands of satisfied users managing their finances better
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card 
                  className="p-6 card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors h-full"
                >
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-md opacity-50" />
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full relative z-10 border-2 border-white dark:border-gray-700"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who are already managing their finances
                smarter with Welth. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="px-10 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  <span className="text-sm">No credit card required</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
