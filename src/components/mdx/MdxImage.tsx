export default function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} loading="lazy" className="my-6 w-full rounded-sm border border-border" />
  );
}
