'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export function NonCreatorModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showModal = searchParams.get('showModal') === 'true'

  return (
    <Dialog open={showModal} onOpenChange={() => router.push('/discover?forYou')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creator Access Required</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>You need creator privileges to access this page.
          <Link
            href='mailto:tobi@gmail.com'  
          > 
          Apply to be a creator. 
          </Link>
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => router.push('/discover?forYou')}>
            Return to Discover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}