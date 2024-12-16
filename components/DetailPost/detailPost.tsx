
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { Bookmark, Forward, Heart, Plus, Share } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { createClient } from '@/utils/supabase/server';
import { BuyButton } from './BuyButton';
import { BuyButtonMD } from './BuyButtonMD';
import { FeaturedLists } from './FeaturedLists';
import { AddToListButton } from './AddToListButton';
import { MobileButtons } from './MobileButtons';



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
    <div className='mt-10 md:mt-0 md:h-[550px] h-auto rounded-lg md:mb-0'>
                {
                    detailPost?.map((detailPost: any, key: number) => {
                        return (
                            <div key={key} className='flex md:flex-row flex-col h-fit w-full md:gap-4'>
                                <div className='flex w-full md:hidden px-4 justify-between'>
                                    <div>
                                        <h3 className='font-medium text-lg'>{detailPost.profiles.username}</h3>
                                        <p>{detailPost.description}</p>
                                    </div>
                                    <button className='text-dark'>
                                        Follow +
                                    </button>
                                </div>
                                <div className='rounded-l-lg md:h-[650px] md:w-4/6 flex relative px-4 md:mx-9 py-2 flex justify-center md:pt-20'>
                                    <Image priority className='md:rounded-t-lg md:rounded-l-lg rounded-lg h-[55vh] md:h-full md:w-4/5' src={detailPost.src} alt='Image' width={500} height={200}/>
                                </div>
                                <div className='flex md:hidden flex-col px-4'>
                                    <p className='text-dark'>Product</p>
                                    <div className='flex flex-row justify-between'>
                                       <h5 className='font-medium'>{detailPost.product_name}</h5>
                                       <BuyButton productLink={detailPost.product_link}/>
                                    </div>
                                </div>
                                <div className='md:py-10 md:px-10 py-2 px-3 w-full md:flex-1 md:w-2/6 flex flex-col justify-start gap-9 md:gap-5 md:border-l md:border-light'>
                                    <div className='md:flex md:flex-col md:w-full justify-between hidden gap-5'>
                                        <Link href={`/profile/${detailPost.profiles.id}`}>
                                            <h1 className='text-md'>{detailPost.profiles.username}</h1>
                                        </Link>
                                        {/* <h2 className='font-semibold text-2xl'>{detailPost.title}</h2> */}
                                        <p className='text-dark text-sm'>{detailPost.description}</p>
                                        <div className='flex flex-row gap-2 text-sm items-center justify-center w-full'>
                                            <button className='px-5 py-1 rounded-2xl bg-light flex gap-2 text-sm text-dark'>
                                                <Heart size={20} color='gray'/>
                                                Like
                                            </button>

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
                                            {/* <DropdownMenu>
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
                                            </DropdownMenu> */}
                                            {/* <button 
                                                className='px-5 py-1 rounded-2xl bg-light flex gap-2 text-sm text-dark'
                                            >
                                                <Bookmark size={20} color='gray'/>
                                                Save
                                            </button> */}
                                            <AddToListButton postId={postId}/>
                                            <button 
                                                className='px-5 py-1 rounded-2xl bg-light flex gap-2 text-sm text-dark'
                                                // onClick={handleCopy}
                                            >
                                                <Forward size={20} color='gray'/>
                                                Share
                                            </button>

                                            {/* <button>
                                                FOLLOW
                                            </button> */}
                                        </div>
                                    </div>
                                    {/* <div className='md:flex hidden'>
                                        <h2 className='font-semibold text-2xl'>{detailPost.title}</h2>
                                        <p>{detailPost.description}</p>
                                    </div> */}
                                    <MobileButtons postId={postId}/>
                                    <BuyButtonMD productLink={detailPost.product_link}/>
                                    <FeaturedLists postId={postId}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
  )
}

export default DetailPost
