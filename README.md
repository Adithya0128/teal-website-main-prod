# TextEnhancer Website

A modern, pixel-perfect website for TextEnhancer - an AI-powered text enhancement platform that transforms your writing into professional, casual, or summarized formats across all desktop applications.

## 🚀 Features

- **Modern Design**: Clean, minimalist design inspired by Wispr Flow
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive**: Fully responsive design for all devices
- **Type-Safe**: Built with TypeScript
- **Performance**: Optimized with Next.js 16 and static generation
- **Accessible**: Semantic HTML and ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Fonts**: Inter (sans-serif), Playfair Display (serif)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
text-enhancer/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── Features.tsx        # Features section
│   ├── CircularText.tsx    # Animated circular text
│   └── Footer.tsx          # Footer component
├── lib/
│   ├── constants.ts        # Site constants and data
│   └── animations.ts       # Framer Motion animation variants
└── public/                 # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#9333ea, #a855f7)
- **Background**: White (#ffffff)
- **Text**: Gray scale (#171717 to #9ca3af)
- **Accent**: Dark Green (#1a4d3a) for announcement bar

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
- Consistent spacing scale using Tailwind's default spacing system

## 🎬 Animations

The website includes:
- **Fade-in animations** on scroll
- **Stagger animations** for lists
- **Hover effects** on interactive elements
- **Circular text rotation** animation
- **Smooth page transitions**

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Static Export (Optional)

To export as a fully static site, update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
};
```

Then run:
```bash
npm run build
```

The static files will be in the `out` directory.

## 🔧 Customization

### Update Content

Edit `lib/constants.ts` to update:
- Site name and tagline
- Navigation items
- Features list
- Circular text words

### Modify Animations

Edit `lib/animations.ts` to customize animation variants.

### Change Colors

Update Tailwind classes in components or modify `globals.css` for global color changes.

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project owner.
