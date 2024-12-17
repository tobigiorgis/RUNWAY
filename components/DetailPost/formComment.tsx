'use client'

import { commentVideo } from '@/lib';
import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client';
import { toast } from '../ui/use-toast';

const FormComment = ({ postId }: { postId: string }) => {
    const supabase = createClient();
    const [isTyping, setIsTyping] = useState(false);

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
        setIsTyping(false);
    }

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setIsTyping(evt.target.value.length > 0);
    }
    
  return (
    <form onSubmit={handleComment} className='w-full'>
        <input 
            type="text" 
            name="comment" 
            placeholder="Add a comment ..." 
            className='bg-gray text-sm focus:outline-none' 
            required 
            onChange={handleInputChange} 
        />
        {isTyping && 
            <button type="submit" className='text-sm w-fit'>Send</button>
        }
    </form>
  )
}

export default FormComment