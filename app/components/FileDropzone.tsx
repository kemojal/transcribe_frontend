"use client";
import { Button } from "@/components/ui/button";
import { bytesToMegabytes } from "@/utils";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const FileDropzone = () => {
  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles = ", acceptedFiles);
    setFiles(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {files.length > 0 ? (
        <div>
          {/* <p>Files:</p> */}
          <ul>
            {files.map((file) => (
              <li
                key={file.name}
                className="text-sm flex gap-3 items-center p-2 rounded-lg  justify-between bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{file.name}</span>

                  <div className="flex items-center gap-2 text-muted-foreground font-normal">
                    <span className="font-medium">{file.type}</span>
                    <span>{bytesToMegabytes(file.size)}MB</span>
                  </div>
                </div>

                <Button className="flex items-center gap-2">
                    <span>
                      <Upload size={16} />
                    </span>
                    Upload</Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="relative box-border outline-none  m-0 cursor-pointer align-middle appearance-none  transition-all ease-out duration-100 shadow-none select-none flex-shrink-0 text-none  text-sm leading-relaxed p-0 bg-gray-100 rounded-lg flex flex-col gap-2 flex-grow  h-[163px] items-center justify-center border-2 border-dashed border-dashed border-gray-300"
        >
          <input {...getInputProps()} />
          <span>
            <Upload size={20} />
          </span>
          <p className="font-semibold">Select files or Drag & drop</p>
          <span className="text-xs text-muted-foreground">
            Works best on talking head videos at least 5 mins long.
          </span>
        </div>
      )}
    </>
  );
};
