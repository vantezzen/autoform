"use client";
import { Container, Typography } from "@mui/material";
import { MantineRHF } from "../../../components/Mantine";
import { AntRHF } from "../../../components/Ant";
import { ChakraRHF } from "../../../components/Chakra";
import { BasicsRHF } from "../../../components/Basics";

export default function RHFTestPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        React Hook Form
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Shadcn (Basics)</Typography>
      <BasicsRHF />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Mantine</Typography>
      <MantineRHF />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Ant Design</Typography>
      <AntRHF />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Chakra UI</Typography>
      <ChakraRHF />
    </Container>
  );
}
