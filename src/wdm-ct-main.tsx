import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { wdmBySlug } from "@/data/wdm";
import WdmCtPage from "@/pages/WdmCtPage";
import "@/wdm-ct-standalone.css";

const slug = window.location.pathname.split("/").filter(Boolean).at(-1) ?? "";
const product = slug === "turbotom-1s-vet" || slug === "turbotom-1s-lite-vet" ? wdmBySlug[slug] : undefined;
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <HelmetProvider>
      {product ? <WdmCtPage product={product} standalone /> : <p>Página não encontrada.</p>}
    </HelmetProvider>,
  );
}
