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
import { homeMedia } from "@/data/homeMedia";
import { lifecycle, showroom, triage } from "@/data/home";
import { detectStageMode, type StageMode } from "@/motion/capability";
import StageCanvas from "@/motion/stage/StageCanvas";
import SmoothScroll from "@/motion/SmoothScroll";
import "@/styles/home.css";

const Index = () => {
  const [mode, setMode] = useState<StageMode>(detectStageMode);
  const downgrade = useCallback(() => setMode("light"), []);
  const home = useRef<HTMLDivElement>(null);

  // O palco só desenha enquanto a home está na tela (no rodapé, nada dele aparece).
  useGSAP(
    () => {
      stageState.set({ visible: true });
      ScrollTrigger.create({
        trigger: home.current,
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
        <title>Hexamedical — do projeto da sala à última manutenção</title>
        <meta
          name="description"
          content="Equipamentos de diagnóstico por imagem, instalação, manutenção e laboratório técnico em uma só operação, durante toda a vida do equipamento."
        />
      </Helmet>

      <div ref={home} className="home" data-stage={mode}>
        <StageCanvas mode={mode} onDowngrade={downgrade} />
        <SmoothScroll enabled={mode === "immersive"} />
        <HomeHero mode={mode} />
        <LifecycleTimeline items={lifecycle} mode={mode} />
        <Showroom items={showroom} mode={mode} />
        <ProofVideos ceo={homeMedia.ceo} testimonials={homeMedia.testimonials} mode={mode} />
        <ContactTriage items={triage} mode={mode} />
      </div>
    </Layout>
  );
};

export default Index;
