import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--trust-navy)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
