import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Foto ilustrativa temporária (banco de imagens com licença comercial).
 * Para trocar: substitua o arquivo em /public/images/institucional/ mantendo o mesmo nome.
 * Enquanto o arquivo não existir, mostra o espaço reservado.
 */
export function IllustrativePhoto({ src, alt, className = "", sizes = "100vw", note }: { src: string; alt: string; className?: string; sizes?: string; note: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  return (
    <figure className={`relative overflow-hidden rounded-[1.5rem] bg-mist ${className}`}>
      {exists ? (
        <>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/85 px-3 py-1 text-[0.72rem] text-ash backdrop-blur">Imagem ilustrativa</figcaption>
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div><span className="mx-auto block h-px w-16 bg-stone" /><p className="t-eyebrow mt-5 text-stone">Imagem ilustrativa</p><p className="mt-2 text-[0.88rem] text-stone">{note}</p></div>
        </div>
      )}
    </figure>
  );
}
