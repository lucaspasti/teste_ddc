import PostsCarousel from '@/components/postsCarousel';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <main className='bg-gradient-to-br from-black to-[var(--ddc-red)] min-h-screen gap-12'>
      <Hero />
      <PostsCarousel />
    </main>
  );
}
