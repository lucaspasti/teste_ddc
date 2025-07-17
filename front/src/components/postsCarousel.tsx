import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"
import Link from "next/link"

import 'animate.css';

// Coloque os dados mock aqui (como acima)
const posts = [
    {
        id: 1,
        title: "Como construir um blog moderno com Next.js",
        content: "Aprenda como criar um blog rápido e moderno usando Next.js, Tailwind CSS e Prisma.",
        published: true,
        authorId: 10,
        createdAt: new Date("2024-06-15T10:23:00Z"),
        updatedAt: new Date("2024-06-16T09:00:00Z"),
        author: {
            id: 10,
            name: "Ana Silva",
        },
        categories: [
            { id: 1, name: "Tecnologia" },
            { id: 2, name: "Desenvolvimento" }
        ],
    },
    {
        id: 2,
        title: "Tendências de UX para 2025",
        content: "Conheça as principais tendências de experiência do usuário para o próximo ano.",
        published: true,
        authorId: 12,
        createdAt: new Date("2024-07-01T08:00:00Z"),
        updatedAt: new Date("2024-07-02T13:30:00Z"),
        author: {
            id: 12,
            name: "Bruno Costa",
        },
        categories: [
            { id: 3, name: "Design" }
        ],
    },
    {
        id: 3,
        title: "Automação com IA: por onde começar?",
        content: "Veja como implementar automação em processos usando inteligência artificial.",
        published: true,
        authorId: 13,
        createdAt: new Date("2024-07-10T18:45:00Z"),
        updatedAt: new Date("2024-07-11T10:12:00Z"),
        author: {
            id: 13,
            name: "Carlos Souza",
        },
        categories: [
            { id: 4, name: "Inteligência Artificial" },
            { id: 2, name: "Desenvolvimento" }
        ],
    }
]

export default function PostsCarousel() {
    return (
        <>
            <h1 className="text-6xl text-center text-white mb-2 font-bold animate__animated animate__fadeInRight">Posts Em Destaque</h1>
            <div className="max-w-5xl mx-auto py-15 gap-20">
                <Carousel className="w-full animate__animated animate__fadeInRight animate__delay-1s">
                    <CarouselContent>
                        {posts.map(post => (
                            <CarouselItem key={post.id}>
                                <Link href="/login" className="block w-full h-full">
                                    <div className="p-6 bg-white rounded-lg shadow text-black h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                                        <h3 className="font-bold text-2xl mb-2">{post.title}</h3>
                                        <p className="mb-5 mt-5">{post.content}</p>
                                        <p className="text-sm text-gray-500">
                                            {post.author?.name} &middot; {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="flex mt-8 gap-5">
                                            {post.categories?.map(cat => (
                                                <span key={cat.id} className="bg-[var(--ddc-red)] text-white px-2 py-1 rounded text-xs">
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
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
    )
}
