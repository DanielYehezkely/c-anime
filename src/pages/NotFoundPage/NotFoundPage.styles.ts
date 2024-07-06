export const containerStyles = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f9fa",
};

export const contentContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  padding: "0 0 2rem 3rem",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "1000px",
  height: "50rem",
  position: "relative" as const,
};

export const imageBoxStyles = {
  position: "absolute" as const,
  top: 0,
  right: -100,
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
};

export const errorCodeStyles = {
  fontSize: "96px",
  fontWeight: "bold",
  color: "#ddd",
  margin: 0,
  width: 200,
};

export const errorMessageStyles = {
  fontSize: "24px",
  color: "#272727",
  margin: "10px 0",
};

export const errorDescriptionStyles = {
  fontSize: "16px",
  color: "#666",
  marginBottom: "20px",
  width: 600,
};

export const homeButtonStyles = {
  fontSize: "16px",
  color: "#fff",
  backgroundColor: "#007bff",
  padding: "10px 20px",
  borderRadius: "5px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
};
