import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Share, ArrowUpRight, Heart } from 'lucide-react'

import { likeVideo, unlikeVideo } from '@/lib'
import { createClient } from '@/utils/supabase/server'

export const Following = async () => {

    // const [followingPosts, setFollowingPosts] = useState<any[]>([])
    // const [isHovered, setIsHovered] = useState(null);
    // const [likedPosts, setLikedPosts] = useState<any[]>([]);
    // const router = useRouter()
    
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    
    let { data: following, error } = await supabase
        .from('users_followers')
        .select('follower_id')
        .eq('user_id', user?.id)
    
    const followingUserIds = following?.map(follow => follow.follower_id)

    let { data: posts, error: errorPosts } = await supabase
        .from('posts')
        .select(`*, profiles(username)`)
        .in('user_id', followingUserIds || [])

    if (errorPosts) {
        console.log(errorPosts)
    }
    
    console.log(following);

    if (!following) {
        return <p className='mt-10'>No posts found.</p>
    }
    if (error) {
        console.log(error)
        return
    }

        
            
          //     // Get the user_ids of the users that the logged-in user is following
          //     const followingUserIds = following?.map(follow => follow.follower_id)
            
          //     // Get the posts from the users that the logged-in user is following
          //     let { data: posts, error: errorPosts } = await supabase
          //       .from('posts')
          //       .select(`*, profiles(username)`)
          //       .in('user_id', followingUserIds || [])
            
          //     if (errorPosts) {
          //       console.log(errorPosts)
          //       return
          //     }
          
          //     setFollowingPosts(posts || [])
          //     console.log(followingPosts);
          //   }
          // }

        //   const fetchLikedPosts = async () => {
        //     const { data: { user } } = await supabase.auth.getUser()
        //     if (user) {
        //       const { data: likedPosts, error } = await supabase
        //         .from('users_posts_likes')
        //         .select('post_id')
        //         .eq('user_id', user?.id)
            
        //       if (error) {
        //         console.log(error)
        //         return
        //       }
            
        //       setLikedPosts(likedPosts.map(like => like.post_id))
        //     }
    
        // useEffect(() => {
        //     getFollowingPosts()
        //     fetchLikedPosts()
        // }, [])

    //     const updateLikeCount = async (postId: string) => {

    //       const { data: post, error: fetchError } = await supabase
    //       .from('posts')
    //       .select('likes')
    //       .eq('id', postId);
      
    //       if (fetchError) {
    //           console.log(fetchError);
    //           return;
    //       }
      
    //       const likes_count = post[0].likes;
  
    //       const { data: like, error } = await supabase
    //       .from('posts')
    //       .update({ likes: likes_count + 1})
    //       .eq('id', postId)
  
    //       if (error) {
    //           console.log(error)
    //       }
          
    //       return [error, like]
    //   }
  
      // update like count when unlike
    //   const updateUnlikeCount = async (postId: string) => {
  
    //       const { data: post, error: fetchError } = await supabase
    //       .from('posts')
    //       .select('likes')
    //       .eq('id', postId);
      
    //       if (fetchError) {
    //           console.log(fetchError);
    //           return;
    //       }
      
    //       const likes_count = post[0].likes;
  
    //       const { data: like, error } = await supabase
    //       .from('posts')
    //       .update({ likes: likes_count - 1})
    //       .eq('id', postId)
  
    //       if (error) {
    //           console.log(error)
    //       }
          
    //       return [error, like]
    //   }

        // const handleLike = async (postId: string) => {

          
        //   const { data: { user } } = await supabase.auth.getUser()
        //   if (user) {
        //     // Optimistically update the UI
        //     setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);

        //     const [error, data] = await likeVideo({ user_id: user!.id, post_id: postId });
        //     if (error) {
        //       console.error('Error liking post', error);
        //     } else {
        //       console.log('Post liked', data);
        //       updateLikeCount(postId)
        //     }
        //   } else {
        //     router.push('/login')
        //   }
        // };


        // const handleUnlike = async (postId: string) => {

        //     // Optimistically update the UI
        //     setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);
    
        //     const { data: { user } } = await supabase.auth.getUser()
        //     const [error, data] = await unlikeVideo({ user_id: user!.id, post_id: postId });
    
        //     if (error) {
        //     console.error('Error liking post', error);
        //     } else {
        //     console.log('Post liked', data);
        //     updateUnlikeCount(postId)
        //     }
        // };



  return (
    <section key='following' className='h-fit w-full md:mt-20 mt-8 flex flex-row gap-7 justify-evenly md:px-20 px-8 flex-wrap'>
        {
            posts && posts.map((posts: any, key: number) => {
                return (
                <div
                    key={key}
                    className='h-80 md:w-1/6 w-full rounded hover:opacity-85'
                    style={{ backgroundImage: `url(${posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                </div>
            )}
        )
        }
            {/* {
                following && following.map((posts: any, key: number) => {
                    return (
                        <div
                            key={key}
                            className='h-80 md:w-1/6 w-full rounded hover:opacity-85'
                            style={{ backgroundImage: `url(${posts.profiles.posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                        >
                                    <div key={key} className='w-full h-full flex flex-col justify-between'>
                                            <div className="w-full px-3 py-3 flex flex-row items-center justify-between">
                                                <Link href={`/profile/${posts.profiles.user_id}`}>
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
                                                className='bg-white text-black flex flex-row w-auto max-w-[40vw] md:w-auto md:max-w-[8vw] rounded-lg py-1  px-2 items-center gap-2 justify-center'
                                                onClick={() => {
                                                    const url = posts.product_link.startsWith('http') ? posts.profiles.posts.product_link : `http://${posts.profiles.postsproduct_link}`;
                                                    window.open(url, '_blank');
                                                }}>
                                                    <ArrowUpRight size={18} />
                                                    {posts.profiles.posts.description}
                                                </button>

                                                {
                                                    likedPosts.includes(posts.id) ? (
                                                        <button onClick={(event) => handleUnlike(posts.id)}>
                                                            <Heart size={20} fill='red' color='red'/>
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleLike(posts.id)}>
                                                            <Heart size={20}/>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                    </div>
                        </div>
                    )
                })
            } */}
    </section>
  )
}
