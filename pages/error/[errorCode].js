import dynamic from 'next/dynamic';

const ErrorPage = dynamic(
  () => import('../../src/components/error/ErrorPage'),
  { ssr: false }
);

export default function ErrorWrapper() {
  return <ErrorPage />;
}
