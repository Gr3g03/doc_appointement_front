import { FC } from "react";
import { Navigate } from "react-router-dom";
import useGetUser from "../main/hooks/useGetUser";
const PrivateRoute: FC<any> = (props: any) => {
  const { children, isPageLogin } = props;
  const userisAuthenticated = useGetUser();
  if (isPageLogin) {
    if (userisAuthenticated?.isDoctor) {
      return userisAuthenticated ? <Navigate to="/dashboard" /> : children;
    }
    else {
      return userisAuthenticated ? <Navigate to="/dashboard-user" /> : children;
    }
  }
  return userisAuthenticated ? children : <Navigate to="/intro" />;
};

export default PrivateRoute;
