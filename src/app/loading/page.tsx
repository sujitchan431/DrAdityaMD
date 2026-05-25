export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
