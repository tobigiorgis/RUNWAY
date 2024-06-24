'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'
import { ShowPosts } from '@/components/FeedPosts/ShowPosts'
import EditProfile from '@/components/FeedPosts/EditProfile'
import ShareButton from '@/components/Buttons/ShareMyProfileButton'
import { CardSkeleton } from '@/components/ui/skeletons'
import { LikedPosts } from '@/components/FeedPosts/LikedPosts'
import { Footer } from '@/components/ui/Footer'
import Link from 'next/link'
import ShareMyProfileButton from '@/components/Buttons/ShareMyProfileButton'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import { updateProfilePic, uploadProfilePic } from '@/lib'
import { ImagePlus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'



const Profile = () => {

    // State to know if profile_created from user at supabase is true or false
    const [profileCreated, setProfileCreated] = useState<boolean>(true)
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState<any>(null);

    const [profile, setProfile] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState('myRunways')

    const getProfiles = async () => {
        
        const { data: { user } } = await supabase.auth.getUser()

        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)

        if (error) {
            console.log(error)
        }

        if (profiles) {
            setProfile(profiles)
            if (profiles[0].profile_created === true) {
                setProfileCreated(true)
            } else {
                setProfileCreated(false)
            }
        }
        
    }

    useEffect(() => {
        getProfiles()
    }, [])

    const router = useRouter();

    const goToCreateProfile = () => {
        router.push('/profile/create');
    }

    const onDrop = async (files: any) => {
        // const prefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL
        const [file] = files;
        setUploading(true);
        const [error, fileUrl] = await uploadProfilePic({ profilePic: file });
        if (error) return console.log(error);
        setUploaded(fileUrl);
      };

      const { isDragAccept, isDragReject, getRootProps, getInputProps, open } =
      useDropzone({
        disabled: uploading || uploaded !== null,
        maxFiles: 1,
        accept: {'image/bmp,image/jpeg,image/png,image/tiff,image/webp': []} ,
        onDrop,
      });
  
  
    useEffect(() => {
      if (isDragReject) navigator.vibrate(100);
    }, [isDragReject]);

    const renderDndContent = () => {
        if (uploaded) {
          // setProgress(20)
          return <h4>Photo uploaded!</h4>;
        }
        if (uploading) {
          return <h4>Uploading photo...</h4>;
        }
        if (isDragReject) return <h4>Archivo no soportado</h4>;
        if (isDragAccept) return <h4>¡Suelta el archivo para subirlo!</h4>;
    
        return (
          <div className='w-full h-full flex items-center justify-center' onClick={open}>
            <h4 className="mt-3 text-gray">Drag and drop a picture</h4>
          </div>
        );
      };
    
    const handleSubmit = async (evt: any) => {
        evt.preventDefault();
        if (!uploaded) return;

        const [ error ] = await updateProfilePic({
            profilePic: uploaded
        })

        if (error) return console.log(error);
        else {
            toast({
                title: "Profile picture updated successfully!",
                description: `You look better now!`,
            })
        }
    }

  return (
    <main className={`w-full h-full pt-20 flex items-center flex-col justify-between`}>
        {profileCreated ? (
            <>
            {profile.map((profile: any, key: number) => {
                return (
                    <div key={key} className='flex items-center flex-col gap-8 pt-10'>
                        <div className='flex items-center flex-col gap-3'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage className='bg-contain' src={profile.profile_pic} />
                                    <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit picture</DialogTitle>
                                <DialogDescription>
                                    Update your profile picture here. Click save when you&apos;re done.
                                </DialogDescription>
                                <div className='flex items-center flex-col gap-3'>
                                    <form className='flex flex-col w-auto h-auto gap-3' onSubmit={handleSubmit}>
                                        <div className='w-40 h-40 flex items-center justify-center rounded-full outline-none border border-gray' {...getRootProps()} style={{ backgroundImage: `url(${uploaded ? uploaded : profile.profile_pic})`, backgroundSize: 'inherit', backgroundPosition: 'center'}}>
                                            <input type="file" name="image" id="fileInput" {...getInputProps()} />
                                            <ImagePlus className='flex w-full items-center' color='gray' size={24}/>
                                        </div>
                                            {/* <button type='button'>
                                                Save changes
                                            </button> */}
                                    </form>
                                            {renderDndContent()}
                                </div>

                            </DialogHeader>
                            <DialogFooter>
                                <Button className='bg-black outline-none' type="submit" onClick={handleSubmit}>Save changes</Button>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog>
                            <div className='flex flex-row gap-2 items-center'>
                                <h1 className='font-bold' >{profile.username}</h1>
                                {/* <h3 className='text-gray'>Followers {profile.followers_count}</h3> */}
                                {/* <h3 className='text-gray'>Following {profile.following_count}</h3> */}
                            </div>
                            <p className=''>{profile.bio}</p>
                        </div>
                        <div className='flex items-center justify-center gap-2 w-3/4'>
                            {/* <button className='w-1/3 bg-black text-white rounded py-1 px-2'>
                                Edit
                            </button> */}
                            <EditProfile username={profile.username} bio={profile.bio} name={profile.full_name} website={profile.website}/>
                            {/* <button className='w-1/3 bg-black text-white rounded py-1 px-2'>
                                Share
                            </button> */}
                            <ShareMyProfileButton />
                            <Link className='w-1/3 flex items-center justify-center bg-black text-white rounded py-1 px-2' href={`/profile/${profile.id}/lists`}>
                                <button>
                                    Lists
                                </button>
                            </Link>
                        </div>
                        <div className='flex items-center gap- w-4/6'>
                            <div className='w-1/2 flex items-center justify-center'>
                                <button 
                                    className={`font-semibold  ${ activeTab === 'myRunways' ? 'border-b-2 border-black' : ''}`}
                                    onClick={() => setActiveTab('myRunways')}
                                    >
                                    Runways
                                </button>
                            </div>
                            <div className='w-1/2 flex items-center justify-center'>
                                <button 
                                    className={`font-semibold  ${ activeTab === 'liked' ? 'border-b-2 border-black' : ''}`}
                                    onClick={() => setActiveTab('liked')}
                                    >
                                    Liked
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            
                    <div className='w-full h-min-screen flex flex-col md:flex-row px-10 md:px-20 py-10 gap-7'>
                        {/* <Suspense fallback={<CardSkeleton/>}> */}
                            {
                                activeTab === 'myRunways' ? (
                                    <ShowPosts />
                                ) : (
                                    <LikedPosts />
                                )
                            }
                        {/* </Suspense> */}
                    </div>

                </>
            ) : (
                <div className='pt-10'>
                    <button onClick={goToCreateProfile}>
                        Create profile
                    </button>
                </div>
            )}
            <Footer/>
    </main>
  )
}

export default Profile