"use client";
import { Card, CardContent, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Auto Form demo
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Choose a form implementation to test:
            </Typography>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/test/rhf" passHref>
                <Button variant="contained">React Hook Form</Button>
              </Link>
              <Link href="/test/tanstack" passHref>
                <Button variant="contained" color="secondary">TanStack Form</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
