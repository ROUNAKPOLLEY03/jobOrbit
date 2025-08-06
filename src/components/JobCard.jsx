import { Heart, MapPinIcon, Trash2Icon, Building2, Clock, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { deleteJob, saveJob } from "@/api/getJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="group">
      <Card className="h-full flex flex-col bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden relative">
        {/* Loading Bar */}
        {loadingDeleteJob && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <BarLoader width="100%" color="#3b82f6" height={3} />
          </div>
        )}
        
        {/* Decorative Corner Element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3 flex-1">
              {job.company?.logo_url ? (
                <div className="p-2 bg-white rounded-xl shadow-md border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={job.company.logo_url} 
                    alt={job.company.name}
                    className="h-8 w-8 object-contain" 
                  />
                </div>
              ) : (
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-2 py-1">
                    {job.company?.name || "Company"}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(job.created_at)}
                  </div>
                </div>
              </div>
            </div>
            
            {isMyJob && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteJob}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {job.title}
          </CardTitle>
          
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <div className="p-1 bg-gray-100 rounded-full">
              <MapPinIcon className="h-3 w-3" />
            </div>
            <span className="text-sm font-medium">{job.location}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-6 pb-4">
          <div className="relative">
            <p className="text-gray-700 leading-relaxed text-sm line-clamp-3">
              {job.description.length > 120 
                ? `${job.description.substring(0, 120)}...`
                : job.description
              }
            </p>
            
            {/* Gradient fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Job Type Badge */}
          {job.job_type && (
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-xs">
                {job.job_type}
              </Badge>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-2 flex gap-3">
          <Link to={`/job/${job.id}`} className="flex-1">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                View Details
                <ExternalLink className="w-4 h-4" />
              </span>
            </Button>
          </Link>
          
          {!isMyJob && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleSaveJob}
              disabled={loadingSavedJob}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                saved 
                  ? 'border-red-300 bg-red-50 hover:bg-red-100' 
                  : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-red-300'
              }`}
            >
              {loadingSavedJob ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : saved ? (
                <Heart 
                  className="h-5 w-5 text-red-500 transition-all duration-300 scale-110" 
                  fill="currentColor"
                />
              ) : (
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
              )}
              
              {/* Ripple effect */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                saved ? 'bg-red-200 opacity-20 scale-100' : 'bg-red-200 opacity-0 scale-0'
              }`}></div>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobCard;