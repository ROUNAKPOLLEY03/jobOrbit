import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { useState } from "react";
import { BriefcaseBusiness, Heart } from "lucide-react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  // https://job-orbit-beta.vercel.app/?sign-in=true
  useEffect(() => {
    if (search.get("sign-in")) {
      setshowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section */}
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src="/logo.png"
                alt="jobOrbit Logo"
                className="h-16 sm:h-25 lg:h-30 object-contain"
              />
            </Link>

            <div className="flex items-center">
              {/* Condition: When user is not signed in */}
              <SignedOut>
                <Button
                  onClick={() => setshowSignIn(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </span>
                </Button>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Post Job Button - Only for Recruiters */}
                  {user?.unsafeMetadata?.role === "recruiter" && (
                    <Link to="/post-job">
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-4 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2">
                        <PenBox size={18} className="flex-shrink-0" />
                        <span className="hidden sm:inline">Post a Job</span>
                        <span className="sm:hidden">Post</span>
                      </Button>
                    </Link>
                  )}

                  {/* User Profile Menu */}
                  <div className="relative">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-slate-200 hover:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl",
                          userButtonPopoverCard:
                            "bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-2xl rounded-2xl",
                          userButtonPopoverActions: "space-y-1",
                          userButtonPopoverActionButton:
                            "hover:bg-slate-50 rounded-xl transition-colors duration-200",
                          userButtonPopoverActionButtonText:
                            "font-medium text-slate-700",
                          userButtonPopoverActionButtonIcon: "text-slate-500",
                        },
                      }}
                    >
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="My Jobs"
                          labelIcon={
                            <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BriefcaseBusiness
                                size={12}
                                className="text-blue-600"
                              />
                            </div>
                          }
                          href="/my-jobs"
                        />
                        <UserButton.Link
                          label="Saved Jobs"
                          labelIcon={
                            <div className="w-5 h-5 bg-red-100 rounded-lg flex items-center justify-center">
                              <Heart size={12} className="text-red-600" />
                            </div>
                          }
                          href="/saved-jobs"
                        />
                        <UserButton.Action label="manageAccount" />
                      </UserButton.MenuItems>
                    </UserButton>
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-md w-full">
            {/* Close Button */}
            <button
              onClick={() => {
                setshowSignIn(false);
                setSearch({});
              }}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Sign In Component Container */}
            <div className="">
              <div className="">
                <SignIn
                  signUpForceRedirectUrl="/onboarding"
                  fallbackRedirectUrl="/onboarding"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-0 rounded-xl",
                      headerTitle: "text-slate-800 font-bold text-xl",
                      headerSubtitle: "text-slate-600",
                      socialButtonsBlockButton:
                        "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 rounded-xl transition-colors duration-200",
                      socialButtonsBlockButtonText: "font-medium",
                      dividerLine: "bg-slate-200",
                      dividerText: "text-slate-500 font-medium",
                      formFieldInput:
                        "bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-300",
                      formFieldLabel: "text-slate-700 font-medium",
                      formButtonPrimary:
                        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5",
                      footerActionLink:
                        "text-blue-600 hover:text-blue-700 font-medium",
                      identityPreviewText: "text-slate-600",
                      identityPreviewEditButton:
                        "text-blue-600 hover:text-blue-700",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
