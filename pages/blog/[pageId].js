import dynamic from 'next/dynamic';

const BlogPage = dynamic(() => import('../../src/components/blog/BlogPage'), {
  ssr: false,
});

export default function BlogWrapper() {
  return <BlogPage />;
}
