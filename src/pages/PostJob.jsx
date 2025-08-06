import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/getJobs";
import AddCompanyDrawer from "@/components/company-drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import {
  MapPin,
  Building2,
  FileText,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isopen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <BarLoader className="mb-4" width={200} color="#3b82f6" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 pb-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 pt-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Post a New Job
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find the perfect candidate for your team. Create a compelling job
              posting that attracts top talent.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/5 rounded-full"></div>
          <div className="absolute top-32 -left-16 w-96 h-96 bg-white/5 rounded-full"></div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative -mt-20 container mx-auto px-4 pb-16">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-800">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Job Details
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Job Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-base font-semibold text-gray-700 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Job Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Frontend Developer"
                  className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  {...register("title")}
                />
                {errors.title && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.title.message}</span>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-base font-semibold text-gray-700"
                >
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  className="min-h-32 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                  {...register("description")}
                />
                {errors.description && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {errors.description.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Location and Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Select job location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {State.getStatesOfCountry("IN").map(({ name }) => (
                              <SelectItem
                                key={name}
                                value={name}
                                className="text-base"
                              >
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.location && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.location.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Company
                  </Label>
                  <div className="flex gap-3">
                    <Controller
                      name="company_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                            <SelectValue placeholder="Select company">
                              {field.value
                                ? companies?.find(
                                    (com) => com.id === Number(field.value)
                                  )?.name
                                : "Select company"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {companies?.map(({ name, id }) => (
                                <SelectItem
                                  key={id}
                                  value={id}
                                  className="text-base"
                                >
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <AddCompanyDrawer fetchCompanies={fnCompanies} />
                  </div>
                  {errors.company_id && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {errors.company_id.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Requirements & Qualifications
                </Label>
                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <Controller
                    name="requirements"
                    control={control}
                    render={({ field }) => (
                      <MDEditor
                        value={field.value}
                        onChange={field.onChange}
                        className="border-0"
                        data-color-mode="light"
                      />
                    )}
                  />
                </div>
                {errors.requirements && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {errors.requirements.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Error Messages */}
              {errorCreateJob?.message && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Error creating job posting
                    </span>
                  </div>
                  <p className="text-red-700 mt-1">{errorCreateJob.message}</p>
                </div>
              )}

              {/* Loading State */}
              {loadingCreateJob && (
                <div className="text-center py-4">
                  <BarLoader width={200} color="#3b82f6" />
                  <p className="text-gray-600 mt-2">
                    Creating your job posting...
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loadingCreateJob}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {loadingCreateJob ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Publishing Job...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Publish Job Posting
                    </div>
                  )}
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm">
                  Your job posting will be reviewed and published within 24
                  hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
