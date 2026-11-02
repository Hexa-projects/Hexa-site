import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { wdmBySlug } from "@/data/wdm";
import WdmCtPage from "@/pages/WdmCtPage";

describe("WDM CT landing pages", () => {
  for (const slug of ["turbotom-1s-vet", "turbotom-1s-lite-vet"]) {
    it(`presents ${slug} as a technical landing page with specialist WhatsApp CTAs`, () => {
      const { unmount } = render(
        <HelmetProvider>
          <WdmCtPage product={wdmBySlug[slug]} standalone />
        </HelmetProvider>,
      );

      expect(screen.getByRole("heading", { level: 1, name: wdmBySlug[slug].name })).toBeInTheDocument();
      expect(screen.getAllByRole("heading", { name: /tecnologia|cadeia de imagem/i }).length).toBeGreaterThan(0);
      expect(screen.queryByText(/material preliminar|folder atualizado|material identificado/i)).not.toBeInTheDocument();

      expect(screen.queryByText(/Angela|Ângela/i)).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Discutir com o especialista/i })).toBeInTheDocument();
      const specialistLinks = screen.getAllByRole("link", { name: /especialista/i });
      expect(specialistLinks.length).toBeGreaterThanOrEqual(3);
      for (const link of specialistLinks) {
        expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/5511973140914"));
        expect(link).toHaveAttribute("href", expect.stringContaining(wdmBySlug[slug].name.replaceAll(" ", "%20")));
      }
      unmount();
    });
  }
});
