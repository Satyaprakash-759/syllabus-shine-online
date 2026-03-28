# Ivy Bridge Online Tutoring

Elite online tutoring for Cambridge, IB, and International students across Thailand.

## Technologies Used

This project is built with:

- **React** (UI Library)
- **Vite** (Build Tool)
- **TypeScript** (Language)
- **Sanity CMS** (Content Management)
- **Tailwind CSS** (Styling)
- **Shadcn UI** (Component Library)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Local Development

1. **Clone the repository**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file with your Sanity project ID:
   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Deployment

The project is optimized for deployment on **Vercel** or any static hosting provider that supports Single Page Applications (SPA).

To build the project for production:
```sh
npm run build
```

The output will be in the `dist` folder.
