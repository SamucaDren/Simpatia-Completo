"use client";
import { Cursos } from "@/lib/Cursos";
import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
  Typography,
  Box,
  Paper,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useCourse } from "@/lib/context/useCourse";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const DisciplineForm = () => {
  const router = useRouter();
  const {
    selectedCourse,
    setSelectedCourse,
    selectedDiscipline,
    setSelectedDiscipline,
  } = useCourse();

  const nomesDosCursos = Cursos.map((curso) => curso.nome).sort();

  const disciplinas = selectedCourse
    ? Cursos.find((curso) => curso.nome === selectedCourse)?.disciplinas || []
    : [];
  const disciplinasDisponiveis = disciplinas.sort();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "neutral.100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1024px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "neutral.200",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            backgroundColor: "neutral.000",
            order: { xs: 2, md: 1 },
            position: "relative",
            minHeight: { xs: "400px", sm: "500px", md: "auto" },
            display: "flex",
            flexDirection: "column",
            p: { xs: 4, md: 5 },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "primary.main",
              borderRadius: "12px",
              m: 2,
            }}
          />
          <Box sx={{ zIndex: 2, position: "relative" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "white",
                lineHeight: 1.3,
                mb: 2,
              }}
            >
              Pronto para começar?
            </Typography>
            <Typography variant="body1" sx={{ color: "blue.claro-03" }}>
              Basta selecionar seu curso e a matéria que precisa de ajuda.
            </Typography>
          </Box>
          <Box
            component="img"
            src="https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/wpq4o9uhu1.png"
            alt="Ilustração de uma pessoa estudando"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50% )",
              width: "auto",
              height: "90%",
              maxHeight: "310px",
              maxWidth: "none",
              zIndex: 1,
            }}
          />
          <Box
            component="img"
            src="https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/qltnay4gva8.png"
            alt="Selo de Inteligência Artificial"
            sx={{
              position: "absolute",
              bottom: { xs: "20px", md: "30px" },
              right: { xs: "20px", md: "30px" },
              width: { xs: "100px", md: "120px" },
              height: "auto",
              zIndex: 2,
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            backgroundColor: "neutral.000",
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            order: { xs: 1, md: 2 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "24px", md: "32px" },
              lineHeight: 1.3,
              color: "neutral.700",
              mb: 1,
            }}
          >
            Escolha seu curso e disciplina
          </Typography>
          <Typography sx={{ color: "neutral.600", mb: 4 }}>
            Preencha os campos para iniciar o chat.
          </Typography>

          <FormControl fullWidth>
            <Grid container direction="column" spacing={3}>
              <Grid size={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={nomesDosCursos}
                  value={selectedCourse}
                  onChange={(_, novoCurso) => {
                    setSelectedCourse(novoCurso);
                    setSelectedDiscipline(null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seu Curso"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SchoolOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  disabled={!selectedCourse}
                  options={disciplinasDisponiveis}
                  value={selectedDiscipline}
                  onChange={(_, novaDisciplina) =>
                    setSelectedDiscipline(novaDisciplina)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Disciplina"
                      helperText={
                        !selectedCourse ? "Selecione um curso primeiro" : ""
                      }
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <BookOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  disabled={!selectedCourse || !selectedDiscipline}
                  onClick={() => {
                    router.push("/chat_simpatico");
                  }}
                  sx={{
                    py: "14px",
                    fontWeight: 600,
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                >
                  Iniciar Chat
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};
