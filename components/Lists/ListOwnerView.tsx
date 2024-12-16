'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ArrowUpRight, Heart, Instagram, Pin, Plus, Share } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { addToList } from '@/lib'
import { toast } from '@/components/ui/use-toast'
import { InstagramEmbed, PinterestEmbed } from 'react-social-media-embed'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'



export const ListOwnerView = ({ list }: { list: any }) => {

    const supabase = createClient()
    const router = useRouter()
    
    const searchParams = useSearchParams()
    const type = searchParams.get('type') || 'Runways'

    const pathname = usePathname()
    const listId = pathname.split('/')[3]
    const [pins, setPins] = useState<any[]>([])
    const [igposts, setIgposts] = useState<any[]>([])
    const [tag, setTag] = useState<string>('ig');
    const [url, setUrl] = useState<string>('');


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

    const curatePost = async (url: string, type: string) => {
      const [error, data] = await addToList({ list_id: listId, url, type });
      if (error) {
        console.error('Error adding post to list:', error);
      } else {
        toast({
          title: "Pin added to list!",
          description: `Let's go!`,
      })
      }
    }
    
    useEffect(() => {
        fetchPinterestPosts();
        fetchIgPosts();
    }, [type])

    const handleSelectChange = (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('type', value)
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }

     // Ensure list is an array
  const listArray = Array.isArray(list) ? list : [list]

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='flex w-full h-full md:mt-5 mb-10 flex-col'>
                  <div className='w-full flex justify-between items-center flex-row'>
                      <h3 className='text-m font-semibold text-black uppercase'></h3>
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
                      <Dialog>
                        <DialogTrigger className='hover:bg-zinc rounded-sm cursor-pointer' asChild>
                          <Plus size={20} />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Curate post</DialogTitle>
                            <DialogDescription>
                              Add a post from Pinterest or Instagram to save on your RUNWAY list.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                URL
                              </Label>
                              <Input
                                id="username"
                                className="col-span-3"
                                placeholder='paste here'
                                onChange={e => setUrl(e.target.value)}
                                value={url}
                              />
                            </div>
                          </div>
                          <DialogFooter className='flex flex-row gap-2'>
                            <Button onClick={e => setTag('pins')} variant="outline" className="gap-1 focus:bg-black focus:text-white">
                              <Pin size={20} />
                              Pinterest
                            </Button>
                            <Button onClick={e => setTag('ig')} variant="outline" className="gap-1 focus:bg-black focus:text-white">
                              <Instagram size={20} />
                              Instagram
                            </Button>
                            <Button onClick={() => curatePost(url, tag)} className='flex justify-center bg-gray text-black w-full' type="submit">Add</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                  </div>
                    <div className='w-full flex flex-row gap-10 mt-5 flex-wrap'>
                    {
                        type == 'Runways' ? listArray.map((post: any, key: number) => (
                          <div className='md:w-1/5 w-full h-80 rounded hover:opacity-85' key={key}>
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
                              className='rounded-md w-full h-full'
                            />
                                <div className='w-full flex flex-row justify-between pt-2'>
                                  <Link href={`/profile/${post.user_id}`}>
                                    <h4 className='text-xs'>{post.posts.profiles.username}</h4>
                                  </Link>
                                  <button className='text-xs text-sky hover:font-semibold hover:cursor-pointer'>
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
    </div>
    </Suspense>
  )
}
