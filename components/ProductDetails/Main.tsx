'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { GalleryVerticalEnd, Heart, Plus, Share } from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { toast } from '@/components/ui/use-toast'
import { commentVideo, likeVideo, unlikeVideo } from '@/lib'
import { Footer } from '@/components/ui/Footer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'



const MainProductDetail = () => {
    
    const [feedPosts, setFeedPosts] = useState<any[]>([])
    const [likedPosts, setLikedPosts] = useState<any[]>([]);
    const [lists, setLists] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [featuredLists, setFeaturedLists] = useState<any[]>([]);
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
        // fetchLikedPosts()
        fetchLists()
        getComments()
    })


    // Fix this useEffect to fetch related posts
    useEffect(() => {
        // const fetchRelatedPosts = async () => {
        //   if (feedPosts.length > 0) {
        //     const { data, error } = await supabase
        //       .from('posts')
        //       .select('*')
        //       .eq('tags', feedPosts[0].tags);
      
        //     if (error) {
        //       console.error('Error fetching posts:', error);
        //     } else {
        //       console.log('Fetched posts:', data);
        //     }
        //   }
        // };

    const fetchProductLists = async () => {
        if (feedPosts.length > 0) {
            const { data, error } = await supabase
            .from('posts_in_lists')
            .select('*, users_lists(*, profiles(username))')
            .eq('post_id', feedPosts[0].id);
        
            if (error) {
                console.error('Error fetching lists:', error);
            } else {
                console.log('Fetched lists:', data);
                setFeaturedLists(data);
                }
            };
        }


            fetchProductLists()
            // fetchRelatedPosts();
      }, [feedPosts]);

    
  return (
    <main className='pt-20 pb-10 w-full md:h-full min-h-screen flex flex-row md:items-start items-center md:justify-evenly justify-center md:px-6 py-0 z-10'>
        <button className='w-1/12 hidden md:flex md:mt-10' onClick={() => router.back()}>
            back
        </button>
        <div className='flex flex-col h-auto w-full md:w-3/4 md:gap-10'>
            <div className=' md:h-[550px] h-auto rounded-lg md:mt-10 md:mb-0'>
                {
                    feedPosts.map((feedPosts: any, key: number) => {
                        return (
                            <div key={key} className='flex md:flex-row flex-col h-fit w-full md:gap-12 gap-1'>
                                <div className='flex w-full md:hidden px-4 justify-between'>
                                    <div>
                                        <h3 className='font-medium text-lg'>{feedPosts.profiles.username}</h3>
                                        <p>{feedPosts.description}</p>
                                    </div>
                                    <button className='text-dark'>
                                        Follow +
                                    </button>
                                </div>
                                <div className='rounded-l-lg md:h-[550px] flex-1 relative px-4 py-2'>
                                    <Image priority className='md:rounded-t-lg md:rounded-l-lg rounded-lg h-[55vh] md:h-full w-full' src={feedPosts.src} alt='Image' width={500} height={200}/>
                                </div>
                                <div className='flex md:hidden flex-col px-4'>
                                    <p className='text-gray'>Product</p>
                                    <div className='flex flex-row justify-between'>
                                       <h5 className='font-medium'>{feedPosts.product_name}</h5>
                                       <button 
                                            className='text-sky text-sm'
                                            onClick={() => {
                                                const url = feedPosts.product_link.startsWith('http') ? feedPosts.product_link : `http://${feedPosts.product_link}`;
                                                    window.open(url, '_blank');
                                                }}
                                        >
                                            Buy
                                       </button>
                                    </div>
                                </div>
                                <div className='md:p-5 py-2 px-3 w-full md:flex-1 flex flex-col justify-between gap-9'>
                                    <div className='md:flex md:flex-row md:w-full justify-between hidden'>
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
                                    <div className='md:flex hidden'>
                                        <h2 className='font-semibold text-2xl'>{feedPosts.title}</h2>
                                        <p>{feedPosts.description}</p>
                                        {/* <p>{feedPosts.product_name}</p> */}
                                    </div>
                                    <div className='flex md:hidden gap-2 justify-center w-full pt-3'>
                                        <button className='bg-gray p-3 rounded-3xl'>
                                            <Plus size={20} color='gray'/>
                                        </button>
                                        {
                                            likedPosts.includes(feedPosts.id) ? (
                                                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleUnlike(feedPosts.id)}>
                                                    <Heart size={20} fill='red' color='red'/>
                                                </button>
                                            ) : (
                                                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleLike(feedPosts.id)}>
                                                    <Heart size={20} color='gray'/>
                                                </button>
                                            )
                                        }
                                        <button className='bg-gray p-3 rounded-3xl'>
                                            <Share size={20} color='gray'/>
                                        </button>
                                    </div>
                                    <div className='flex flex-col gap-3 px-1'>
                                        <h3 className='font-medium text-gray md:text-black'>Lists that include this post ↓</h3>
                                        <div className='flex flex-row w-full h-full gap-3'>
                                            {
                                                featuredLists.map((list: any, index: number) => {
                                                    return (
                                                        <div
                                                            className='shadow-sm bg-zinc border border-slate rounded-xl md:w-full w-1/2 h-full flex px-2 flex-col items-center justify-evenly'
                                                            key={index}
                                                        >
                                                            <Link className='flex w-full flex-col items-center gap-4 py-2' href={`/lists/${list.users_lists.user_id}/${list.list_id}`}>
                                                                <div className='px-2 text-sm flex flex-row items-center justify-between w-full'>
                                                                    <h4 className='text-black font-medium text-lg'>{list.users_lists.name}</h4>
                                                                    <p>by {list.users_lists.profiles.username}</p>
                                                                </div>
                                                                <div className='flex flex-row gap-2 items-center justify-center'>
                                                                    <div className='px-2 py-1 flex flex-row items-center gap-1 text-sm text-gray rounded-lg'>
                                                                        <GalleryVerticalEnd size={10} color='gray'/>
                                                                        <p>+{list.users_lists.posts_added} other posts</p>
                                                                    </div>
                                                                </div>
                                                                <p className='font-medium text-sm hover:font-semibold'>Check out</p>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            
                                            }
                                        </div>
                                    </div>
                                        <button
                                            className='text-sm hover:font-semibold hidden md:flex md:justify-center'
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
            <div className='w-full flex flex-col md:bg-gray text-white opacity-90 gap-2 px-4 py-4 h-auto mb-10 rounded-lg md:mt-0'>
                <h3 className='text-black font-semibold md:text-white'>Comments</h3>
                {
                    comments.map((comment: any, key: number) => {
                        return (
                            <div key={key} className='flex flex-row gap-4'>
                                <Link href={`/profile/${comment.profiles.id}`}>
                                    <h3 className='font-semibold text-black md:text-white'>{comment.profiles.username}</h3>
                                </Link>
                                <p className='text-black md:text-white'>{comment.comment}</p>
                            </div>
                        )
                    })
                
                }
                <form onSubmit={handleComment}>
                    <div className='flex flex-row w-full justify-between gap-2'>
                        <input required id='comment' name='comment' type='text' placeholder='Add a comment' className='rounded py-1 px-2 bg-neutral-800 text-black placeholder:text-sm focus:outline-none w-full' />
                        <button type='submit' className='flex px-2 py-1 border border-neutral-500 rounded text-black md:text-white'>Send</button>
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

export default MainProductDetail