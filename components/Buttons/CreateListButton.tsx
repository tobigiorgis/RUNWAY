'use client'

import { useState } from "react";
import { createList } from "@/lib";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Switch } from "../ui/switch";



const CreateListButton = () => {

const [newName, setNewName] = useState<string>('');
const [privacity, setPrivacity] = useState<boolean>(false);


const handleSubmit = async (evt: any) => {
  evt.preventDefault()

  const [ error ] = await createList({
    name: newName,
    privacy: privacity,
  })
  if (error) {
    console.log(error)
  } else {
    console.log('List created!')
    // Refresh site with nextjs
    window.location.reload()
  }
}

console.log(privacity);
console.log(newName);




return (
  <>
    <Dialog>
        <DialogTrigger asChild>
            <button className=' w-full p-1 rounded text-slate font-medium mt-2 text-sm hover:font-semibold'>
                + Create new list
            </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>New List</DialogTitle>
                <DialogDescription>
                    Save your favorite runways in a list. Make it public or private.
                </DialogDescription>
            </DialogHeader>
            <div className="flex ml-2 flex-col gap-6">
                <div className=" flex flex-row items-center gap-3">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" name='name' className="col-span-3" placeholder="Type a name for your list" onChange={e => setNewName(e.target.value)}/>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Label htmlFor="private">{ privacity ? 'Private' : 'Public' }</Label>
                    <Switch id="private" checked={privacity} onCheckedChange={setPrivacity}/>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>Create List</Button>
            </DialogFooter>
        </DialogContent>
     </Dialog>
  </>
)
}

export default CreateListButton