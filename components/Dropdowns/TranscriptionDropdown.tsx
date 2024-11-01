import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
import { DownloadCloud } from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument } from "pdf-lib";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"; // Import ShadCN AlertDialog
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

// Define the export formats
const exportFormats = [
  { label: "Export .TXT", format: "txt" },
  { label: "Export .SRT", format: "srt" },
  { label: "Export .VTT", format: "vtt" },
  { label: "DOCX (Word)", format: "docx", isPro: true },
  { label: "Export .PDF", format: "pdf", isPro: true },
  { label: "Export .JSON", format: "json" },
];

const exportText = (file, format) => {
  let content = "";

  switch (format) {
    case "txt":
      content = file.transcriptions
        .map((transcription) => transcription.transcription_text)
        .join("\n");
      break;
    case "srt":
      content = file.transcriptions
        .map(
          (transcription, index) =>
            `${index + 1}\n${transcription.transcription_text}`
        )
        .join("\n\n");
      break;
    case "vtt":
      content =
        "WEBVTT\n\n" +
        file.transcriptions
          .map((transcription) => transcription.transcription_text)
          .join("\n\n");
      break;
    default:
      throw new Error("Unsupported format");
  }

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transcription.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportDocx = async (file) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: file.transcriptions.map(
          (transcription) =>
            new Paragraph({
              children: [new TextRun(transcription.transcription_text)],
            })
        ),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transcription.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportPdf = async (file) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();
  let y = height - 50;

  file.transcriptions.forEach((transcription) => {
    page.drawText(transcription.transcription_text, { x: 50, y, size: 12 });
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transcription.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportJson = (file) => {
  const content = JSON.stringify(file.transcriptions, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transcription.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handleExport = (format, file) => {
  switch (format) {
    case "txt":
    case "srt":
    case "vtt":
      exportText(file, format);
      break;
    case "docx":
      exportDocx(file);
      break;
    case "pdf":
      exportPdf(file);
      break;
    case "json":
      exportJson(file);
      break;
    default:
      console.error("Unsupported format");
  }
};

export const TranscriptionDropdown = ({ file }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  const router = useRouter();

  const handleClick = (format) => {
    const isPro = exportFormats.find((item) => item.format === format)?.isPro;
    if (isPro) {
      setSelectedFormat(format);
      setShowAlert(true);
    } else {
      handleExport(format, file);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-xs ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-0 h-8 font-medium flex items-center gap-1">
          <DownloadCloud size={15} /> Export
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {exportFormats.map(({ label, format, isPro }) => (
            <DropdownMenuItem
              key={format}
              className={`cursor-pointer gap-2 flex items-center ${
                isPro ? "text-blue-500" : "text-gray-700"
              } hover:bg-gray-100`}
              onClick={() => handleClick(format)}
            >
              <span
                className={`flex items-center ${
                  isPro ? "bg-blue-500 text-white px-2 py-0.5 rounded-full" : ""
                }`}
              >
                {isPro ? "Pro" : <DownloadCloud size={16} />}
              </span>
              <span className={`ml-2 ${isPro ? "font-bold" : ""}`}>
                {label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={() => setShowAlert(false)}>
        <AlertDialogTrigger />
        <AlertDialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Export in Many Formats
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 mt-2">
              Upgrade your plan to get access to exports in all formats.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">Cancel</AlertDialogCancel>
            {/* <div className="mt-4 flex justify-end gap-4"> */}
            <AlertDialogAction
              onClick={() => {
                router.push("/upgrade");
                setShowAlert(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Upgrade Plan
            </AlertDialogAction>
            {/* </div> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
