import { ChakraTanstack } from "@web/components/Chakra";

export default function Page() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        TanStack Form - Chakra
      </h1>
      <ChakraTanstack />
    </div>
  );
}
