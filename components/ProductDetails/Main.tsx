// 'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { GalleryVerticalEnd, Heart, Plus, Share } from 'lucide-react'


import { toast } from '@/components/ui/use-toast'
import { commentVideo, likeVideo, unlikeVideo } from '@/lib'
import { Footer } from '@/components/ui/Footer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import DetailPost from '../DetailPost/detailPost'
import GetComments from '../DetailPost/getComments'

type MainProductDetailProps = {
  postId: string
}

const MainProductDetail = ({ postId }: MainProductDetailProps) => {
  // const searchParams = useSearchParams()
  // const postId = searchParams.get(id) || '';
    
    // const [feedPosts, setFeedPosts] = useState<any[]>([])
    // const [likedPosts, setLikedPosts] = useState<any[]>([]);
    // const [lists, setLists] = useState<any[]>([]);
    // const [comments, setComments] = useState<any[]>([]);
    // const [featuredLists, setFeaturedLists] = useState<any[]>([]);

    
    // const router = useRouter()
    

    // const fetchRelatedPosts = async () => {
    //     const { data, error } = await supabase
    //       .from('posts')
    //       .select('*')
    //       .filter('tags', 'eq', feedPosts[0].tags);
      
    //     if (error) {
    //       console.error('Error fetching posts:', error);
    //     } else {
    //       console.log('Fetched posts:', data);
    //     }
    //   };

    // const fetchLists = async () => {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     const { data: lists, error } = await supabase
    //       .from('users_lists')
    //       .select('name, id')
    //       .eq('user_id', user?.id)
      
    //     if (error) {
    //       console.log(error)
    //       return
    //     }
    //     setLists(lists)
    // }

    // const fetchLikedPosts = async () => {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     const { data: likedPosts, error } = await supabase
    //       .from('users_posts_likes')
    //       .select('post_id')
    //       .eq('user_id', user?.id)
      
    //     if (error) {
    //       console.log(error)
    //       return
    //     }
      
    //     setLikedPosts(likedPosts.map(like => like.post_id))
    //   }



    // const updateLikeCount = async (postId: string) => {

    //     const { data: post, error: fetchError } = await supabase
    //     .from('posts')
    //     .select('likes')
    //     .eq('id', postId);
    
    //     if (fetchError) {
    //         console.log(fetchError);
    //         return;
    //     }
    
    //     const likes_count = post[0].likes;

    //     const { data: like, error } = await supabase
    //     .from('posts')
    //     .update({ likes: likes_count + 1})
    //     .eq('id', postId)

    //     if (error) {
    //         console.log(error)
    //     }
        
    //     return [error, like]
    // }

    // // update like count when unlike
    // const updateUnlikeCount = async (postId: string) => {

    //     const { data: post, error: fetchError } = await supabase
    //     .from('posts')
    //     .select('likes')
    //     .eq('id', postId);
    
    //     if (fetchError) {
    //         console.log(fetchError);
    //         return;
    //     }
    
    //     const likes_count = post[0].likes;

    //     const { data: like, error } = await supabase
    //     .from('posts')
    //     .update({ likes: likes_count - 1})
    //     .eq('id', postId)

    //     if (error) {
    //         console.log(error)
    //     }
        
    //     return [error, like]
    // }

    // const handleLike = async (postId: string) => {

    //     // Optimistically update the UI
    //   setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);


    //   const { data: { user } } = await supabase.auth.getUser()
    //   const [error, data] = await likeVideo({ user_id: user!.id, post_id: postId });

    //   if (error) {
    //     console.error('Error liking post', error);
    //   } else {
    //     console.log('Post liked', data);
    //     updateLikeCount(postId)
    //   }

    //   toast({
    //       title: "You liked that one uh?",
    //       description: `Post was saved for you!`,
    //   })
    // };

    // // unlike a post with unlikeVideo from lib/index.ts
    //   const handleUnlike = async (postId: string) => {

    //         // Optimistically update the UI
    //       setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId));
  
    //       const { data: { user } } = await supabase.auth.getUser()
    //       const [error, data] = await unlikeVideo({ user_id: user!.id, post_id: postId });
  
    //       if (error) {
    //         console.error('Error liking post', error);
    //       } else {
    //         console.log('Post liked', data);
    //         updateUnlikeCount(postId)
    //       }
    //   };


    //   async function addPostToList(listId: string) {
    //     const { error } = await supabase
    //       .from('posts_in_lists')
    //       .insert([
    //         { list_id: listId, post_id: postId },
    //       ]);
      
    //     if (error) {
    //       console.error('Error adding post to list:', error);
    //     }
    //     toast({
    //       title: "Post added to list!",
    //       description: "You can view it on your lists.",
    //     })
    // }



    // useEffect(() => {
    //     getRightPost()
    //     // fetchLikedPosts()
    //     fetchLists()
    //     getComments()
    // })


    // Fix this useEffect to fetch related posts
    // useEffect(() => {
    //     // const fetchRelatedPosts = async () => {
    //     //   if (feedPosts.length > 0) {
    //     //     const { data, error } = await supabase
    //     //       .from('posts')
    //     //       .select('*')
    //     //       .eq('tags', feedPosts[0].tags);
      
    //     //     if (error) {
    //     //       console.error('Error fetching posts:', error);
    //     //     } else {
    //     //       console.log('Fetched posts:', data);
    //     //     }
    //     //   }
    //     // };

    // const fetchProductLists = async () => {
    //     if (feedPosts.length > 0) {
    //         const { data, error } = await supabase
    //         .from('posts_in_lists')
    //         .select('*, users_lists(*, profiles(username))')
    //         .eq('post_id', feedPosts[0].id);
        
    //         if (error) {
    //             console.error('Error fetching lists:', error);
    //         } else {
    //             console.log('Fetched lists:', data);
    //             setFeaturedLists(data);
    //             }
    //         };
    //     }


    //         fetchProductLists()
    //         // fetchRelatedPosts();
    //   }, [feedPosts]);

    
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='pt-10 pb-10 w-full md:h-auto min-h-screen flex flex-row md:items-start items-center md:justify-evenly justify-center md:px-0 py-0 z-10 bg-gray'>
          <div className='flex flex-col h-auto w-full md:gap-10'>
            <DetailPost postId={postId}/>
          </div>
          <Footer/>
      </main>
    </Suspense>
  )
}

export default MainProductDetail