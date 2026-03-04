"use client";
import { Button, Grid, Typography, Box, Fade } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const imageItems = [
  {
    src: "https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/gbep8atcr6t.png",
    backgroundColor: "#006EFF",
  },
  {
    src: "https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/h3wg08jjnl.png",
    backgroundColor: "#4B04CD",
  },
];

export const Hero = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F8F8FC", width: "100%", overflow: "hidden" }}>
      <Grid
        container
        alignItems="center"
        sx={{
          maxWidth: "1232px",
          minHeight: { md: "70vh" },
          margin: "0 auto",
          padding: {
            xs: "80px 24px",
            md: "120px 24px",
          },
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            zIndex: 2,
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "40px", sm: "48px", md: "64px" },
              lineHeight: 1.2,
              color: "neutral.700",
              maxWidth: "600px",
            }}
          >
            O apoio que faltava entre&nbsp;
            <Typography
              component="span"
              sx={{
                fontFamily: "inherit",
                fontWeight: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                color: "primary.main",
              }}
            >
              você&nbsp;
            </Typography>
            e o conteúdo.
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: 1.6,
              color: "neutral.600",
              maxWidth: "500px",
              marginTop: "24px",
            }}
          >
            O&nbsp;
            <Typography
              component="span"
              sx={{
                fontFamily: "inherit",
                fontWeight: 600,
                fontSize: "inherit",
                lineHeight: "inherit",
                color: "neutral.700",
              }}
            >
              SIMPATICO&nbsp;
              <Typography
                component="span"
                sx={{
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  color: "primary.main",
                }}
              >
                IA
              </Typography>
            </Typography>
            &nbsp;é um assistente inteligente que te ajuda a tirar dúvidas sobre
            as matérias do seu curso. É só escolher a disciplina e começar o
            papo, simples assim.
          </Typography>

          <Button
            size="large"
            variant="contained"
            sx={{
              marginTop: "40px",
              borderRadius: "8px",
              padding: "16px 32px",
              fontWeight: 600,
              fontSize: "16px",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={() => {
              router.push("/selecionar_disciplina");
            }}
          >
            Começar
          </Button>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            position: "relative",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: "-15%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "100%",
              maxWidth: "600px",
              zIndex: 1,
            }}
          >
            <img
              src="/hero-background-shape.svg"
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "450px",
              right: "-5%",
              display: "grid",
              placeItems: "center",
            }}
          >
            {imageItems.map((item, index) => (
              <Fade
                key={item.src}
                in={currentImageIndex === index}
                timeout={1000}
              >
                <Box
                  sx={{
                    position: "relative",
                    gridColumn: "1 / -1",
                    gridRow: "1 / -1",
                    borderRadius: "16px",
                    overflow: "hidden",
                    lineHeight: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "50%",
                      backgroundColor: item.backgroundColor,
                      zIndex: 1,
                    }}
                  />
                  <img
                    src={item.src}
                    alt="Assistente virtual Simpatico IA"
                    style={{
                      width: "100%",
                      height: "auto",
                      position: "relative",
                      zIndex: 2,
                    }}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              zIndex: 3,
              bottom: "20%",
              right: "0",
              width: "150px",
            }}
          >
            <img
              src="https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/fxj3dxnt4x6.png"
              alt="Selo IA"
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
