export function ReadingTime({ minutes }: { minutes: number }) {
  return <span>{Math.ceil(minutes)} min read</span>;
}
