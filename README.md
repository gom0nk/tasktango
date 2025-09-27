# TaskTango

A modern, efficient task management application built with Next.js, featuring a Todoist-inspired interface with a monochrome theme and powerful search capabilities.

## ✨ Features

- **Modern UI/UX**: Clean, monochrome design inspired by Todoist
- **Authentication**: Secure user registration and login with JWT tokens
- **Global Search**: Quick access to all features with `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Task Management**: Intuitive dashboard for managing tasks and projects
- **Database Integration**: PostgreSQL with Prisma ORM for reliable data storage

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasktango
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/tasktango"
   JWT_SECRET="your-jwt-secret-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── v1/user/       # User authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Auth/              # Authentication components
│   ├── ui/                # Shadcn/ui components
│   ├── GlobalSearch.tsx   # Global search overlay
│   └── theme-provider.tsx # Theme management
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication helpers
│   ├── prisma.ts         # Database client
│   └── utils.ts          # General utilities
└── service/              # Business logic
    └── authService.ts    # Authentication service
```

## 🎯 Key Features

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Persistent login sessions with localStorage

### Global Search
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to open
- Search across pages and actions
- Keyboard navigation support
- Quick access to all app features

### Theme System
- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth transitions

### Dashboard
- Task overview with visual indicators
- Project organization
- Quick task creation
- Responsive sidebar navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🗄️ Database Schema

The application uses a simple user schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Lucide](https://lucide.dev/) for the beautiful icons

---

Built with ❤️ using Next.js and modern web technologies.