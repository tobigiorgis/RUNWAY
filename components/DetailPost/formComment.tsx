'use client'

import { commentVideo } from '@/lib';
import React from 'react'
import { createClient } from '@/utils/supabase/client';
import { toast } from '../ui/use-toast';

const FormComment = ({ postId }: { postId: string }) => {
    const supabase = createClient();

    const handleComment = async (evt: any) => {
        evt.preventDefault();

        const comment = evt.target.elements.comment.value;
        
        const { data: { user } } = await supabase.auth.getUser()
        const [error, data] = await commentVideo({ user_id: user!.id, post_id: postId, comment });

        if (error) {
            console.log(error)
        } else {
            toast({
                title: "Comment added",
                description: `You commented on this post!`,
            })
        }

        evt.target.reset(); 
    }
    
  return (
    <form onSubmit={handleComment}>
        <input type="text" name="comment" placeholder="Add a comment" required />
        <button type="submit">Comment</button>
  </form>
  )
}

export default FormComment 