"use client";
import { useCourse } from "@/lib/context/useCourse";
import { Box, Typography } from "@mui/material";

export const Chat = () => {
  const { selectedCourse, selectedDiscipline } = useCourse();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
      <Box
        sx={{
          width: { xs: "91.66%", sm: "91.66%", md: "66.66%" },
          backgroundColor: "background.default",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "#0C0C12",
            fontWeight: 600,
          }}
        >
          {selectedCourse}
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#4C4B67",
            fontWeight: 500,
          }}
        >
          {selectedDiscipline}
        </Typography>
      </Box>
    </Box>
  );
};
