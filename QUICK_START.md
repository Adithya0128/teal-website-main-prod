# Quick Start Guide

## Getting Started

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/charanraj/Desktop/Website /text-enhancer"
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Overview

This website is built with:
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations

## Key Features Implemented

✅ **Header/Navbar**
- Fixed header with backdrop blur
- Announcement bar (dark green)
- Logo with animated bars
- Download button
- Responsive mobile menu

✅ **Hero Section**
- Large serif headline with fade-in animation
- Sub-headline description
- CTA button with hover effects
- Circular text animation element
- Platform availability text

✅ **Features Section**
- Scroll-triggered animations
- 4 feature cards with icons
- Hover effects
- Staggered animation on scroll

✅ **Footer**
- Multi-column layout
- Links to all sections
- Social/company links
- Copyright notice

✅ **Animations**
- Fade-in on scroll
- Stagger animations
- Hover effects
- Smooth transitions
- Rotating circular text

## Customization

### Change Site Name
Edit `lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
  name: "YourAppName",
  // ...
};
```

### Update Features
Edit `lib/constants.ts` - `FEATURES` array

### Modify Colors
Update Tailwind classes in components:
- Purple buttons: `bg-purple-100`, `border-purple-300`
- Green announcement: `bg-[#1a4d3a]`
- Text colors: `text-gray-900`, `text-gray-600`, etc.

### Change Fonts
Edit `app/layout.tsx` to import different Google Fonts

## Building for Production

```bash
npm run build
```

This creates an optimized production build in `.next` folder.

## Static Export (Optional)

To export as fully static HTML:

1. Edit `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
   };
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Static files will be in `out/` directory

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Auto-deploy on push

### Other Platforms
- Netlify
- GitHub Pages (with static export)
- Any static hosting service

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors?**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Type errors?**
```bash
# Check TypeScript
npx tsc --noEmit
```

## Next Steps

- Add more sections (Pricing, About, etc.)
- Implement dark mode toggle
- Add contact form
- Integrate analytics
- Add testimonials section
- Create demo video section

