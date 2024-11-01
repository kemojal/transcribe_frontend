// components/TestimonialsSection.tsx
// import { Star } from "lucide-react";
// import Marquee from "../ui/marquee";
// import { cn } from "@/lib/utils";

// const testimonials = [
//   {
//     name: "Jane Doe",
//     title: "Marketing Manager",
//     feedback:
//       "The transcription service is fantastic! It saves us countless hours in turning our webinars into written content.",
//     image: "/images/jane.jpg",
//     rating: 5,
//   },
//   {
//     name: "John Smith",
//     title: "Podcast Host",
//     feedback:
//       "Super easy to use and very accurate. The AI transcription is better than anything I’ve used before.",
//     image: "/images/john.jpg",
//     rating: 4,
//   },
//   {
//     name: "Emma Johnson",
//     title: "Freelance Writer",
//     feedback:
//       "I love the time-stamping feature. It makes editing so much easier. Highly recommended!",
//     image: "/images/emma.jpg",
//     rating: 5,
//   },
//   // Add more testimonials as needed...
// ];

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     title: "Marketing Manager",
//     body: "The transcription service is fantastic! It saves us countless hours in turning our webinars into written content.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     title: "Marketing Manager",
//     body: "Super easy to use and very accurate. The AI transcription is better than anything I’ve used before.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I love the time-stamping feature. It makes editing so much easier. Highly recommended!",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     title: "Marketing Manager",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     title: "Marketing Manager",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     title: "Marketing Manager",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

// const ReviewCard = ({
//   img,
//   name,
//   username,
//   body,
// }: {
//   img: string;
//   name: string;
//   username: string;
//   body: string;
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
//         // light styles
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         // dark styles
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <img className="rounded-full" width="32" height="32" alt="" src={img} />
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {name}
//           </figcaption>
//           <p className="text-xs font-medium dark:text-white/40">{username}</p>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-sm">{body}</blockquote>
//     </figure>
//   );
// };

// const TestimonialsSection = () => {
//   return (
//     <section className="py-16 bg-white ">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           What Our Users Say
//         </h2>

//         <div className="relative flex  flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
//           <Marquee pauseOnHover className="[--duration:20s]">
//             {firstRow.map((review) => (
//               <ReviewCard key={review.username} {...review} />
//             ))}
//           </Marquee>
//           <Marquee reverse pauseOnHover className="[--duration:20s]">
//             {secondRow.map((review) => (
//               <ReviewCard key={review.username} {...review} />
//             ))}
//           </Marquee>
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    title: "Marketing Manager",
    body: "The transcription service is fantastic! It saves us countless hours in turning our webinars into written content.",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Jill",
    username: "@jill",
    title: "Content Creator",
    body: "Super easy to use and very accurate. The AI transcription is better than anything I've used before.",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "John",
    username: "@john",
    title: "Podcast Host",
    body: "I love the time-stamping feature. It makes editing so much easier. Highly recommended!",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Jane",
    username: "@jane",
    title: "Freelance Writer",
    body: "I'm at a loss for words. This is amazing. The accuracy and speed are unparalleled.",
    img: "https://avatar.vercel.sh/jane",
    rating: 5,
  },
  {
    name: "Jenny",
    username: "@jenny",
    title: "Video Producer",
    body: "This tool has revolutionized our post-production workflow. It's a game-changer!",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "James",
    username: "@james",
    title: "Researcher",
    body: "The multilingual support is impressive. It's been invaluable for our international projects.",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

type ReviewCardProps = {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
};

const ReviewCard = ({ img, name, username, body, rating }: ReviewCardProps) => {
  return (
    <motion.figure
      whileHover={{ y: -5 }}
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-6 transition-colors duration-300 ease-in-out",
        "border-gray-200 bg-white shadow-sm hover:bg-gray-50",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <img
          className="rounded-full"
          width="48"
          height="48"
          alt={`Avatar of ${name}`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-base font-semibold text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        {body}
      </blockquote>
      <div className="mt-4 flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-4 w-4",
              index < rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            )}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    </motion.figure>
  );
};

export default function TestimonialsSection() {
  return (
    <section
      className="py-12 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          What Our Users Say
        </h2>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
          <Marquee
            pauseOnHover
            className="[--duration:30s] mb-8"
            aria-label="Testimonials row 1"
          >
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:30s]"
            aria-label="Testimonials row 2"
          >
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-gray-900"
            aria-hidden="true"
          ></div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-gray-900"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  );
}
