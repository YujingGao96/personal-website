import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../src/components/home/home/Home'), {
  ssr: false,
});

export default function IndexPage() {
  return <Home />;
}
