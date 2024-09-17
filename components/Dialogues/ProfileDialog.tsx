import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProfileDialog = ({
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deletePassword,
    setDeletePassword,
    handleDeleteAccount,

}:{
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deletePassword: string;
    setDeletePassword: React.Dispatch<React.SetStateAction<string>>;
    handleDeleteAccount: () => Promise<void>;
}) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className="rounded-xl px-0 overflow-hidden max-w-md">
        <DialogHeader className="pt-6 pb-4 px-6 flex flex-col  border-b-[1px] border-gray-100">
          <DialogTitle className="w-full">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please enter your password to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-8 px-4">
          <div className="grid grid-cols-1 items-center gap-4">
            {/* <Label htmlFor="delete-password" className="text-right">
              Password
            </Label> */}
            <Input
              id="delete-password"
              type="password"
              placeholder="Enter your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row gap-2 items-center  border-t-[1px] border-gray-100 px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsDeleteDialogOpen(false)}
              className="hover:ring hover:ring-[2px] ring-offset-2  hover:ring-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteAccount}
            className="hover:ring hover:ring-[2px] ring-offset-2  hover:ring-red-600"
          >
            Delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
