import { useNavigate } from "react-router-dom";

export const useNavigationHelper = () => {
  const navigate = useNavigate();

  const navigateToPage = (pageName: string) => {
    const path =
      pageName === "Home"
        ? "/"
        : `/${pageName.trim().toLowerCase().replace(/\s+/g, "")}`;
        console.log("Navigating to:", path);
    navigate(path);
  };

  return navigateToPage;
};
