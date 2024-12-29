"use client";
import { Card, CardContent, Container, Typography } from "@mui/material";
// import Basics from "../components/Basics";
import Ant from "../components/Ant";
import Mantine from "components/Mantine";
export default function Home() {
  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Auto Form demo
            </Typography>
            {/* <Basics /> */}
            {/* <Array /> */}
            <Mantine />
            {/* <Shadcn /> */}
            <Ant />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
