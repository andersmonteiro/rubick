export default function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title?: string;
}) {
  return (
    <div className="card-glitch my-6 aspect-video overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title ?? "Vídeo do YouTube"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
