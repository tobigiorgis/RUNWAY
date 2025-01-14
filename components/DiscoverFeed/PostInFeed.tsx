import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { createClient } from '@/utils/supabase/server'

const PostInFeed = async ({posts, id}: any) => {

    const supabase = createClient()

    const { data: buyPost, error } = await supabase
    .from('products')
    .select('product_link')
    .eq('post_id', id)
    .limit(1)
    
    if (error) {
        console.log(error)
    }

  return (
    <div
        key={id}
        className='gap-3 md:w-1/6 w-full rounded flex flex-col'
    >
        <div className='w-full flex flex-row justify-between md:hidden'>
                                    {/* <div style={{ backgroundImage: `url(${posts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div> */}
            <div>
                <h4 className='font-medium text-md'>{posts.profiles.username}</h4>
                <p className='text-sm'>{posts.description}</p>
            </div>
            {
                buyPost?.map((post: any) => {
                    return (
                        <button className='flex items-center text-dark text-md' key={id}>
                            <Link className='w-full' href={`${post.product_link}`} target="_blank" rel="noopener noreferrer">
                                Buy
                            </Link>
                        </button>
                    )
                }
                )
            }
        </div>
        <Link href={`/post/${posts.id}?id=${posts.id}`} key={id} legacyBehavior>
            <Image className='rounded-md cursor-pointer' src={posts.src} alt={posts.description} width={390} height={100} />
        </Link>
                                {/* {isHovered === posts.id && (
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
                                                <span className='overflow-hidden'>{posts.product_name}</span>
                                                </button>
                                            </div>
                                    </div>
                                )} */}
    </div>
  )
}

export default PostInFeed