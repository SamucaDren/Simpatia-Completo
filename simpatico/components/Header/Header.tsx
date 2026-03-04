"use client";

import { Grid, Box, Divider } from "@mui/material";
import React from "react";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "#dbe9fc",
        borderBottom: "1px solid",
        borderColor: "#88B3EE",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: "1232px",
          width: "100%",
          margin: "0 auto",
          padding: "0 24px",
          minHeight: "80px",
        }}
      >
        <Grid
          size={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <a href="/" aria-label="Página Inicial do Simpatico IA">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "neutral.700",
                  letterSpacing: "-0.5px",
                }}
              >
                SIMPATICO
              </Box>
              <img
                src="https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/ccniw1pgbo4.png"
                alt="IA"
                style={{
                  height: "32px",
                  width: "auto",
                  marginLeft: "8px",
                }}
              />
            </Box>
          </a>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "24px",
              alignSelf: "center",
              display: { xs: "none", sm: "block" },
              borderColor: "rgba(0, 24, 57, 0.2 )",
            }}
          />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              src="https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/v31opczwkb.png"
              alt="Logo da UNIFENAS"
              style={{ height: "42px", width: "auto" }}
            />
          </Box>
        </Grid>
        <Grid
          size={12}
          sx={{
            display: "flex",
            gap: { xs: "16px", sm: "24px" },
            alignItems: "center",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
