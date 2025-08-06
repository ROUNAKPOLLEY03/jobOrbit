import { getSavedJobs } from "@/api/getJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/50 text-center max-w-md mx-4">
          <div className="animate-pulse mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Loading Your Saved Jobs
            </h2>
            <p className="text-slate-600 mb-6">
              Fetching your favorite opportunities...
            </p>
          </div>
          <BarLoader
            width="100%"
            color="#3b82f6"
            height={4}
            className="rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-4 py-16 sm:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Saved Jobs
            </h1>
            <p className="text-purple-100 text-lg sm:text-xl font-medium opacity-90">
              Your curated collection of dream opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {loadingSavedJobs === false && (
            <>
              {savedJobs?.length ? (
                <>
                  {/* Stats Bar */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800">
                            {savedJobs.length} Saved Job
                            {savedJobs.length !== 1 ? "s" : ""}
                          </h2>
                          <p className="text-slate-600 text-sm">
                            Keep track of opportunities you're interested in
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        All saved jobs
                      </div>
                    </div>
                  </div>

                  {/* Jobs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((saved) => (
                      <div
                        key={saved.id}
                        className="transform transition-all duration-300 hover:scale-[1.02] group"
                      >
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                          <div className="relative">
                            <JobCard
                              job={saved?.job}
                              onJobAction={fnSavedJobs}
                              savedInit={true}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-slate-200/50 text-center max-w-2xl mx-auto">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-full mx-auto flex items-center justify-center relative">
                      <div className="absolute inset-4 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12">
                      <span className="text-sm">✨</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    No Saved Jobs Yet
                  </h3>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    Start building your collection by saving jobs that catch
                    your interest. Click the heart icon on any job listing to
                    add it here.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/jobs"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
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
                      Browse All Jobs
                    </a>
                    <a
                      href="/post-job"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300"
                    >
                      Post a Job
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
