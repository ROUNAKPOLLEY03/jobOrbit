import { getJobs } from "@/api/getJobs";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import JobCard from "@/components/JobCard";
import { BarLoader } from "react-spinners";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { State } from "country-state-city";

export const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: loadJobs,
    data: jobs = [],
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) loadJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-4 py-16 sm:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Jobs For You
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl font-medium opacity-90">
              Discover your next career opportunity from thousands of listings
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="px-4 sm:px-10 lg:px-20 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mb-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="relative flex-1 w-full">
                <Input
                  type="text"
                  placeholder="Search jobs by title, skills, or keywords..."
                  name="search-query"
                  className="h-12 pl-12 pr-4 text-base border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                type="submit"
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Search Jobs
              </Button>
            </form>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-grow w-full">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 rounded-xl hover:bg-white transition-colors duration-200">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => (
                          <SelectItem
                            key={name}
                            value={name}
                            className="rounded-lg"
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company
                  </label>
                  <Select value={company_id} onValueChange={setCompany_id}>
                    <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 rounded-xl hover:bg-white transition-colors duration-200">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        {companies?.map(({ name, id }) => (
                          <SelectItem
                            key={id}
                            value={id}
                            className="rounded-lg"
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 w-full lg:w-auto">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1 lg:flex-none h-11 px-6 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="px-4 sm:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          {loadingJobs && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 text-center">
              <div className="animate-pulse mb-4">
                <div className="h-8 w-48 bg-gradient-to-r from-blue-200 to-slate-200 rounded-lg mx-auto mb-4"></div>
                <p className="text-slate-600">
                  Finding the perfect jobs for you...
                </p>
              </div>
              <BarLoader
                width="100%"
                color="#3b82f6"
                height={4}
                className="rounded-full"
              />
            </div>
          )}

          {loadingJobs === false && (
            <div className="space-y-6">
              {jobs?.length ? (
                <>
                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                    <h2 className="text-lg font-semibold text-slate-800">
                      Found {jobs.length} job{jobs.length !== 1 ? "s" : ""}{" "}
                      matching your criteria
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Updated recently
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <JobCard job={job} savedInit={job?.saved?.length > 0} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-slate-200/50 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      No jobs found
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Try adjusting your search criteria or filters to find more
                      opportunities.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl transition-all duration-300"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
