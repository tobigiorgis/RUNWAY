import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { BuyButton } from './BuyButton';

export const MobileFP = async ({postId} : {postId: string}) => {

    const supabase = createClient();

    const { data: product, error } = await supabase 
    .from('products')
    .select('*')
    .eq('post_id', postId)

  return (
    <div className='flex md:hidden flex-col px-4'>
              <p className='text-dark'>{product && product.length > 1 ? 'Products' : 'Product'}</p>
        {
            product && product.map((product: any) => (
                <div className='flex flex-row justify-between'>
                    <h5 className='font-medium'>{product.product_name}</h5>
                    <BuyButton productLink={product.product_link}/>
                </div>
            ))
        }
    </div>
  )
}
