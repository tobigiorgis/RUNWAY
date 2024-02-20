'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, Heart, Share } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/ui/Footer';
import { likeVideo, unlikeVideo } from '@/lib';
import { useToast } from '@/components/ui/use-toast';

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState<any>([]);
    const [isHovered, setIsHovered] = useState(null);
    const [likedPosts, setLikedPosts] = useState<any[]>([]);

    const { toast } = useToast()

    const searchParams = useSearchParams()
 
    const query = searchParams.get('query')

  
    useEffect(() => {
      const fetchResults = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select(`*, profiles(
            username
            )`)
          .or(`title.ilike.%${query}%,product_name.ilike.%${query}%`);
  
        if (error) {
          console.log(error);
        } else {
          setSearchResults(data);
        }
      }
  
      if (query) {
        fetchResults();
      }
    }, [query]);

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

      useEffect(() => {
        fetchLikedPosts()
      }, [])
      


  return (
    <main className='h-fit w-full md:mt-20 flex flex-col justify-evenly gap-7 md:px-24 pt-12 flex-wrap items-center'>
        <h1 className='mt-10'>Results for: "{query}"</h1>
        <div className='w-full h-full flex md:flex-row gap-7 flex-col px-7 pb-7'>
        {
            searchResults.map((posts: any, key: number) => (
              <div
              key={key}
              className='h-80 md:w-1/6 w-full rounded hover:opacity-85'
              style={{ backgroundImage: `url(${posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              onMouseEnter={() => setIsHovered(posts.id)}
              onMouseLeave={() => setIsHovered(null)}
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
                                  className='bg-white text-black flex flex-row rounded-lg py-1  px-2 items-center gap-2 justify-center'
                                  onClick={() => {
                                      const url = posts.product_link.startsWith('http') ? posts.product_link : `http://${posts.product_link}`;
                                      window.open(url, '_blank');
                                  }}>
                                      <ArrowUpRight size={18} />
                                      {posts.product_name}
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
          </div>
            ))
        }
        </div>
        <Footer/>
    </main>
  )
}

export default SearchPage