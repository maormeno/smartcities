import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="primary.main" variant="subtitle2">
              ERT DYI
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary.main" variant="subtitle1" fontSize={12}>
              {`${new Date().getFullYear()} | Fundamentos para la Simulación de Procesos Estocásticos | EY`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;