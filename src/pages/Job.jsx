import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "@/api/getJobs";

const Job = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isopen = value === "open";
    fnHiringStatus(isopen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/50 text-center max-w-md mx-4">
          <div className="animate-pulse mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Loading Job Details
            </h2>
            <p className="text-slate-600 mb-6">
              Please wait while we fetch the information...
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
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-4 py-16 sm:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col-reverse gap-8 md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                  {job?.title}
                </h1>
                <p className="text-blue-100 text-lg opacity-90">
                  Join our team and make an impact
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <img
                    src={job?.company?.logo_url}
                    className="h-16 sm:h-20 object-contain"
                    alt={job?.company?.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Job Stats Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Location</p>
                  <p className="font-semibold text-slate-800">
                    {job?.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Applicants
                  </p>
                  <p className="font-semibold text-slate-800">
                    {job?.applications?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    job?.isopen ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {job?.isopen ? (
                    <DoorOpen className="w-6 h-6 text-green-600" />
                  ) : (
                    <DoorClosed className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <p
                    className={`font-semibold ${
                      job?.isopen ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {job?.isopen ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recruiter Controls */}
          {job?.recruiter_id === user?.id && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Recruiter Controls
                  </h3>
                  <p className="text-sm text-slate-600">
                    Manage your job posting status
                  </p>
                </div>
              </div>

              <Select
                onValueChange={handleStatusChange}
                defaultValue={job?.isopen ? "open" : "closed"}
              >
                <SelectTrigger
                  className={`h-12 rounded-xl transition-all duration-300 ${
                    job?.isopen
                      ? "bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                      : "bg-red-50 border-red-200 text-red-800 hover:bg-red-100"
                  }`}
                >
                  <SelectValue
                    placeholder={`Hiring Status - ${
                      job?.isopen ? "Open" : "Closed"
                    }`}
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="open" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="w-4 h-4 text-green-600" />
                      <span>Open for Applications</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="closed" className="rounded-lg">
                    <div className="flex items-center gap-2">
                      <DoorClosed className="w-4 h-4 text-red-600" />
                      <span>Closed for Applications</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Job Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                About the Job
              </h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 text-lg leading-relaxed">
                {job?.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                What We're Looking For
              </h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Requirements & Qualifications
                </h3>
              </div>

              <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-blue-500">
                <MDEditor.Markdown
                  source={job?.requirements}
                  className="bg-transparent"
                  style={{
                    backgroundColor: "transparent",
                    color: "inherit",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Apply Section */}
          {job?.recruiter_id !== user?.id && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Join Our Team?
                </h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Take the next step in your career journey and apply now!
                </p>
                <ApplyJobDrawer
                  job={job}
                  user={user}
                  fetchJob={fnJob}
                  applied={job?.applications?.find(
                    (ap) => ap.candidate_id === user.id
                  )}
                />
              </div>
            </div>
          )}

          {/* Loading Status */}
          {loadingHiringStatus && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <div className="text-center">
                <p className="text-slate-600 mb-4">Updating hiring status...</p>
                <BarLoader
                  width="100%"
                  color="#3b82f6"
                  height={4}
                  className="rounded-full"
                />
              </div>
            </div>
          )}

          {/* Applications Section */}
          {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Applications
                  </h2>
                  <p className="text-slate-600">
                    {job?.applications?.length} candidate
                    {job?.applications?.length !== 1 ? "s" : ""} applied
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {job?.applications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
