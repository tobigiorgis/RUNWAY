'use client'
import { createClient } from '@/utils/supabase/client';
import { Bookmark, Copy, Forward, Plus, Share } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export const MobileButtons = ({postId} : {postId: string}) => {

    const supabase = createClient();
    const [mylists, setMylists] = useState<any[]>([])

    const getLists = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: lists, error } = await supabase
          .from('users_lists')
          .select('*')
          .eq('user_id', user?.id)
      
        if (error) {
          console.log(error)
          return
        }
        else {
            setMylists(lists)
        }
    }

    async function addPostToList(listId: string) {
        const { error } = await supabase
          .from('posts_in_lists')
          .insert([
            { list_id: listId, post_id: postId },
          ]);
      
        if (error) {
          console.error('Error adding post to list:', error);
        }
        toast({
          title: "Post added to list!",
          description: "You can view it on your lists.",
        })
    }

    useEffect(() => {
        getLists()
    })

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    
        toast({
          title: "Copied to clipboard.",
          description: "You can share it now! ✨",
        })
      }

  return (
    <div className='flex md:hidden gap-2 justify-center w-full pt-3'>
    <Dialog>
        <DialogTrigger>
            <div className='bg-dark p-3 rounded-3xl opacity-30'>
                <Bookmark size={20} color='black'/>
            </div>
        </DialogTrigger>
        <DialogContent className='w-fit rounded-md'>
            <DialogHeader>
            <DialogTitle>Save item to list</DialogTitle>
            <DialogDescription className='flex flex-col'>
            {
                mylists.map((list, index) => (
                    <button className='bg-gray text-dark flex flex-row rounded px-3 py-2 gap-1 mt-2' key={index} onClick={() => addPostToList(list.id)}>
                        <h4>{list.name} •</h4>
                        <span>{list.posts_added} posts</span>
                    </button>
                ))
            }
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
        {/* {
            likedPosts.includes(detailPost.id) ? (
                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleUnlike(feedPosts.id)}>
                    <Heart size={20} fill='red' color='red'/>
                </button>
            ) : (
                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleLike(feedPosts.id)}>
                    <Heart size={20} color='gray'/>
                </button>
            )
        } */}
        <button onClick={handleCopy} className='bg-dark opacity-30 p-3 rounded-3xl'>
            <Copy size={20} color='black'/>
        </button>
    </div>
  )
}
