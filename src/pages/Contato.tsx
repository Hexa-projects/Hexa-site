import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Telefone", value: "(11) 4002-8922", href: "tel:+551140028922" },
  { icon: Mail, label: "E-mail", value: "contato@hexamedical.com.br", href: "mailto:contato@hexamedical.com.br" },
  { icon: MapPin, label: "Localização", value: "São Paulo, SP — Cobertura Nacional" },
  { icon: Clock, label: "Horário", value: "Seg a Sex, 8h às 18h" },
];

const Contato = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contato — Hexamedical</title>
        <meta name="description" content="Entre em contato com a Hexamedical. Fale com um especialista em Ressonância Magnética." />
      </Helmet>

      <PageBreadcrumb items={[{ label: "Contato" }]} />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Fale com um especialista
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Preencha o formulário abaixo ou utilize um de nossos canais de atendimento. Responderemos em até 24 horas úteis.
            </p>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 lg:col-span-3">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Trust block near form */}
              <div className="mt-8 rounded-xl border border-border bg-muted/50 p-6">
                <h3 className="mb-4 font-bold text-foreground">Por que falar com a Hexamedical?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Atendimento consultivo e não comercial
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Avaliação técnica gratuita
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    +15 anos de experiência no mercado
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Cobertura nacional com suporte local
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
