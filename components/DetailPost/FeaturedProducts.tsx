import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import React from 'react'

export const FeaturedProducts = async ({postId} : {postId: string}) => {

    const supabase = createClient();

    const { data: product, error } = await supabase 
    .from('products')
    .select('*')
    .eq('post_id', postId)

  return (
    <div className='hidden w-full md:flex flex-col gap-2'>
        <h3 className='text-sm text-dark font-medium'>Products featured</h3>
        {
            product && product.map((product: any) => (
                <Link 
                    href={`${product.product_link}`} 
                    key={product.id} 
                    className='w-full flex'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div key={product.id} className='flex flex-row w-full justify-between items-center py-2 px-4 bg-light rounded-lg'>
                        <h2 className='text-sm font-medium'>{product.product_name}</h2>
                        <p className='text-xs text-dark'>Buy Now</p>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}
