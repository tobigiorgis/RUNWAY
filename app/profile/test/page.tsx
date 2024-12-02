'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { ImagePlus, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { uploadProfilePic, updateProfilePic } from '@/lib'
import Image from 'next/image'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/imageUtils'


const Profile = () => {
  const [profileCreated, setProfileCreated] = useState<boolean>(true)
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [profile, setProfile] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('myRunways')
  const supabase = createClient()
  const router = useRouter();

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  type UploadResult = [StorageError | null, string | null];

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

  const goToCreateProfile = () => {
    router.push('/profile/create');
  }

  const onDrop = async (files: File[]) => {
    const [file] = files;
    setUploading(true);
    try {
      const [error, fileUrl]: UploadResult = await uploadProfilePic({ profilePic: file });
      if (error) throw error;
      if (!fileUrl) throw new Error("No file URL returned");
      setUploaded(fileUrl);
      toast({
        title: "Profile picture uploaded successfully!",
        description: "Your new profile picture looks great!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error uploading profile picture",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxFiles: 1,
    disabled: uploading,
  });

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        uploaded,
        croppedAreaPixels
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [uploaded, croppedAreaPixels])

  const handleSave = async (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!croppedImage) return

    try {
      const [error] = await updateProfilePic({
        profilePic: croppedImage
      })
      if (error) throw error
      toast({
        title: "Profile picture updated successfully!",
        description: "Your new profile picture has been saved.",
      })
      await getProfiles() // Refresh the profile data
      setCroppedImage(null)
      setUploaded(null)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error updating profile picture",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className={`w-full h-full pt-20 flex items-center flex-col justify-between`}>
      {profileCreated ? (
        <>
          {profile.map((profile: any, key: number) => (
            <div key={key} className='flex items-center flex-col gap-5 pt-10'>
              <div className='flex items-center flex-col gap-3'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="cursor-pointer w-24 h-24">
                      <Image 
                        src={profile.profile_pic} 
                        alt={profile.username} 
                        width={96} 
                        height={96}
                        className="object-cover"
                      />
                      <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile Picture</DialogTitle>
                      <DialogDescription>
                        Update your profile picture here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        <input {...getInputProps()} />
                        {uploading ? (
                          <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary" />
                        ) : uploaded ? (
                          <div className="relative w-full h-64">
                            <Cropper
                              image={uploaded}
                              crop={crop}
                              zoom={zoom}
                              aspect={1}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                            />
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="w-10 h-10 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Drag & drop an image here, or click to select one</p>
                          </>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="button" 
                        onClick={showCroppedImage} 
                        disabled={!uploaded}
                      >
                        Preview
                      </Button>
                      <Button 
                        type="submit" 
                        onClick={handleSave} 
                        disabled={!croppedImage}
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='font-bold' >{profile.username}</h1>
                </div>
                <div className='flex justify-center flex-col items-center'>
                  <p className='text-dark text-sm'>{profile.style}</p>
                  <p className=''>{profile.bio}</p>
                </div>
              </div>
              {/* Rest of the profile content */}
            </div>
          ))}
          {/* Rest of the profile page content */}
        </>
      ) : (
        <div className='pt-10'>
          <button onClick={goToCreateProfile}>
            Create profile
          </button>
        </div>
      )}
      {/* Footer component */}
    </main>
  )
}

export default Profile


