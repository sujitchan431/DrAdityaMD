"use client";

export function GoogleMap({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Clinic Location"
        className="h-full w-full"
      />
    </div>
  );
}
