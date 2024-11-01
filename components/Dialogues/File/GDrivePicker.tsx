import { Button } from "@/components/ui/button";
import GoogleDriveIcon from "@/icons/GoogleDrive";
import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function GDrivePicker() {
  const [openPicker, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "xxxxxxxxxxxxxxxxx",
      developerKey: "xxxxxxxxxxxx",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };

  return (
    <Button 
    variant="outline"
    className="w-12 h-12 rounded-xl p-0 border-gray-100 shadow-sm hover:bg-gray-100"
    onClick={() => handleOpenPicker()}>
      <GoogleDriveIcon />
    </Button>
  );
}

export default GDrivePicker;
