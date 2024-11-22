'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose?: () => void
  onConfirm?: () => void
  itemName?: string
}

export default function ConfirmDeleteDialog({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  itemName = "New chat"
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle className="text-xl">Delete chat?</DialogTitle>
          <DialogDescription className="pt-4">
            <div className="text-base text-foreground">This will delete {itemName}.</div>
            <div className="text-base text-muted-foreground pt-2">
              To clear any memories from this chat, visit your{" "}
              <Link href="/settings" className="text-primary hover:underline">
                settings
              </Link>
              .
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}