# Transcribe Frontend

A modern web application built with Next.js for audio transcription services. This application allows users to upload audio files, transcribe them, and manage their transcriptions with a user-friendly interface.

## Features

- **Audio Transcription**: Upload and automatically transcribe audio files
- **User Authentication**: Secure login/signup with JWT authentication
- **Dashboard**: View and manage all your transcriptions
- **Audio Player**: Built-in player to listen to uploaded audio files
- **Transcription Editor**: Edit and correct transcriptions
- **File Storage Integration**: Integrations with Google Drive and Dropbox
- **Analytics**: Track usage and statistics
- **Team Collaboration**: Share and collaborate on transcriptions
- **User Settings**: Customize your experience
- **Mobile Responsive**: Works on all device sizes

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **API Communication**: [Axios](https://axios-http.com/), [React Query](https://tanstack.com/query/v5)
- **Authentication**: JWT with Google OAuth integration
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Audio Processing**: [WaveSurfer.js](https://wavesurfer-js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Video Generation**: [Remotion](https://www.remotion.dev/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Backend API running (see backend repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/transcribe_frontend.git
   cd transcribe_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/` - Next.js application routes and pages
- `components/` - Reusable UI components
- `lib/` - Utility functions and shared logic
- `services/` - API service integrations
- `hooks/` - Custom React hooks
- `context/` - React context providers
- `types/` - TypeScript type definitions
- `public/` - Static assets

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Security

Please make sure to update the Next.js version to address security vulnerabilities in the current version.

## License

This project is proprietary software.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
