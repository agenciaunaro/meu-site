export function DemoBadge({ className = "" }: { className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] ${className}`}>Demonstração</span>;
}

export function DemoNotice() {
  return (
    <div role="note" className="rounded-2xl border border-dashed border-stone p-5 text-[0.92rem] leading-relaxed text-ash">
      <strong className="font-medium text-ink">Conteúdo demonstrativo.</strong> Os projetos marcados como demonstração servem apenas para visualizar o layout. Os trabalhos reais da Unaro serão cadastrados no painel de gerenciamento e substituem estes exemplos automaticamente.
    </div>
  );
}
