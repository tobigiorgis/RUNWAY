import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import { ArrowUpRight, Heart, Share } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { likeVideo, unlikeVideo } from '@/lib';


export const LikedPosts = () => {

    const [feedPosts, setFeedPosts] = useState<any[]>([])
    const [isHovered, setIsHovered] = useState(null);
    const [likedPosts, setLikedPosts] = useState<any[]>([]);

    const getPosts = async () => {
      const { data: { user } } = await supabase.auth.getUser()
    
      // Fetch the liked posts
      const { data: likedPosts, error: errorLikedPosts } = await supabase
        .from('users_posts_likes')
        .select('post_id')
        .eq('user_id', user!.id)
    
      if (errorLikedPosts) {
        console.log(errorLikedPosts)
        return
      }
    
      // Set the likedPosts state
      setLikedPosts(likedPosts.map(like => like.post_id))
    
      // Fetch posts
      const { data: posts, error: errorPosts } = await supabase
        .from('users_posts_likes')
        .select(`*, posts:post_id(
            src,
            product_name,
            product_link,
            profiles:user_id(
                username
            )
            )`)
        .eq('user_id', user!.id)
        .order(
          'created_at',
          { ascending: false }
        )  
    
      if (errorPosts) {
        console.log(errorPosts)
        return
      }
    
      if (posts) {
        setFeedPosts(posts)
        console.log(posts)
      }
    
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
  
      const { data: { user } } = await supabase.auth.getUser()
      const [error, data] = await likeVideo({ user_id: user!.id, post_id: postId });
  
      if (error) {
        console.error('Error liking post', error);
      } else {
        console.log('Post liked', data);
        updateLikeCount(postId)
      }
    };
  
    // unlike a post with unlikeVideo from lib/index.ts
      const handleUnlike = async (postId: string) => {
  
          const { data: { user } } = await supabase.auth.getUser()
          const [error, data] = await unlikeVideo({ user_id: user!.id, post_id: postId });
  
          if (error) {
          console.error('Error liking post', error);
          } else {
          console.log('Post liked', data);
          updateUnlikeCount(postId)
          }
      };
  
    useEffect(() => {
      getPosts()
      // fetchLikedPosts()
    }, [])
  
    return (
      <>
      {
        feedPosts.map((feedPost: any, key: number) => {
          return (
          <div 
                style={{ backgroundImage: `url(${feedPost.posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                className='md:w-1/5 w-full h-80 rounded hover:opacity-85' 
                key={key}
                onMouseEnter={() => setIsHovered(feedPost.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                    {isHovered === feedPost.id && (
                      <div className='w-full h-full flex flex-col justify-between'>
                        <div className="w-full px-3 py-3 flex flex-row items-center justify-between">
                          <Link href={`/profile/${feedPost.user_id}`}>
                            <h4>{feedPost.posts.profiles.username}</h4>
                          </Link>
                          <Share size={20}/>
                        </div>
  
                        <div className='w-full h-full flex' >
                          <Link href={`/post/${feedPost.id}`} key={key} legacyBehavior>
                            <a className='w-full h-full flex'></a>
                          </Link>
                        </div>

                        <div  className="w-full px-3 py-3 flex flex-row items-center justify-between">
                          <button 
                            className='bg-white text-black text-sm w-auto max-w-[40vw] md:w-auto md:max-w-[8vw] flex flex-row rounded-lg py-1  px-2 items-center gap-2 justify-center'
                            onClick={() => {
                              const url = feedPost.product_link.startsWith('http') ? feedPost.product_link : `http://${feedPost.product_link}`;
                              window.open(url, '_blank');
                            }}>
                            <ArrowUpRight size={16} />
                            {feedPost.posts.product_name}
                          </button>
                          {
                            likedPosts.includes(feedPost.post_id) ? (
                              <button  onClick={() => handleUnlike(feedPost.post_id)}>
                                <Heart size={20} fill='red' color='red'/>
                              </button>
                            ) : (
                              <button onClick={() => handleLike(feedPost.post_id)}>
                                <Heart size={20}/>
                              </button>
                            )
                          }
                        </div>
                      </div>
                  )}
            </div>
        )        
      })
    }
    </>
  )
}
