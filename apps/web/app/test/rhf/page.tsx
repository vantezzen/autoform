import Link from "next/link";
import { Container, Typography, Box, Button } from "@mui/material";

export default function RHFTestPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        React Hook Form Test
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link href="/test/rhf/shadcn" passHref>
          <Button variant="contained">Shadcn</Button>
        </Link>
        <Link href="/test/rhf/mui" passHref>
          <Button variant="contained">MUI</Button>
        </Link>
        <Link href="/test/rhf/mantine" passHref>
          <Button variant="contained">Mantine</Button>
        </Link>
        <Link href="/test/rhf/ant" passHref>
          <Button variant="contained">Ant Design</Button>
        </Link>
        <Link href="/test/rhf/chakra" passHref>
          <Button variant="contained">Chakra UI</Button>
        </Link>
      </Box>
    </Container>
  );
}
