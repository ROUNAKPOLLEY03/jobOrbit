import { useUser } from "@clerk/clerk-react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  //Check onboarding status
  if (
    user !== undefined &&
    !user?.unsafeMetadata.role &&
    pathname !== "onboarding"
  )
    return <Navigate to="/onboarding" />;
  return children;
};

export default ProtectedRoute;
