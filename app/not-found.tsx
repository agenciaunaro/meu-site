import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center pb-24 pt-36">
      <p className="t-eyebrow text-ash">Erro 404</p>
      <h1 className="t-display mt-6 max-w-[12ch]">Esta página não <span className="serif-accent">existe</span>.</h1>
      <p className="t-lead mt-8 max-w-lg text-ash">O endereço pode ter mudado ou sido digitado errado. Você pode voltar ao início ou conhecer nossos serviços.</p>
      <div className="mt-10 flex flex-wrap gap-3"><Button href="/">Voltar ao início</Button><Button href="/servicos" variant="outline">Ver serviços</Button></div>
    </section>
  );
}
