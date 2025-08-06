import Header from "@/components/Header";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
  Briefcase,
  MapPin,
  Heart,
} from "lucide-react";

export const Applayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <main className="container mx-auto flex-grow">
        <Header />
        <Outlet />
      </main>

      {/* Modern Footer */}
      <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 mt-16">
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        {/* Main footer content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  jobOrbit
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                Your career journey starts here. We connect talented
                professionals with amazing opportunities, making the job search
                process seamless and rewarding.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:support@joborbit.com"
                    className="hover:underline"
                  >
                    support@joborbit.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+919876543210" className="hover:underline">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Kolkata, West Bengal, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-bold mb-6 text-lg">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/jobs"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/post-job"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Resources */}
            <div>
              <h3 className="text-gray-900 font-bold mb-6 text-lg">
                Connect With Us
              </h3>
              <p className="text-gray-600 mb-4">Follow us for updates:</p>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-2 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors duration-200">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </div>
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-sky-500 hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-2 bg-sky-100 group-hover:bg-sky-200 rounded-lg transition-colors duration-200">
                    <Twitter className="w-4 h-4 text-sky-500" />
                  </div>
                  Twitter
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-700 hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="p-2 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors duration-200">
                    <Facebook className="w-4 h-4 text-blue-700" />
                  </div>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-gray-200/50 border-t border-gray-200">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} jobOrbit. Made By</span>
                <span>Rounak</span>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  to="#"
                  className="hover:text-blue-600 hover:underline transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="#"
                  className="hover:text-blue-600 hover:underline transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  to="#"
                  className="hover:text-blue-600 hover:underline transition-colors duration-200"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
