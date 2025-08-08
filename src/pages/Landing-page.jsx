import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Building,
  Target,
  Zap,
  Globe,
} from "lucide-react";

export const LandingPage = () => {
  const stats = [
    { number: "10K+", label: "Active Jobs", icon: Briefcase },
    { number: "50K+", label: "Job Seekers", icon: Users },
    { number: "5K+", label: "Companies", icon: Building },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description:
        "AI-powered matching that finds opportunities tailored to your skills and preferences.",
    },
    {
      icon: Zap,
      title: "Instant Applications",
      description:
        "Apply to multiple jobs with one click using your optimized profile.",
    },
    {
      icon: Target,
      title: "Perfect Matches",
      description:
        "Get matched with candidates or jobs that align perfectly with your requirements.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connect with opportunities and talent from around the world.",
    },
  ];

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #ddd6fe 30%, #e0e7ff 50%, #f3f4f6 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-20 left-20 w-2 h-2 bg-blue-600/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-32 w-3 h-3 bg-indigo-600/60 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-purple-600/80 rounded-full animate-ping delay-1000"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              Discover. Apply.
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Succeed.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Your gateway to exciting job opportunities and talented
              professionals. Connect with what matters most in your career
              journey.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to={"/jobs"} className="group">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-0">
                <Search className="w-5 h-5 mr-2" />
                Find Jobs
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to={"/post-job"} className="group">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <Briefcase className="w-5 h-5 mr-2" />
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg group-hover:shadow-xl group-hover:bg-white transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Companies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2500,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="flex gap-8 items-center">
                {companies.map(({ name, id, path }) => (
                  <CarouselItem
                    key={id}
                    className="basis-1/2 sm:basis-1/3 lg:basis-1/6 flex justify-center"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-500 group cursor-pointer">
                      <img
                        src={path}
                        alt={name}
                        className="h-12 sm:h-16 object-contain filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Experience the future of job searching and hiring with our
              innovative features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-full">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/80 z-10"></div>
            <img
              src="/banner.jpg"
              alt="Career opportunities"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center p-8">
              <div>
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Ready to Take the Next Step?
                </h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                  Join thousands of professionals who have found their dream
                  careers through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers & Employers */}
      <section className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    For Job Seekers
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 text-gray-700 leading-relaxed text-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Search and apply for jobs effortlessly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Track applications in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Get personalized job recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    For Employers
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 text-gray-700 leading-relaxed text-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Post jobs and reach qualified candidates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Manage applications efficiently</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Find the best candidates for your team</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
            <Accordion type="multiple" className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 px-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger className="text-gray-900 font-semibold hover:text-blue-600 transition-colors duration-300 py-6 text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-6 leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};
