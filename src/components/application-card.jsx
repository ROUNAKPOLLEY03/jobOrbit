//
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplications";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: "bg-blue-100 text-blue-800 border-blue-200",
      interviewing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      hired: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      applied: "📝",
      interviewing: "🎯",
      hired: "🎉",
      rejected: "❌",
    };
    return icons[status] || "📄";
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

      {loadingHiringStatus && (
        <div className="absolute top-1 left-0 right-0 z-10">
          <BarLoader
            width="100%"
            color="#3b82f6"
            height={3}
            className="rounded-full"
          />
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-blue-700 transition-colors duration-300">
              {isCandidate
                ? `${application?.job?.title} at ${application?.job?.company?.name}`
                : application?.name}
            </h3>
            {!isCandidate && (
              <p className="text-sm text-slate-600 mt-1 font-medium">
                Applied for: {application?.job?.title}
              </p>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl h-10 w-10 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/btn"
            title="Download Resume"
          >
            <Download
              size={16}
              className="group-hover/btn:scale-110 transition-transform duration-200"
            />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Candidate Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-colors duration-200">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BriefcaseBusiness size={16} className="text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Experience
              </p>
              <p className="text-sm font-semibold text-slate-800 truncate">
                {application?.experience} years
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-colors duration-200">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <School size={16} className="text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Education
              </p>
              <p
                className="text-sm font-semibold text-slate-800 truncate"
                title={application?.education}
              >
                {application?.education}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:bg-slate-100/80 transition-colors duration-200 md:col-span-1">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Boxes size={16} className="text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Skills
              </p>
              <p
                className="text-sm font-semibold text-slate-800 truncate"
                title={application?.skills}
              >
                {application?.skills}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/60"></div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          <span className="font-medium">
            Applied{" "}
            {new Date(application?.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {isCandidate ? (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm ${getStatusColor(
              application.status
            )}`}
          >
            <span className="text-base">
              {getStatusIcon(application.status)}
            </span>
            <span className="capitalize">{application.status}</span>
          </div>
        ) : (
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-full sm:w-52 h-10 bg-white border-slate-300 rounded-xl hover:border-slate-400 focus:border-blue-500 transition-colors duration-200">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                <SelectItem value="applied" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Applied</span>
                  </div>
                </SelectItem>
                <SelectItem value="interviewing" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>🎯</span>
                    <span>Interviewing</span>
                  </div>
                </SelectItem>
                <SelectItem value="hired" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>🎉</span>
                    <span>Hired</span>
                  </div>
                </SelectItem>
                <SelectItem value="rejected" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>❌</span>
                    <span>Rejected</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
