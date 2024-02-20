'use client'

import { CardSkeleton } from '@/components/ui/skeletons'
import { supabase } from '@/lib/supabase'
import { ArrowUpRight, Heart, Share } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const ListDetail = () => {

    const pathname = usePathname()
    const listId = pathname.split('/')[4]
    const [list, setList] = useState<any[]>([])
    const [posts, setPosts] = useState<any[]>([])
    const [isHovered, setIsHovered] = useState(null);

    const fetchList = async () => {
      const { data, error } = await supabase
        .from('users_lists')
        .select('*')
        .eq('id', listId);
      
        if (error) {
            console.error('Error fetching list:', error);
        }
      
        if (data) {
            setList(data);
        }
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase
          .from('posts_in_lists')
          .select('*, posts(*, profiles(username))')
          .eq('list_id', listId);
        
          if (error) {
              console.error('Error fetching posts:', error);
          }
        
          if (data) {
              setPosts(data);
          }
    }
      
    useEffect(() => {
        fetchList();
        fetchPosts();
    }, [listId])
        
    
  return (
    <div className='flex w-full h-full mt-10'>
        {
            list.map((list: any, index: number) => (
                <div className='w-full flex gap-5 flex-col' key={index}>
                    <div className='w-full flex justify-between flex-row'>
                        <h3 className='text-m font-semibold text-gray-400 uppercase'>{list.name}</h3>
                        <p className='text-xs font-medium text-gray-300'>{list.private === true ? 'Private' : 'Public'}</p>
                    </div>
                    <div className='w-full flex flex-row gap-7 flex-wrap'>
                    {
                        posts.map((post: any, key: number) => (
                            <div 
                            style={{ backgroundImage: `url(${post.posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                            className='md:w-1/5 w-full h-80 rounded hover:opacity-85' 
                            key={key}
                            onMouseEnter={() => setIsHovered(post.posts.id)}
                            onMouseLeave={() => setIsHovered(null)}
                          >
                                {isHovered === post.posts.id && (
                                  <div className='w-full h-full flex flex-col justify-between'>
                                    <div className="w-full px-3 py-3 flex flex-row items-center justify-between">
                                      <Link href={`/profile/${post.user_id}`}>
                                        <h4>{post.posts.profiles.username}</h4>
                                      </Link>
                                      <Share size={20}/>
                                    </div>
              
                                    <div className='w-full h-full flex' >
                                      <Link href={`/post/${post.posts.id}`} key={key} legacyBehavior>
                                          <a className='w-full h-full flex'></a>
                                      </Link>
                                     </div>
              
                                    <div  className="w-full px-3 py-3 flex flex-row items-center justify-between">
                                      <button 
                                        className='bg-white text-black text-sm flex flex-row rounded-lg py-1  px-2 items-center gap-2 justify-center'
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          const url = post.posts.product_link.startsWith('http') ? post.posts.product_link : `http://${post.posts.product_link}`;
                                          window.open(url, '_blank');
                                        }}>
                                        <ArrowUpRight size={16} />
                                        {post.posts.product_name}
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                        ))
                    }
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ListDetail