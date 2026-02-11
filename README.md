<div align="center">
  
# ✈️ travellersmeet

<h3>Meet verified travellers. Make real connections. 🌍</h3>

[![Contributors](https://img.shields.io/github/contributors/singh-odyssey/travellers?style=for-the-badge)](https://github.com/singh-odyssey/travellers/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/singh-odyssey/travellers?style=for-the-badge)](https://github.com/singh-odyssey/travellers/stargazers)
[![Forks](https://img.shields.io/github/forks/singh-odyssey/travellers?style=for-the-badge)](https://github.com/singh-odyssey/travellers/network/members)
[![Pull Requests](https://img.shields.io/github/issues-pr/singh-odyssey/travellers?style=for-the-badge)](https://github.com/singh-odyssey/travellers/pulls)
[![Issues](https://img.shields.io/github/issues/singh-odyssey/travellers?style=for-the-badge)](https://github.com/singh-odyssey/travellers/issues)
[![License](https://img.shields.io/github/license/singh-odyssey/travellers?style=for-the-badge)](LICENSE)

### **Privacy-first. Verified-only. Connection-focused.**

*Your all-in-one platform for connecting with verified travellers heading to the same destination. Built with Next.js, TypeScript, and modern web technologies for a seamless, secure experience.*

[Getting Started](#-installation) • [Documentation](#-documentation) • [Contributing](docs/CONTRIBUTING.md) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About

**travellersmeet** helps solo travellers find and connect with others heading to the same destination around the same dates. Upload proof-of-travel, get verified, and discover other verified travellers in your trip window.

### Why travellersmeet?

- ✅ **Verified Travellers Only** — Upload travel tickets to get verified. Only verified users can view other profiles.
- 🔒 **Privacy-First** — Your data stays secure. Visibility limited to matching destination/date windows.
- 🎯 **Smart Matching** — Find travellers with similar dates and destinations automatically.
- 🚀 **Modern Tech Stack** — Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.
- 📱 **Progressive Web App** — Install on any device with offline support.
- 🌐 **Open Source** — Community-driven development. Contributions welcome!

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.18+ and **npm** 9+
- **PostgreSQL** database (local or cloud)
- **Git** for version control

### Quick Start

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/singh-odyssey/travellers.git
cd travellers
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
NEXTAUTH_SECRET="generate-a-strong-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Google Maps API (for route visualization)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

> 💡 **Tip**: Generate a secure secret with `npm run generate:secret` or use `openssl rand -base64 32`

#### 4️⃣ Set up the database

```bash
npm run db:push
```

#### 5️⃣ Start the development server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📚 How It Works

1. **Sign Up** — Create an account with email and password
2. **Upload Ticket** — Submit your travel proof (ticket, booking confirmation)
3. **Get Verified** — Admin verification process (manual for now, automated later)
4. **Match & Connect** — Discover travellers with matching destinations and dates
5. **Chat & Plan** — Connect with verified travellers (messaging coming soon!)

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 14** (App Router) | React framework with SSR & file-based routing |
| **TypeScript** | Type-safe development |
| **React 18** | UI library with modern features |
| **Tailwind CSS** | Utility-first CSS framework |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| **NextAuth v5** | Authentication with credentials provider |
| **Prisma ORM** | Type-safe database queries & migrations |
| **PostgreSQL** | Relational database |
| **bcryptjs** | Secure password hashing |

### Developer Tools

| Technology | Purpose |
|------------|---------|
| **Vitest** | Unit testing framework |
| **ESLint** | Code linting |
| **Prettier** | Code formatting (via ESLint) |
| **Docker** | Containerized development |

### Deployment

| Technology | Purpose |
|------------|---------|
| **Vercel** | Production hosting |
| **Neon/Supabase** | PostgreSQL hosting |

---

## 📂 Project Structure

```
travellers/
├── 📁 src/
│   ├── app/              # Next.js app router pages & API routes
│   │   ├── (auth)/       # Authentication pages (signin, signup)
│   │   ├── api/          # Backend API endpoints
│   │   ├── dashboard/    # User dashboard
│   │   ├── routes/       # Route management & visualization
│   │   └── upload/       # Ticket upload flow
│   ├── components/       # React components
│   ├── lib/              # Utility libraries (auth, prisma, etc.)
│   ├── state/            # State management
│   └── styles/           # Global styles
├── 📁 prisma/            # Database schema & migrations
├── 📁 public/            # Static assets
├── 📁 docs/              # Documentation
└── 📁 scripts/           # Utility scripts

```

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels!

### Contribution Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/travellers.git`
3. **Create a branch**: `git checkout -b feat/amazing-feature`
4. **Make your changes** and commit: `git commit -m "feat: add amazing feature"`
5. **Push to branch**: `git push origin feat/amazing-feature`
6. **Submit a Pull Request** with a detailed description

### Development Guidelines

- 📝 Write clear commit messages ([Conventional Commits](https://www.conventionalcommits.org/))
- ✅ Add tests for new features
- 📖 Update documentation as needed
- 🧹 Run `npm run lint` before committing
- 🔍 Keep PRs focused and small

👉 **Read the full guide**: [CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 📑 Documentation

- **[Tech Stack](docs/TECH_STACK.md)** — Detailed technology overview
- **[Contributing Guide](docs/CONTRIBUTING.md)** — How to contribute
- **[Code of Conduct](docs/CODE_OF_CONDUCT.md)** — Community guidelines
- **[Backend Setup](docs/BACKEND_SETUP.md)** — Backend configuration
- **[PWA Setup](docs/PWA_SETUP.md)** — Progressive Web App features
- **[Production Database](docs/PRODUCTION_DB_SETUP.md)** — Production deployment

---

## 👥 Contributors

We appreciate all contributions from our amazing community! 🎉

<a href="https://github.com/singh-odyssey/travellers/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=singh-odyssey/travellers" alt="Contributors" />
</a>

*Made with [contrib.rocks](https://contrib.rocks)*

Want to be featured here? Check out our [Contributing Guide](docs/CONTRIBUTING.md)!

---

## 📊 Project Statistics

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/singh-odyssey/travellers?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/singh-odyssey/travellers?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/singh-odyssey/travellers?style=flat-square)
![Lines of code](https://img.shields.io/tokei/lines/github/singh-odyssey/travellers?style=flat-square)

---

## 🌟 Community

Join our community and stay connected!

- 💬 **Discussions**: [GitHub Discussions](https://github.com/singh-odyssey/travellers/discussions)
- 🐛 **Issues**: [Report bugs or request features](https://github.com/singh-odyssey/travellers/issues)
- 📧 **Email**: singh-odyssey@github.com

### Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub! It helps others discover the project.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 travellersmeet contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🙏 Acknowledgements

Built with ❤️ by the community using:
- [Next.js](https://nextjs.org/) — The React Framework
- [Prisma](https://www.prisma.io/) — Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) — Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) — A utility-first CSS framework
- [Vercel](https://vercel.com/) — Deployment and hosting

---

<div align="center">

### 🚀 Ready to connect travellers worldwide?

**[Get Started](#-installation)** • **[View Demo](https://travellers-meet.vercel.app)** • **[Report Bug](https://github.com/singh-odyssey/travellers/issues)**

Made with 💙 by [singh-odyssey](https://github.com/singh-odyssey) and [contributors](https://github.com/singh-odyssey/travellers/graphs/contributors)

---

⭐️ **Star us on GitHub — it helps!** ⭐️

</div>
