

import React from 'react'
import UserProfile from '@/components/Profile/UserProfile'
import { Metadata, ResolvingMetadata } from 'next'
import { supabase } from '@/lib/supabase'



const Page = () => {


    
  return (
    <UserProfile />
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
    
    const userId = params.id
   
    // fetch data

        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)

        // handle error
        if (error) {
        console.error(error);
        throw error;
        }
        
        // handle empty data
        if (!profiles || profiles.length === 0) {
        throw new Error('No post found');
        }


return {
    // title: data && data[0]?.title,
    // description: data && data[0]?.description,
    // icons: [],
    openGraph: {
        title: `${profiles && profiles[0]?.username} is on RUNWAY. JOIN US!`,
        description: `Take a look at ${profiles[0].username} profile!`,
        url: `https://userunway.ar/post/${userId}`,
        type: 'website',
        // images: [{
        //     url: profiles && profiles[0]?.src,
        //     width: 256,
        //     height: 256,
        //     alt: profiles && profiles[0]?.title,
        // }],
    },
}
  }