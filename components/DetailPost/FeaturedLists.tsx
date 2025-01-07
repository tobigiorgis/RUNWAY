import { createClient } from '@/utils/supabase/server';
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const FeaturedLists = async ({postId} : {postId: string}) => {

    const supabase = createClient();

         const { data: lists, error } = await supabase
            .from('posts_in_lists')
            .select('*, users_lists(*, profiles(username))')
            .eq('post_id', postId);
        
            if (error) {
             console.error('Error fetching lists:', error);
            } else {
             console.log('Fetched lists:', lists);
             }

  return (
            <div className='flex flex-col gap-3'>
                <h3 className='font-medium text-dark text-sm'>Lists</h3>
                {
                    lists?.length === 0 ? 
                        <p className='text-dark text-xs'>Not featured in any lists yet.</p> 
                    : null
                }
                <div className='flex flex-col w-full h-full gap-3'>
                    {
                        lists?.map((list: any, index: number) => {
                            return (
                                <div
                                    className='hover:bg-zinc rounded-xl md:w-full w-1/2 h-full flex flex-row items-center justify-evenly gap-5'
                                    key={index}
                                >
                                    <GalleryVerticalEnd size={28} color='gray'/>
                                    <Link className='flex w-full flex-col items-start gap-4 py-2' href={`/lists/${list.users_lists.user_id}/${list.list_id}`}>
                                        <div className=' text-sm flex flex-col items-start justify-start w-full'>
                                            <h4 className='text-black text-md'>{list.users_lists.name}</h4>
                                            <div className='py-1 flex flex-row items-center gap-1 text-sm text-black rounded-lg'>
                                                <p className='text-sm text-dark'>{list.users_lists.profiles.username}</p>
                                                <p className='text-sm text-dark'>• {list.users_lists.posts_added} posts</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    
                    }
                </div>
            </div> 
  )
}
