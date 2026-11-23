import Link from "next/link";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { CookiePrefsButton } from "./CookieConsent";
import { site, waLink, hasWhatsapp } from "@/lib/site";

const navLinks = [
  { href: "/sobre", label: "Sobre a Unaro" },
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sites", label: "Sites desenvolvidos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-site-footer className="grain bg-ink text-paper">
      <div className="container-x pb-8 pt-20 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <Logo onDark size="lg" />
            <p className="mt-6 max-w-xs text-[0.98rem] leading-relaxed text-smoke">
              Marketing personalizado para negócios que valorizam estratégia, criatividade e proximidade.
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
            <h2 className="t-eyebrow text-smoke">Navegação</h2>
            <ul className="mt-5 space-y-2.5 text-[0.98rem]">
              {navLinks.map((l) => <li key={l.href}><Link className="link-u" href={l.href}>{l.label}</Link></li>)}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-eyebrow text-smoke">Contato</h2>
            <ul className="mt-5 space-y-2.5 text-[0.98rem]">
              <li className="text-smoke">Curitiba, Paraná</li>
              {hasWhatsapp() && <li><a className="link-u" href={waLink("Olá, Unaro! Vim pelo site e gostaria de conversar sobre a minha empresa.")} target="_blank" rel="noopener noreferrer" data-event="whatsapp_footer">WhatsApp</a></li>}
              <li><Link className="link-u" href="/contato">Página de contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line-dark pt-6 text-[0.82rem] text-smoke lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p>© {year} Unaro</p>
            <Link href="/politica-de-privacidade" className="link-u w-fit hover:text-paper">Política de Privacidade</Link>
            <Link href="/politica-de-cookies" className="link-u w-fit hover:text-paper">Política de Cookies</Link>
            <CookiePrefsButton className="link-u w-fit text-left hover:text-paper" />
          </div>
          <SocialIcons className="-ml-2 gap-0.5" itemClass="size-9 text-smoke hover:text-paper" iconClass="size-[15px]" />
        </div>
      </div>
    </footer>
  );
}
