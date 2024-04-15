
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { supabase } from '@/lib/supabase'
// import { usePathname, useRouter } from 'next/navigation'
// import { toast } from '@/components/ui/use-toast'
// import { commentVideo, likeVideo, unlikeVideo } from '@/lib'
// import { Heart } from 'lucide-react'
// import Link from 'next/link'
// import { Footer } from '@/components/ui/Footer'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'

import MainProductDetail from "@/components/ProductDetails/Main"
import { supabase } from '@/lib/supabase'
import { Metadata, ResolvingMetadata } from "next"



const Page = async () => {



    
  return (
    <MainProductDetail />
  )
}

export default Page

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const postId = params.id
    console.log(postId);
    
   
    // fetch data
    const { data, error } = await supabase
    .from('posts')
    .select(`*, profiles(
        username,
        id
        )`
    )
    .eq('id', postId)

      // handle error
  if (error) {
    console.error(error);
    throw error;
  }

  // handle empty data
if (!data || data.length === 0) {
    throw new Error('No post found');
}

return {
    title: data && data[0]?.title,
    description: data && data[0]?.description,
    
    openGraph: {
        title: `${data && data[0]?.title} by ${data && data[0]?.profiles.username} on Runway`,
        description: `Take a look at this oufit!`,
        url: `https://userunway.ar/post/${postId}`,
        type: 'website',
        images: [{
            url: data && data[0]?.src,
            alt: data && data[0]?.title,
        }],
    },
}
  }
