export function VideoEmbed({ src }: { src: string }) {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={src}
        width="100%"
        height="100%"
        allowFullScreen
        className="h-full w-full"
        title="Video embed"
      />
    </div>
  );
}
