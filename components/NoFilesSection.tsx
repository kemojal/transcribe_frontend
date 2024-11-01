import { Button } from "@/components/ui/button";
import { AudioLines, PlusIcon } from "lucide-react";
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { FileDialogue } from "./Dialogues/File/FileDialogue";
import { FileRecordDialogue } from "./Dialogues/File/FileRecordDialogue";

export default function NoFilesSection() {
  return (
    <section className="rounded-xl flex flex-col justify-center items-center space-y-8 py-12 ">
      <svg
        width="148"
        height="125"
        viewBox="0 0 148 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-300"
      >
        <g filter="url(#filter0_d_5_19343)">
          <path
            d="M28.6853 98.9873C24.9799 98.9873 21.9761 95.9835 21.9761 92.2781L21.9761 32.9203C21.9761 29.2149 24.9799 26.2111 28.6853 26.2111L34.7633 26.2111L42.6269 26.2111C44.2203 26.2111 45.6771 27.1107 46.3907 28.5352V28.5352C47.1044 29.9598 48.5612 30.8594 50.1545 30.8594L56.8538 30.8594L66.1526 30.8594L76.6157 30.8594L87.0788 30.8594L101.296 30.8594C105.001 30.8594 108.005 33.8632 108.005 37.5686L108.005 92.2781C108.005 95.9835 105.001 98.9873 101.296 98.9873L28.6853 98.9873Z"
            fill="currentColor"
          />
          <path
            d="M28.6853 98.9873C24.9799 98.9873 21.9761 95.9835 21.9761 92.2781L21.9761 32.9203C21.9761 29.2149 24.9799 26.2111 28.6853 26.2111L34.7633 26.2111L42.6269 26.2111C44.2203 26.2111 45.6771 27.1107 46.3907 28.5352V28.5352C47.1044 29.9598 48.5612 30.8594 50.1545 30.8594L56.8538 30.8594L66.1526 30.8594L76.6157 30.8594L87.0788 30.8594L101.296 30.8594C105.001 30.8594 108.005 33.8632 108.005 37.5686L108.005 92.2781C108.005 95.9835 105.001 98.9873 101.296 98.9873L28.6853 98.9873Z"
            stroke="#CED6E3"
            strokeWidth="1.38748"
          />
        </g>
        <path
          d="M26.1392 98.9873C22.2467 98.9873 19.0196 95.9716 18.7563 92.0879L15.5355 44.5741C15.2458 40.3 18.6346 36.6737 22.9185 36.6737L108.457 36.6737C112.741 36.6737 116.13 40.3 115.84 44.5741L112.62 92.0879C112.356 95.9716 109.129 98.9873 105.237 98.9873L26.1392 98.9873Z"
          fill="#FAFAFA"
        />
        <path
          d="M26.1392 98.9873C22.2467 98.9873 19.0196 95.9716 18.7563 92.0879L15.5355 44.5741C15.2458 40.3 18.6346 36.6737 22.9185 36.6737L108.457 36.6737C112.741 36.6737 116.13 40.3 115.84 44.5741L112.62 92.0879C112.356 95.9716 109.129 98.9873 105.237 98.9873L26.1392 98.9873Z"
          stroke="#CED6E3"
          strokeWidth="1.38748"
        />
        <path
          d="M65.223 81.6276C58.3743 81.6276 52.8223 76.0756 52.8223 69.2269C52.8223 62.3782 58.3743 56.8262 65.223 56.8262C72.0716 56.8262 77.6237 62.3782 77.6237 69.2269C77.6237 76.0756 72.0716 81.6276 65.223 81.6276ZM65.223 79.1475C70.702 79.1475 75.1436 74.7059 75.1436 69.2269C75.1436 63.7479 70.702 59.3063 65.223 59.3063C59.744 59.3063 55.3024 63.7479 55.3024 69.2269C55.3024 74.7059 59.744 79.1475 65.223 79.1475ZM65.223 67.4732L68.7304 63.9657L70.4841 65.7194L66.9767 69.2269L70.4841 72.7343L68.7304 74.488L65.223 70.9806L61.7155 74.488L59.9618 72.7343L63.4693 69.2269L59.9618 65.7194L61.7155 63.9657L65.223 67.4732Z"
          fill="#8095B7"
        />
        <defs>
          <filter
            id="filter0_d_5_19343"
            x="0.515596"
            y="8.90427"
            width="128.95"
            height="115.697"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="6.89941" />
            <feGaussianBlur stdDeviation="8.47426" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5_19343"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_5_19343"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <h3 className="text-2xl font-semibold text-gray-800">No files</h3>
      <p className="text-gray-600 text-center max-w-md">
        This project doesn't have any files yet. Create a file to get started.
      </p>

      <div className="flex items-center space-x-4">
        <FileDialogue id={8} />
        <FileRecordDialogue id={8} />
      </div>
    </section>
  );
}
