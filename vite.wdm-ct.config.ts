import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const outputDirectory = path.resolve(__dirname, "output/wdm-ct-origin");
const ctSlugs = ["turbotom-1s-vet", "turbotom-1s-lite-vet"];

const pageMetadata: Record<string, { title: string; description: string; robots?: string }> = {
  "turbotom-1s-vet": {
    title: "TurboTom 1S-VET | Tomografia veterinária WDM e Hexamedical",
    description: "Conheça o TurboTom 1S-VET da WDM para tomografia veterinária e planeje a solução com a Hexamedical.",
  },
  "turbotom-1s-lite-vet": {
    title: "TurboTom 1S LITE VET | Tomografia veterinária WDM e Hexamedical",
    description: "Conheça a tecnologia do TurboTom 1S LITE VET para TC veterinária e converse com um especialista da Hexamedical sobre a configuração ideal.",
    robots: "noindex, nofollow",
  },
};

export default defineConfig({
  plugins: [react(), {
    name: "wdm-ct-route-entrypoints",
    closeBundle() {
      const source = path.join(outputDirectory, "wdm-ct.html");
      const template = fs.readFileSync(source, "utf8");
      for (const slug of ctSlugs) {
        const destination = path.join(outputDirectory, "solucoes", slug, "index.html");
        const metadata = pageMetadata[slug];
        const head = [
          `<title>${metadata.title}</title>`,
          `<meta name="description" content="${metadata.description}" />`,
          `<link rel="canonical" href="https://www.hexamedical.com.br/solucoes/${slug}/" />`,
          metadata.robots ? `<meta name="robots" content="${metadata.robots}" />` : "",
        ].filter(Boolean).join("\n    ");
        const html = template.replace(/<title>.*?<\/title>/, head);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, html);
      }
    },
  }],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  publicDir: "public-wdm-ct",
  build: {
    outDir: "output/wdm-ct-origin",
    emptyOutDir: true,
    assetsDir: "wdm-ct-assets/assets",
    rollupOptions: { input: path.resolve(__dirname, "wdm-ct.html") },
  },
});
