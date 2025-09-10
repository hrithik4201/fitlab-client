import React from "react";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import logo from "../assets/images/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@fitlab.com", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="FitLab Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff2625] to-[#ff4444] bg-clip-text text-transparent">
                FitLab
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-md text-sm">
              Your ultimate fitness companion. Track workouts, discover
              exercises, and achieve your fitness goals.
            </p>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <a
                href="https://hrithikkumar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-700 hover:text-[#ff2625] transition-colors duration-200 underline decoration-transparent hover:decoration-[#ff2625] underline-offset-2"
              >
                Hrithik Kumar
              </a>
            </div>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col items-center md:items-end space-y-4 text-center md:text-right">
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9 p-0 hover:bg-[#ff2625]/10 hover:text-[#ff2625] transition-colors"
                    asChild
                  >
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>

            {/* Version Info */}
            <div className="flex flex-col space-y-1 text-xs text-gray-400">
              <span>Version 1.0.0</span>
              <span>Built with React & Vite</span>
              <span>Powered by ExerciseDB API</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <span className="text-sm text-gray-500">
            © {currentYear} FitLab. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
