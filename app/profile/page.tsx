'use client'
import React, { Suspense, useEffect, useState } from 'react'

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


const Profile = () => {

    // State to know if profile_created from user at supabase is true or false
    const [profileCreated, setProfileCreated] = useState<boolean>(true)

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
    

  return (
    <main className={`w-full h-full pt-20 flex items-center flex-col justify-between`}>
        {profileCreated ? (
            <>
            {profile.map((profile: any, key: number) => {
                return (
                    <div key={key} className='flex items-center flex-col gap-8 pt-10'>
                        <div className='flex items-center flex-col'>
                            <div className='flex flex-row gap-2 items-center'>
                                <h1 className='font-bold' >{profile.username}</h1>
                                <h3 className='text-slate-400'>Followers {profile.followers_count}</h3>
                                <h3 className='text-slate-400'>Following {profile.following_count}</h3>
                            </div>
                            <p className='pt-3'>{profile.bio}</p>
                        </div>
                        <div className='flex items-center justify-center gap-2 w-3/4'>
                            {/* <button className='w-1/3 bg-black text-white rounded py-1 px-2'>
                                Edit
                            </button> */}
                            <EditProfile username={profile.username} bio={profile.bio} name={profile.name} website={profile.website}/>
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