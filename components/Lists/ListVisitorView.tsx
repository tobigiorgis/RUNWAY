'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ArrowUpRight, Heart, Instagram, Pin, Plus, Share } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InstagramEmbed, PinterestEmbed } from 'react-social-media-embed'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { followList } from '@/lib'
import { useToast } from '../ui/use-toast'



export const ListVisitorView = ({ list }: { list: any }) => {

    const supabase = createClient()
    const { toast } = useToast()
    const router = useRouter()
    
    const searchParams = useSearchParams()
    const type = searchParams.get('type') || 'Runways'

    const pathname = usePathname()
    const listId = pathname.split('/')[3]
    const [pins, setPins] = useState<any[]>([])
    const [igposts, setIgposts] = useState<any[]>([])
    const [isFollowing, setIsFollowing] = useState<boolean>(false)


    const fetchPinterestPosts = async () => {
        const { data, error } = await supabase
          .from('pins_in_lists')
          .select('url')
          .eq('list_id', listId);
        
          if (error) {
              console.error('Error fetching posts:', error);
          }
        
          if (data) {
              setPins(data);
          }
    }

    const fetchIgPosts = async () => {
        const { data, error } = await supabase
          .from('ig_posts_in_lists')
          .select('url')
          .eq('list_id', listId);
        
          if (error) {
              console.error('Error fetching posts:', error);
          }
        
          if (data) {
              setIgposts(data);
            }
    }

    const checkFollowStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('users_following_lists')
        .select('*')
        .eq('user_id', user?.id)
        .eq('list_id', listId)
        .single()
  
      if (error) {
        console.error('Error checking follow status:', error)
      }
  
      if (data) {
        setIsFollowing(true)
      }
    }

    
    useEffect(() => {
        fetchPinterestPosts();
        fetchIgPosts();
        checkFollowStatus();
    }, [type])


    const onFollow = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const [error, data] = await followList({ user_id: user!.id, list_id: listId });

      if (error) {
        console.error('Error following user', error);
      } else {
        console.log('User followed', data);
        toast({
          title: "Great news!",
          description: "You're now following this list! ✨",
      })
      }
    }

    const handleSelectChange = (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('type', value)
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }

     // Ensure list is an array
  const listArray = Array.isArray(list) ? list : [list]

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='flex w-full h-full flex-col md:mt-5 mb-20'>
                    <div className='w-full flex justify-between items-center flex-row'>
                        <h3 className='text-m font-semibold text-black uppercase'>{list.name}</h3>
                        <Select onValueChange={handleSelectChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={type} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Runways">Runways</SelectItem>
                            <SelectItem value="Pins">Pins</SelectItem>
                            <SelectItem value="Igposts">Ig posts</SelectItem>
                          </SelectContent>
                        </Select>
                        {isFollowing ? (
                          <button className='text-sm text-sky font-medium hover:font-medium'>
                            Following
                          </button>
                        ) : (
                          <button className='text-sm hover:font-medium' onClick={onFollow}>
                            + Follow
                          </button>
                        )}
                    </div>
                {/* <div className='w-full flex gap-1 md:gap-3 flex-col'> */}
                    <div className='w-full flex flex-row gap-10 mt-5 flex-wrap'>
                        {/* <p className='text-xs font-medium text-gray md:hidden'>{list.private === true ? 'Private' : 'Public'}</p> */}
                    {
                        type == 'Runways' ? listArray.map((post: any, key: number) => (
                          <div className='md:w-1/5 w-full h-80 rounded' key={key}>
                            {/* <div 
                            style={{ backgroundImage: `url(${post.posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                            className='h-full w-full rounded' 
                            // key={key}
                            // onMouseEnter={() => setIsHovered(post.posts.id)}
                            // onMouseLeave={() => setIsHovered(null)}
                          > */}
                            <Image
                              src={post.posts.src}
                              width={212}
                              height={320}
                              alt={`Image ${key + 1}`}
                              className='rounded-md hover:opacity-85 w-full h-full'
                            />
                                <div className='w-full flex flex-row justify-between pt-2'>
                                  <Link href={`/profile/${post.user_id}`}>
                                    <h4 className='text-xs hover:font-medium hover:cursor-pointer'>{post.posts.profiles.username}</h4>
                                  </Link>
                                  <button className='text-xs text-sky hover:font-medium hover:cursor-pointer'>
                                    <Link className='w-full' href={post.posts.product_link} target="_blank" rel="noopener noreferrer">
                                      Buy
                                    </Link>
                                  </button>
                                </div>
                            </div>
                          // </div>
                        ))
                        : ''
                    }
                    {/* I want to create a div if posts = null */}
                    {
                      list.length === 0 ? (
                        <div className='w-full h-full flex mt-20 justify-center items-center flex-col'>
                          <h4 className='text-md text-gray'>No posts in this list yet</h4>
                          <Link href={'/discover'} className='font-medium text-sm'>
                            Go discover outfits
                          </Link>
                        </div>
                      ) : ''
                    }
                    {
                      type == 'Pins' ? pins.map((pin: any, key: number) => (
                        <div
                          className='flex justify-center w-full md:w-1/5'
                          key={key}
                        >
                          <PinterestEmbed url={pin.url} width={212} height={320}/>
                        </div>
                      ))
                      : ''
                    }
                    {
                      type == 'Igposts' ? igposts.map((igpost: any, key: number) => (
                        <div
                          className='flex justify-center'
                          key={key}
                        >
                          <InstagramEmbed url={igpost.url} width={328}/>
                        </div>
                      ))
                      : ''
                    }
                    </div>
                {/* </div> */}
    </div>
    </Suspense>
  )
}

