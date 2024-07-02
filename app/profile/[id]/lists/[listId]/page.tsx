'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'

import { ArrowUpRight, Heart, Instagram, Pin, Plus, Share } from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { usePathname } from 'next/navigation'
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

const ListDetail = () => {

    const pathname = usePathname()
    const listId = pathname.split('/')[4]
    const [list, setList] = useState<any[]>([])
    const [posts, setPosts] = useState<any[]>([])
    const [pins, setPins] = useState<any[]>([])
    const [igposts, setIgposts] = useState<any[]>([])
    const [isHovered, setIsHovered] = useState(null);
    const [tag, setTag] = useState<string>('ig');
    const [url, setUrl] = useState<string>('');
    const [select, setSelect] = useState<string>('Runways');


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
        fetchList();
    }, [listId])

    useEffect(() => {
        fetchPosts();
        fetchPinterestPosts();
        fetchIgPosts();
    }, [select])

    console.log(select)
    
    
  return (
    <div className='flex w-full h-full mt-10 mb-10'>
        {
            list.map((list: any, index: number) => (
                <div className='w-full flex gap-1 md:gap-3 flex-col' key={index}>
                    <div className='w-full flex justify-between items-center flex-row'>
                        <h3 className='text-m font-semibold text-black uppercase'>{list.name}</h3>
                        <Select onValueChange={setSelect}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={select} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Runways">Runways</SelectItem>
                            <SelectItem value="Pins">Pins</SelectItem>
                            <SelectItem value="Ig posts">Ig posts</SelectItem>
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
                    <div className='w-full flex flex-row gap-5 flex-wrap'>
                        <p className='text-xs font-medium text-gray md:hidden'>{list.private === true ? 'Private' : 'Public'}</p>
                    {
                        select == 'Runways' ? posts.map((post: any, key: number) => (
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
                                        className='bg-white text-sm text-black w-auto max-w-[40vw] md:w-auto md:max-w-[8vw] flex flex-row rounded-lg py-1 px-2 items-center gap-2 justify-start overflow-hidden'
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          const url = post.posts.product_link.startsWith('http') ? post.posts.product_link : `http://${post.posts.product_link}`;
                                          window.open(url, '_blank');
                                        }}>
                                        <ArrowUpRight className='flex-shrink-0' size={16} />
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                          <span>
                                            {post.posts.product_name}
                                          </span>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                        ))
                        : ''
                    }
                    {
                      select == 'Pins' ? pins.map((pin: any, key: number) => (
                        <div>
                          <PinterestEmbed url={pin.url} width={212} height={320}/>
                        </div>
                      ))
                      : ''
                    }
                    {
                      select == 'Ig posts' ? igposts.map((igpost: any, key: number) => (
                        <div>
                          <InstagramEmbed url={igpost.url} width={328}/>
                        </div>
                      ))
                      : ''
                    }
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ListDetail