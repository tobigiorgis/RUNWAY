
import React from 'react'

import Link from 'next/link';

import { createClient } from '@/utils/supabase/client';
import FormComment from './formComment';

 const GetComments = async ({postId} : {postId: string}) => {


    const supabase = createClient();

    const {data: comments} = await supabase
    .from('users_posts_comments')
    .select(`*, profiles(
        username
        )`
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true })



  return (
    <div className='w-full flex flex-col md:bg-gray text-dark gap-2 h-auto mb-10 rounded-lg md:mt-0'>
        <h3 className='font-medium text-sm text-dark'>Comments</h3>
        {
            comments?.map((comment: any, key: number) => {
                return (
                    <div key={key} className='flex flex-row gap-4 items-center'>
                        <Link href={`/profile/${comment.profiles.id}`}>
                            <h3 className='font-medium text-md text-black md:text-dark'>{comment.profiles.username}</h3>
                        </Link>
                        <p className='text-black md:text-dark text-sm'>{comment.comment}</p>
                    </div>
                )
            })
        
        }
        <FormComment postId={postId}/>
    </div>      
  )
}

export default GetComments