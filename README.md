# Deepak K - Portfolio Website

A high-performance, ATS-optimized personal portfolio website built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Theme Toggle**: Dark/Light mode with smooth transitions
- **Smooth Animations**: Framer Motion for professional animations
- **GitHub Integration**: Dynamically fetches repositories using GitHub REST API
- **SEO Optimized**: Comprehensive metadata for search engines and social media
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Certificate Viewer**: Modal-based certificate viewing (PDF & images)
- **Contact Form**: Functional contact form with validation
- **ATS-Friendly**: Keyword-rich content optimized for Applicant Tracking Systems

## 📋 Portfolio Sections

1. **Hero Section**: Introduction with CTA buttons and social badges
2. **About Me**: Education, languages, and bio
3. **Profiles**: Professional profile cards (LinkedIn, LeetCode, Salesforce)
4. **Skills**: Categorized technical skills with icons
5. **Projects**: Featured projects + dynamic GitHub repos with live demo links
6. **Experience & Achievements**: Hackathons, awards, and certificates with viewer
7. **Contact**: Social links and contact form

## 🛠 Installation & Setup

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
git clone https://github.com/Deepakkaruppasamy/portfolio.git
cd deepak_portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
deepak_portfolio/
├── public/
│   └── certificates/          # Store certificate PDFs/images here
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with SEO metadata
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── About.tsx          # About section
│   │   ├── Achievements.tsx   # Achievements & certifications
│   │   ├── Contact.tsx        # Contact form
│   │   ├── Footer.tsx         # Footer
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Projects.tsx       # Projects section
│   │   ├── Skills.tsx         # Skills section
│   │   └── ThemeProvider.tsx  # Theme provider
│   └── lib/
│       ├── data.ts            # Portfolio data
│       ├── github.ts          # GitHub API utilities
│       └── types.ts           # TypeScript types
├── package.json
└── tsconfig.json
```

## 📝 Customization

### Adding Certificates

1. Place your certificate files in `public/certificates/`
2. Update the file paths in `src/lib/data.ts`:

```typescript
export const certifications: Certification[] = [
  {
    id: 1,
    title: 'Your Certificate Title',
    issuer: 'Issuing Organization',
    certificateUrl: '/certificates/your-certificate.pdf',
    date: '2024',
  },
];
```

### Updating Projects

Edit `src/lib/data.ts` to modify featured projects:

```typescript
export const featuredProjects: Project[] = [
  {
    id: 1,
    name: 'Project Name',
    description: 'Project description...',
    techStack: ['React', 'Node.js'],
    githubUrl: 'https://github.com/username/repo',
    liveUrl: 'https://demo.example.com',
    featured: true,
  },
];
```

### Adding Resume

Place your resume PDF as `public/resume.pdf`.

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Build for Production

```bash
npm run build
npm start
```

## 📊 Performance

- Lighthouse Score: 90+ across all metrics
- Server-side rendering for optimal SEO
- Image optimization with Next.js Image component
- Lazy loading and code splitting

## 🔧 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Fonts**: Inter, Outfit (Google Fonts)

## 📧 Contact

- **Email**: deepakkaruppasamy2005@gmail.com
- **GitHub**: [Deepakkaruppasamy](https://github.com/Deepakkaruppasamy)
- **LinkedIn**: [deepakkaruppasamy](https://www.linkedin.com/in/deepakkaruppasamy/)

## 📄 License

This project is open source and available for personal use.

---

Built with ❤️ by Deepak K
