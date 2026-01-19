"use client";

import Link from "next/link";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
  LockClosedIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function LandingView() {
  return (
    <div className="min-h-screen bg-brand-cream-50">
      {/* Hero Section - Full viewport jumbotron */}
      <section className="relative px-6 min-h-screen flex flex-col">
        {/* Spacer for fixed header */}
        <div className="h-20" />

        {/* Centered content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight mb-8">
                Your health data.{" "}
                <span className="text-brand-teal-600 font-medium">Owned by you.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-12">
                Track, visualize, and understand your most important health data privately.
                Your data never touches our servers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal-600 text-white rounded-full text-lg font-medium hover:bg-brand-teal-700 transition-colors"
                >
                  Get Your Labs
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/health"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full text-lg font-medium hover:border-gray-400 hover:bg-white transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges - anchored to bottom */}
        <div className="pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <LockClosedIcon className="w-5 h-5" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>HIPAA compliant architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                <span>2,000+ lab locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-white min-h-[600px] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 text-center">
            Simple. Private. <span className="text-brand-teal-600">Powerful.</span>
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Get insights from your health data without compromising your privacy.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-brand-teal-600">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Get your labs</h3>
              <p className="text-gray-600">
                Order labs through Quest or LabCorp, or connect existing results through the secure patient portal API.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-brand-teal-600">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">See your insights</h3>
              <p className="text-gray-600">
                We visualize your data locally on your device. Understand trends, track changes, identify risks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-brand-teal-600">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Share securely</h3>
              <p className="text-gray-600">
                Generate one-time links to share results with your doctor. They see what you see, nothing more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-brand-cream-100 min-h-[600px] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="w-12 h-12 bg-brand-teal-100 rounded-xl flex items-center justify-center mb-6">
                <ChartBarIcon className="w-6 h-6 text-brand-teal-600" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Take Control of Your Health</h3>
              <p className="text-gray-600 mb-6">
                Track your biomarkers over time, understand your data, and make informed decisions about your health journey.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Visualize 100+ biomarkers over time",
                  "AI-powered insights (bring your own key)",
                  "Track biological age and trends",
                  "Share records with one-time secure links",
                  "Connect with Quest, LabCorp, and more",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 text-brand-teal-600 font-medium hover:text-brand-teal-700"
              >
                Start tracking your health
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="px-6 py-20 bg-gray-900 text-white min-h-[600px] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <LockClosedIcon className="w-12 h-12 mx-auto mb-6 text-brand-teal-400" />
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Privacy is not a feature. It&apos;s the architecture.
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Your health data flows directly from the source (Quest, LabCorp, your doctor&apos;s EHR)
            to your device. We provide the visualization layer. We never see, store, or have access
            to your actual health records. Like Telegram, but for your health.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-medium mb-2">Zero-knowledge</h4>
              <p className="text-gray-400 text-sm">
                We can&apos;t read your data. We can&apos;t sell your data. We can&apos;t be subpoenaed for your data.
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-medium mb-2">You own it</h4>
              <p className="text-gray-400 text-sm">
                Export everything. Delete everything. Your data, your rules.
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-medium mb-2">Open standards</h4>
              <p className="text-gray-400 text-sm">
                Built on FHIR APIs mandated by law. Your right to access your own health data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-brand-cream-50 min-h-[600px] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Ready to own your health data?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands who track their health privately. It takes 2 minutes to get started.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-teal-600 text-white rounded-full text-xl font-medium hover:bg-brand-teal-700 transition-colors"
          >
            Get Started Free
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Biophile. Your health, your data.
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
