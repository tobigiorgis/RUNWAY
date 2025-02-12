'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { createClient } from '@/utils/supabase/client'


const ShareMyProfileButton = () => {

  const pathname = usePathname()
  const { toast } = useToast()
  const [url, setUrl] = useState<string>('')
  const supabase = createClient()
  
  const createUrl = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const shareurl = `https://userunway.ar${pathname}/${user?.id}`
    setUrl(shareurl)
  }
  
  
  const handleCopy = async () => {

    await navigator.clipboard.writeText(url);

    toast({
      title: "Copied to clipboard.",
      description: "You can share it now! ✨",
  })
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={createUrl} className='w-1/3 bg-black text-white rounded py-1 px-2'>
            Share
        </button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={url}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareMyProfileButton