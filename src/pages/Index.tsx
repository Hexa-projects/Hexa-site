import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/motion";
import { stageState } from "@/motion/stage/stageState";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HomeHero from "@/components/home/HomeHero";
import LifecycleTimeline from "@/components/home/LifecycleTimeline";
import Showroom from "@/components/home/Showroom";
import ProofVideos from "@/components/home/ProofVideos";
import ContactTriage from "@/components/home/ContactTriage";
import CompanyFacts from "@/components/home/CompanyFacts";
import { homeMedia } from "@/data/homeMedia";
import { canonicalUrl } from "@/data/routes";
import { companyFacts, lifecycle, showroom, triage } from "@/data/home";
import { detectStageMode, type StageMode } from "@/motion/capability";
import StageCanvas from "@/motion/stage/StageCanvas";
import SmoothScroll from "@/motion/SmoothScroll";
import "@/styles/home.css";

const Index = () => {
  const [mode, setMode] = useState<StageMode>(detectStageMode);
  const [wide] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  const downgrade = useCallback(() => setMode("light"), []);
  const home = useRef<HTMLDivElement>(null);

  // O palco de anéis existe só na abertura; as seções claras o cobrem, então ele para de desenhar.
  useGSAP(
    () => {
      stageState.set({ visible: true });
      ScrollTrigger.create({
        trigger: home.current?.querySelector(".hero"),
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => stageState.set({ visible: self.isActive }),
      });
    },
    { scope: home },
  );

  return (
    <Layout>
      <Helmet>
        <title>Ressonância magnética, instalação e manutenção | Hexamedical</title>
        <meta
          name="description"
          content="Ressonância magnética Esaote, projeto da sala, instalação, manutenção em todo o Brasil e laboratório próprio de eletrônica. Um parceiro técnico durante toda a vida do equipamento."
        />
        <link rel="canonical" href={canonicalUrl("/")} />
      </Helmet>

      <div ref={home} className="home" data-stage={mode}>
        <StageCanvas mode={mode} onDowngrade={downgrade} />
        {/* No toque a rolagem fica a nativa: o Lenis só entra no desktop imersivo. */}
        <SmoothScroll enabled={mode === "immersive" && wide} />
        <HomeHero mode={mode} />
        <div className="home__light">
          <CompanyFacts items={companyFacts} />
          <LifecycleTimeline items={lifecycle} mode={mode} />
          <Showroom items={showroom} />
          <ProofVideos ceo={homeMedia.ceo} testimonials={homeMedia.testimonials} />
          <ContactTriage items={triage} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
