import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-medical-900">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
      >
        Back to Home
      </Link>
    </Container>
  );
}
