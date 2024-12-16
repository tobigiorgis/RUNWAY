'use client'
import React, { use, useEffect, useState } from 'react'

import { Bookmark, GalleryVerticalEnd } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { toast } from '../ui/use-toast';
import { createClient } from '@/utils/supabase/client';

export const AddToListButton = ({postId} : {postId: string}) => {

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

  return (
    <Dialog>
    <DialogTrigger>
        <div className='px-5 py-1 rounded-2xl bg-light flex gap-2 text-sm text-dark'>
            <Bookmark size={20} color='gray'/>
            Save
        </div>
    </DialogTrigger>
    <DialogContent className='w-fit'>
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

  )
}
