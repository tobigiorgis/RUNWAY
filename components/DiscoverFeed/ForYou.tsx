import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import { ArrowUpRight, Heart, Share } from 'lucide-react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { likeVideo, unlikeVideo } from '@/lib';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../ui/use-toast';
import { redirect, useRouter } from 'next/navigation'
import { Dialog } from '../ui/dialog';
import ShareMyProfileButton from '@/components/Buttons/ShareMyProfileButton';
import PostInFeed from './PostInFeed';


export const ForYou = async () => {

    const supabase = createClient()

    // const { toast } = useToast()

    // const [isHovered, setIsHovered] = useState(null);
    // const [likedPosts, setLikedPosts] = useState<any[]>([]);
    // const router = useRouter()


        let { data: posts, error } = await supabase
        .from('posts')
        .select(`*, profiles(
            username
            )`)
        .order(
            'created_at',
            { ascending: false }
        )

        if (!posts) {
            return <p>No posts found.</p>
          }

        if (error) {
            console.log(error)
        }
        


    // const fetchLikedPosts = async () => {
    //     const { data: { user } } = await supabase.auth.getUser()
    //     if (user) {
    //         const { data: likedPosts, error } = await supabase
    //           .from('users_posts_likes')
    //           .select('post_id')
    //           .eq('user_id', user?.id)
          
    //         if (error) {
    //           console.log(error)
    //           return
    //         }
          
    //         setLikedPosts(likedPosts.map(like => like.post_id))
    //     }
    //   }

    //   const updateLikeCount = async (postId: string) => {

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

    //     const { data: { user } } = await supabase.auth.getUser()

    //     if (user) {

    //         // Optimistically update the UI
    //         setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);

    //         const [error, data] = await likeVideo({ user_id: user!.id, post_id: postId });

    //         if (error) {
    //         console.error('Error liking post', error);
    //         } else {
    //         console.log('Post liked', data);
    //         updateLikeCount(postId)
    //         }

    //         toast({
    //             title: "You liked that one uh?",
    //             description: `Post was saved for you!`,
    //         })
    //     } else {
    //         router.push('/login')
    //     }
    // };

    //   // unlike a post with unlikeVideo from lib/index.ts
    //     const handleUnlike = async (postId: string) => {

    //           // Optimistically update the UI
    //         setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId));
    
    //         const { data: { user } } = await supabase.auth.getUser()
    //         const [error, data] = await unlikeVideo({ user_id: user!.id, post_id: postId });
    
    //         if (error) {
    //         console.error('Error liking post', error);
    //         } else {
    //         console.log('Post liked', data);
    //         updateUnlikeCount(postId)
    //         }
    //     };



    //     const handleDragEnd = ( info: any, postId: string ) => {
    //         console.log(info.offsetX);
            
    //         if (info && info.offsetX < -50) {
    //           handleLike(postId);
    //         } else if (info && info.offsetX > 50) {
    //           <Dialog/>
    //         }
    //       };


    //   useEffect(() => {
    //     // fetchLikedPosts()
    //   }, [])
      
    
  return (
    <section key='forYou' className='h-fit w-full md:mt-15 mt-8 flex flex-row justify-evenly gap-5 md:px-20 px-8 flex-wrap'>
            {posts && posts.map((posts: any, key: number) => {
                    return (
                        <>
                        <PostInFeed posts={posts} id={posts.id}/>
                        {/* <motion.div
                            key={key}
                            className='h-80 md:w-1/6 w-full rounded hover:opacity-85'
                            style={{ backgroundImage: `url(${posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                            onMouseEnter={() => setIsHovered(posts.id)}
                            onMouseLeave={() => setIsHovered(null)}
                            drag='x'
                            onDragEnd={(info) => handleDragEnd(info, posts.id)}
                            dragConstraints={{ left: -50, right: 50 }}
                            dragElastic={0.2}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                                {isHovered === posts.id && (
                                    <div key={key} className='w-full h-full flex flex-col justify-between'>
                                            <div className="w-full px-3 py-3 flex flex-row items-center justify-between">
                                                <Link href={`/profile/${posts.user_id}`} >
                                                    <h4>{posts.profiles.username}</h4>
                                                </Link>
                                                <Share size={20}/>
                                            </div>

                                            <div className='w-full h-full flex' >
                                                <Link href={`/post/${posts.id}`} key={key} legacyBehavior>
                                                    <a className='w-full h-full flex'></a>
                                                </Link>
                                            </div>

                                            <div  className="w-full px-3 py-3 flex flex-row items-center justify-between">
                                                <button 
                                                    className='bg-white text-black w-auto max-w-[40vw] md:w-auto md:max-w-[8vw] flex flex-row rounded-lg py-1 px-2 items-center gap-2 justify-start overflow-hidden'
                                                    // style={{ maxWidth: '8vw' }}
                                                    onClick={() => {
                                                        const url = posts.product_link.startsWith('http') ? posts.product_link : `http://${posts.product_link}`;
                                                        window.open(url, '_blank');
                                                    }}
                                                    >
                                                    <ArrowUpRight className='flex-shrink-0' size={18} />
                                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        <span>{posts.product_name}</span>
                                                    </div>
                                                </button>
                                                {
                                                    likedPosts.includes(posts.id) ? (
                                                        <button  onClick={(event) => handleUnlike(posts.id)}>
                                                            <Heart size={20} fill='red' color='red'/>
                                                        </button>
                                                    ) : (
                                                        <button onClick={(event) => handleLike(posts.id)}>
                                                            <Heart size={20}/>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                    </div>
                                )}
                        </motion.div> */}
                        </>
                    )
                })
            }
    </section>
  )
}
