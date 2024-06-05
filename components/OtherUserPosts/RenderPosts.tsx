
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ArrowUpRight, Heart, Share } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { likeVideo, unlikeVideo } from "@/lib"
import { toast } from "../ui/use-toast"



export const RenderPosts = () => {

  const pathname = usePathname()
  const userId = pathname.split('/')[2]


  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [isHovered, setIsHovered] = useState(null);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);

  const getPosts = async () => {

    const { data, error } = await supabase
    .from('posts')
    .select(`*, profiles(
      username,
      bio
    )`)
    .eq('user_id', userId)
    .order(
      'created_at',
      { ascending: false }
    )

    if (error) {
      console.log(error)
    }

    if (data) {
      setFeedPosts(data)
      console.log(feedPosts)
    }
  }

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
    getPosts()
    fetchLikedPosts()
  }, [])

  return (
    <>
    {
      feedPosts.map((feedPosts: any, key: number) => {
        return (
          <div 
              style={{ backgroundImage: `url(${feedPosts.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              className='md:w-1/5 w-full h-80 rounded hover:opacity-85' 
              key={key}
              onMouseEnter={() => setIsHovered(feedPosts.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
                  {isHovered === feedPosts.id && (
                    <div className='w-full h-full flex flex-col justify-between'>
                      <div className="w-full px-3 py-3 flex flex-row items-center justify-between">
                        <Link href={`/profile/${feedPosts.user_id}`}>
                          <h4>{feedPosts.profiles.username}</h4>
                        </Link>
                        <Share size={20}/>
                      </div>
                      

                      <div className='w-full h-full flex' >
                        <Link href={`/post/${feedPosts.id}`} key={key} legacyBehavior>
                            <a className='w-full h-full flex'></a>
                        </Link>
                       </div>

                      <div  className="w-full px-3 py-3 flex flex-row items-center justify-between">
                        <button 
                          className='bg-white text-black text-sm w-auto max-w-[40vw] md:w-auto md:max-w-[8vw] flex flex-row rounded-lg py-1 px-2 items-center gap-2 justify-center'
                          onClick={(event) => {
                            event.stopPropagation();
                            const url = feedPosts.product_link.startsWith('http') ? feedPosts.product_link : `http://${feedPosts.product_link}`;
                            window.open(url, '_blank');
                          }}>
                          <ArrowUpRight size={16} />
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span>{feedPosts.product_name}</span>
                          </div>
                        </button>
                        {
                          likedPosts.includes(feedPosts.id) ? (
                            <button  onClick={(event) => handleUnlike(feedPosts.id)}>
                              <Heart size={20} fill='red' color='red'/>
                            </button>
                          ) : (
                            <button onClick={(event) => handleLike(feedPosts.id)}>
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