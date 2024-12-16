'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export function NonCreatorModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showModal = searchParams.get('showModal') === 'true'

  return (
    <Dialog open={showModal} onOpenChange={() => router.push('/discover')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creator Access Required</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>You need creator privileges to access this page. Please contact support to become a creator.</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => router.push('/discover')}>
            Return to Discover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}