# Viggest AI Builder - Next.js Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling (configured locally, not CDN)
- **Next.js Font Optimization** with Inter font
- **Responsive Design** with mobile-first approach
- **Dark Theme** with custom gradients and animations
- **Interactive Elements** with smooth scrolling and animations
- **SEO Optimized** with proper meta tags

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with font configuration
│   └── page.tsx             # Main landing page component
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── next.config.js           # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Features Implemented

### 1. Next.js App Router
- Modern Next.js 14 with App Router
- Server-side rendering capabilities
- Optimized performance

### 2. TypeScript Integration
- Full TypeScript support
- Type-safe component props
- Enhanced developer experience

### 3. Tailwind CSS Configuration
- Local Tailwind setup (no CDN)
- Custom color palette matching original design
- Custom gradients and animations
- Responsive design utilities

### 4. Font Optimization
- Next.js font optimization with Inter
- Multiple font weights (300-800)
- Improved loading performance

### 5. Interactive Features
- Smooth scrolling between sections
- FAQ accordion functionality
- Button hover effects and ripple animations
- Fade-in animations on scroll
- Responsive navigation

### 6. SEO & Performance
- Proper meta tags and descriptions
- Optimized images and fonts
- Fast loading times
- Mobile-responsive design

## Customization

### Colors
The color palette is defined in `tailwind.config.js` and can be customized:

```javascript
colors: {
  primary: '#3b82f6',
  'primary-dark': '#2563eb',
  secondary: '#8b5cf6',
  // ... more colors
}
```

### Animations
Custom animations are defined in `app/globals.css`:

- Floating animations
- Gradient text effects
- Button hover effects
- Scroll-triggered fade-ins

## Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

Build the project:
```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
