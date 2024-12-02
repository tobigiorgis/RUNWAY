import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function NonCreatorModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setIsOpen(urlParams.get('showModal') === 'true')
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    router.push('/discover')
  }

  const handleApply = () => {
    window.location.href = 'mailto:tobi@userunway.com?subject=Creator Application'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creator Access Required</DialogTitle>
          <DialogDescription>
            You need creator privileges to access this page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Go to Discover Page
          </Button>
          <Button onClick={handleApply}>
            Apply to be a Creator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}