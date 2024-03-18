
import { supabase } from "./supabase"



export const uploadVideo = async ({ postFile }: { postFile: File }) => {
  const filename = window.crypto.randomUUID()

  console.log(postFile);

  const prefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`posts/${filename}.jpg`, postFile)
    console.log(data?.path);

    const file = data?.path ? `${prefix}${data.path}` : ''
  return [error, file]
}

type Post = {
  title: string
  postSrc: string
  description: string
  product: string
  productlink: string
  tags: string[]
}

export const publishVideo = async ({ postSrc, description, product, productlink, title, tags } : Post) => {

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: user?.id,
        title,
        description,
        src: postSrc,
        product_name: product,
        product_link: productlink,
        tags
      }
    ])

  return [error, data]
}

type List = {
  name: string
  privacy: boolean
}


export const createList = async ({ name, privacy}: List) => {
  
    const { data: { user } } = await supabase.auth.getUser()
  
    const { data, error } = await supabase
      .from('users_lists')
      .insert([
        {
          user_id: user?.id,
          name,
          private: privacy
        }
      ])
  
    return [error, data]
}

// Function to like post and insert the user id and post id into the likes table
type Like = {
  user_id: string
  post_id: string
}

export const likeVideo = async ({ user_id, post_id }: Like) => {

  const { data: post, error } = await supabase
    .from('users_posts_likes')
    .insert([
      {
        user_id: user_id,
        post_id: post_id
      }
    ])

  return [error, post]

  // plus 1 to the value of likes column in the posts table

}

// Function to unlike post and delete the user id and post id from the likes table
export const unlikeVideo = async ({ user_id, post_id }: Like) => {

  const { data, error } = await supabase
    .from('users_posts_likes')
    .delete()
    .match({
      user_id: user_id,
      post_id: post_id
    })

  return [error, data]

  // minus 1 to the value of likes column in the posts table

}

// Function to follow user and insert the user id and follower id into the users_followers table
type Follow = {
  user_id: string
  follower_id: string
}

export const followUser = async ({ user_id, follower_id }: Follow) => {

  const { data, error } = await supabase
    .from('users_followers')
    .insert([
      {
        user_id: user_id,
        follower_id: follower_id
      }
    ])

  return [error, data]
}

export const unfollowUser = async ({ user_id, follower_id }: Follow) => {

  const { data, error } = await supabase
    .from('users_followers')
    .delete()
    .eq('user_id', user_id)
    .eq('follower_id', follower_id)

  return [error, data]
}

// Function to insert users profile data into the user with same id in the database

type Profile = {
  fullname: string
  username: string
  bio: string
  website?: string | null
}

export const createProfile = async ({ fullname, username, bio, website }: Profile) => {

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profiles')
    .update([
      {
        full_name: fullname,
        username: username,
        bio: bio,
        website: website ?? null
      }
    ])
    .eq('id', user?.id)

  return [error, data]
}

// Update profile_created column in the users table to true
export const updateProfileCreated = async () => {
  
    const { data: { user } } = await supabase.auth.getUser()
  
    const { data, error } = await supabase
      .from('profiles')
      .update([
        {
          profile_created: true
        }
      ])
      .eq('id', user?.id)
  
    return [error, data]
  
}

