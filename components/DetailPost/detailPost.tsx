
import React from 'react'
import Image from 'next/image'


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { Heart, Plus, Share } from 'lucide-react';
import Link from 'next/link';
import { toast } from '../ui/use-toast';
import { createClient } from '@/utils/supabase/client';

 const DetailPost = async ({postId} : {postId: string}) => {

    const supabase = createClient();

    const { data: detailPost, error } = await supabase
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

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    
        toast({
          title: "Copied to clipboard.",
          description: "You can share it now! ✨",
        })
      }
      
  return (
    <div className=' md:h-[550px] h-auto rounded-lg md:mt-10 md:mb-0'>
                {
                    detailPost?.map((detailPost: any, key: number) => {
                        return (
                            <div key={key} className='flex md:flex-row flex-col h-fit w-full md:gap-12 gap-1'>
                                <div className='flex w-full md:hidden px-4 justify-between'>
                                    <div>
                                        <h3 className='font-medium text-lg'>{detailPost.profiles.username}</h3>
                                        <p>{detailPost.description}</p>
                                    </div>
                                    <button className='text-dark'>
                                        Follow +
                                    </button>
                                </div>
                                <div className='rounded-l-lg md:h-[550px] flex-1 relative px-4 py-2'>
                                    <Image priority className='md:rounded-t-lg md:rounded-l-lg rounded-lg h-[55vh] md:h-full w-full' src={detailPost.src} alt='Image' width={500} height={200}/>
                                </div>
                                <div className='flex md:hidden flex-col px-4'>
                                    <p className='text-gray'>Product</p>
                                    <div className='flex flex-row justify-between'>
                                       <h5 className='font-medium'>{detailPost.product_name}</h5>
                                       <button 
                                            className='text-sky text-sm'
                                            // onClick={() => {
                                            //     const url = detailPost.product_link.startsWith('http') ? detailPost.product_link : `http://${detailPost.product_link}`;
                                            //         window.open(url, '_blank');
                                            //     }}
                                        >
                                            Buy
                                       </button>
                                    </div>
                                </div>
                                <div className='md:p-5 py-2 px-3 w-full md:flex-1 flex flex-col justify-between gap-9'>
                                    <div className='md:flex md:flex-row md:w-full justify-between hidden'>
                                        <Link href={`/profile/${detailPost.profiles.id}`}>
                                            <h1 className='font-medium text-lg'>{detailPost.profiles.username}</h1>
                                        </Link>
                                        <div className='flex flex-row gap-3 text-sm items-center'>
                                            <p>{detailPost.likes}</p>
                                        {/* {
                                            likedPosts.includes(detailPost.id) ? (
                                                <button  onClick={(event) => handleUnlike(detailPost.id)}>
                                                    <Heart size={20} fill='red' color='red'/>
                                                </button>
                                            ) : (
                                                <button onClick={(event) => handleLike(detailPost.id)}>
                                                    LIKE
                                                </button>
                                            )
                                        } */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="focus:outline-none">ADD TO LIST</DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Lists</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {/* {
                                                        lists.map((list, index) => (
                                                            <DropdownMenuItem key={index} onClick={() => addPostToList(list.id)}>
                                                                {list.name}
                                                            </DropdownMenuItem>
                                                        ))
                                                    } */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <button 
                                                // onClick={handleCopy}
                                            >
                                                SHARE
                                            </button>

                                            {/* <button>
                                                FOLLOW
                                            </button> */}
                                        </div>
                                    </div>
                                    <div className='md:flex hidden'>
                                        <h2 className='font-semibold text-2xl'>{detailPost.title}</h2>
                                        <p>{detailPost.description}</p>
                                        {/* <p>{feedPosts.product_name}</p> */}
                                    </div>
                                    <div className='flex md:hidden gap-2 justify-center w-full pt-3'>
                                        <button className='bg-gray p-3 rounded-3xl'>
                                            <Plus size={20} color='gray'/>
                                        </button>
                                        {/* {
                                            likedPosts.includes(detailPost.id) ? (
                                                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleUnlike(feedPosts.id)}>
                                                    <Heart size={20} fill='red' color='red'/>
                                                </button>
                                            ) : (
                                                <button className='bg-gray p-3 rounded-3xl' onClick={(event) => handleLike(feedPosts.id)}>
                                                    <Heart size={20} color='gray'/>
                                                </button>
                                            )
                                        } */}
                                        <button className='bg-gray p-3 rounded-3xl'>
                                            <Share size={20} color='gray'/>
                                        </button>
                                    </div>
                                    {/* <div className='flex flex-col gap-3 px-1'>
                                        <h3 className='font-medium text-gray md:text-black'>Lists that include this post ↓</h3>
                                        {
                                            featuredLists.length === 0 ? 
                                                <p className='text-gray'>No lists yet</p> 
                                            : null
                                        }
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
                                    </div> */}
                                        <button
                                            className='text-sm hover:font-semibold hidden md:flex md:justify-center'
                                            // onClick={() => {
                                            // const url = detailPost.product_link.startsWith('http') ? detailPost.product_link : `http://${detailPost.product_link}`;
                                            //     window.open(url, '_blank');
                                            // }}
                                        >
                                            BUY ITEM
                                        </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
  )
}

export default DetailPost
