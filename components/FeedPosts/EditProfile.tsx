import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProfile } from '@/lib'

interface Props {
  username: string
  bio: string
  name: string
  website: string
}

const EditProfile = ({username: initialUsername, bio: initialBio, name: initialName, website: initialWebsite}: Props) => {

  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [name, setName] = useState(initialName);
  const [website, setWebsite] = useState(initialWebsite);


  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    // const fullname = evt.target.fullname.value
    // const username = evt.target.username.value
    // const bio = evt.target.bio.value
    // const website = evt.target.website.value

    const [ error ] = await createProfile({
      fullname: name,
      username,
      bio,
      website,
    })
    if (error) {
      console.log(error)
    } else {
      console.log('Profile updated!')
      // Refresh site with nextjs
      window.location.reload()
    }
  }

  

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className='w-1/3 bg-black text-white rounded py-1 px-2'>
            Edit
          </button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name='fullname' className="col-span-3" placeholder={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" name='username' placeholder={username} className="col-span-3" onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input id="bio" name='bio' placeholder={bio} className="col-span-3" onChange={e => setBio(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input id="website" name='website' placeholder={website} className="col-span-3" onChange={e => setWebsite(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  )
}

export default EditProfile