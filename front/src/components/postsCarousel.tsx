import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import "animate.css";

import { fetchPosts } from "@/lib/actions/postActions";

export default async function PostsCarousel() {
  const { posts } = await fetchPosts({ page: 1, pageSize: 25 });
  

  return (
    <>
      <h1 className="text-6xl text-center text-white mb-2 font-bold animate__animated animate__fadeInRight">
        Posts Em Destaque
      </h1>
      <div className="max-w-5xl mx-auto py-15 gap-20">
        <Carousel className="w-full animate__animated animate__fadeInRight animate__delay-1s">
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem key={post.id}>
                <Link href={`/posts/`} className="block w-full h-full">
                  <div className="p-6 bg-white rounded-lg shadow text-black h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                    <h3 className="font-bold text-2xl mb-2">{post.title}</h3>
                    <p className="mb-5 mt-5">{post.content}</p>
                    <p className="text-sm text-gray-500">
                      Publicado em {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <div className="self-end mt-4">
                      <span className="text-[var(--ddc-red)] font-semibold">Leia mais</span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
