'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = (
  { 
    hasNextPage,
    hasPrevPage,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'

  return (
    <div className='flex gap-5 justify-center mt-4'>
      <Button
        className='text-white'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/posts?page=${Number(page) - 1}`)
        }}>
        Anterior
      </Button>

      <div className='flex items-center justify-center'>
        {page} 
      </div>

      <Button
        className='text-white'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/posts?page=${Number(page) + 1}`)
        }}>
        Próximo
      </Button>
    </div>
  )
}

export default PaginationControls
