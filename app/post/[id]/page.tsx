'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { commentVideo, likeVideo, unlikeVideo } from '@/lib'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/ui/Footer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { Metadata } from 'next'


const Page = () => {
    
    const [feedPosts, setFeedPosts] = useState<any[]>([])
    const [likedPosts, setLikedPosts] = useState<any[]>([]);
    const [lists, setLists] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const pathname = usePathname()
    const postId = pathname.split('/')[2]
    
    const router = useRouter()
    
    
    const getRightPost = async () => {

        const { data, error } = await supabase
        .from('posts')
        .select(`*, profiles(
            username,
            id
            )`
        )
        .eq('id', postId)

        if (error) {
            console.log(error)
        }
    
        if (data) {
            setFeedPosts(data)
            console.log(feedPosts)
        }   
    }

    const getComments = async () => {

        const {data, error} = await supabase
        .from('users_posts_comments')
        .select(`*, profiles(
            username
            )`
        )
        .eq('post_id', postId)

        if (error) {
            console.log(error);
        }

        if (data) {
            setComments(data)
        }   

    }

    const fetchLists = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: lists, error } = await supabase
          .from('users_lists')
          .select('name, id')
          .eq('user_id', user?.id)
      
        if (error) {
          console.log(error)
          return
        }
        setLists(lists)
    }

    const fetchLikedPosts = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: likedPosts, error } = await supabase
          .from('users_posts_likes')
          .select('post_id')
          .eq('user_id', user?.id)
      
        if (error) {
          console.log(error)
          return
        }
      
        setLikedPosts(likedPosts.map(like => like.post_id))
      }

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

    const updateLikeCount = async (postId: string) => {

        const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('likes')
        .eq('id', postId);
    
        if (fetchError) {
            console.log(fetchError);
            return;
        }
    
        const likes_count = post[0].likes;

        const { data: like, error } = await supabase
        .from('posts')
        .update({ likes: likes_count + 1})
        .eq('id', postId)

        if (error) {
            console.log(error)
        }
        
        return [error, like]
    }

    // update like count when unlike
    const updateUnlikeCount = async (postId: string) => {

        const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('likes')
        .eq('id', postId);
    
        if (fetchError) {
            console.log(fetchError);
            return;
        }
    
        const likes_count = post[0].likes;

        const { data: like, error } = await supabase
        .from('posts')
        .update({ likes: likes_count - 1})
        .eq('id', postId)

        if (error) {
            console.log(error)
        }
        
        return [error, like]
    }

    const handleLike = async (postId: string) => {

        // Optimistically update the UI
      setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);


      const { data: { user } } = await supabase.auth.getUser()
      const [error, data] = await likeVideo({ user_id: user!.id, post_id: postId });

      if (error) {
        console.error('Error liking post', error);
      } else {
        console.log('Post liked', data);
        updateLikeCount(postId)
      }

      toast({
          title: "You liked that one uh?",
          description: `Post was saved for you!`,
      })
    };

    // unlike a post with unlikeVideo from lib/index.ts
      const handleUnlike = async (postId: string) => {

            // Optimistically update the UI
          setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId));
  
          const { data: { user } } = await supabase.auth.getUser()
          const [error, data] = await unlikeVideo({ user_id: user!.id, post_id: postId });
  
          if (error) {
            console.error('Error liking post', error);
          } else {
            console.log('Post liked', data);
            updateUnlikeCount(postId)
          }
      };

      const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    
        toast({
          title: "Copied to clipboard.",
          description: "You can share it now! ✨",
        })
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
        getRightPost()
        fetchLikedPosts()
        fetchLists()
        getComments()
    }, [])
    
  return (
    <main className='md:pt-20 w-full md:h-full min-h-screen flex flex-row md:items-start items-center md:justify-evenly justify-center px-6 py-0 z-10'>
        <button className='w-1/12 hidden md:flex md:mt-10' onClick={() => router.back()}>
            back
        </button>
        <div className='flex flex-col h-auto md:w-3/4 gap-8'>
            <div className='bg-slate-100 md:h-[550px] h-[70vh] rounded-lg md:mt-10 md:mb-0'>
                {
                    feedPosts.map((feedPosts: any, key: number) => {
                        return (
                            <div key={key} className='flex md:flex-row flex-col h-fit w-full md:gap-12 gap-1'>
                                <div className='rounded-l-lg md:h-[550px] flex-1 relative'>
                                    <Image priority className='rounded-t-lg md:rounded-l-lg h-[45vh] md:h-full w-full' src={feedPosts.src} alt='Image' width={500} height={200}/>
                                </div>
                                <div className='md:p-5 py-2 px-5 w-full md:flex-1 flex flex-col justify-between gap-9'>
                                    <div className='flex flex-row w-full justify-between'>
                                        <Link href={`/profile/${feedPosts.profiles.id}`}>
                                            <h1 className='font-medium text-lg'>{feedPosts.profiles.username}</h1>
                                        </Link>
                                        <div className='flex flex-row gap-3 text-sm items-center'>
                                            <p>{feedPosts.likes}</p>
                                        {
                                            likedPosts.includes(feedPosts.id) ? (
                                                <button  onClick={(event) => handleUnlike(feedPosts.id)}>
                                                    <Heart size={20} fill='red' color='red'/>
                                                </button>
                                            ) : (
                                                <button onClick={(event) => handleLike(feedPosts.id)}>
                                                    LIKE
                                                </button>
                                            )
                                        }
                                            {/* <button>
                                                ADD TO LIST
                                            </button> */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="focus:outline-none">ADD TO LIST</DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Lists</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {
                                                        lists.map((list, index) => (
                                                            <DropdownMenuItem key={index} onClick={() => addPostToList(list.id)}>
                                                                {list.name}
                                                            </DropdownMenuItem>
                                                        ))
                                                    }
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <button onClick={handleCopy}>
                                                SHARE
                                            </button>

                                            {/* <button>
                                                FOLLOW
                                            </button> */}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-2xl'>{feedPosts.title}</h2>
                                        <p>{feedPosts.description}</p>
                                        <p>{feedPosts.product_name}</p>
                                    </div>
                                        <button
                                            className='text-sm hover:font-semibold'
                                            onClick={() => {
                                            const url = feedPosts.product_link.startsWith('http') ? feedPosts.product_link : `http://${feedPosts.product_link}`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            BUY ITEM
                                        </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full flex flex-col bg-black text-white gap-2 px-4 py-4 h-auto mb-10 rounded-lg'>
                <h3>Comments</h3>
                {
                    comments.map((comment: any, key: number) => {
                        return (
                            <div key={key} className='flex flex-row gap-4'>
                                <Link href={`/profile/${comment.profiles.id}`}>
                                    <h3 className='font-semibold'>{comment.profiles.username}</h3>
                                </Link>
                                <p>{comment.comment}</p>
                            </div>
                        )
                    })
                
                }
                <form onSubmit={handleComment}>
                    <div className='flex flex-row w-full justify-between gap-2'>
                        <input required id='comment' name='comment' type='text' placeholder='Add a comment' className='rounded py-1 px-2 bg-neutral-800 text-white placeholder:text-sm focus:outline-none w-full' />
                        <button type='submit' className='flex px-2 py-1 border border-neutral-500 rounded'>Send</button>
                    </div>
                </form>
            </div>
        </div>
        <button className='w-1/12 hidden md:flex invisible'>
            
        </button>
        <Footer/>
    </main>
  )
}

export default Page


export async function generateMetadata(feedPosts: any) {
    return {
        title: `${feedPosts[0]?.title}`,
        description: `${feedPosts[0]?.description}`,
        openGraph: {
            title: `${feedPosts[0]?.title}`,
            description: `${feedPosts[0]?.description}`,
            images: [
                {
                    url: `${feedPosts[0]?.src}`,
                    width: 1260,
                    height: 800,
                    alt: 'Image',
                },
            ],
        }
    }
}