<div align="center">

# 💰 AI Finance Platform

### A smart personal finance management platform powered by Google Gemini AI

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-finance-platform-steel-psi.vercel.app)

**[🚀 Live Demo](https://ai-finance-platform-steel-psi.vercel.app)**

</div>

---

## 📌 Overview

AI Finance Platform is a full-stack web application that helps users manage their personal finances intelligently. It uses **Google Gemini AI** to analyze spending patterns, generate monthly financial reports, and send automated email alerts when budgets are exceeded. The platform supports multiple accounts, recurring transactions, and provides a detailed visual dashboard with charts.

This project was built as a **Final Year Project** demonstrating modern web development, AI integration, third-party services, and production-ready deployment.

---

## ✨ Features

### 🤖 AI-Powered
- **Monthly Financial Reports** — Gemini AI analyzes transactions and generates personalized insights every month
- **AI Receipt Scanner** — Upload a receipt image and AI auto-fills transaction details
- **AI Chatbot** — Chatbase-powered assistant on the dashboard for 24/7 financial guidance
- **Budget Alert Emails** — Automated email sent when spending exceeds 80% of budget

### 📊 Dashboard & Analytics
- Overview of all accounts with total balance
- Income vs expense bar charts (Recharts)
- Category-wise spending breakdown
- Monthly trends visualization
- Recent transaction feed

### 💳 Account Management
- Create multiple accounts (checking, savings, credit card, etc.)
- Set one account as default
- Per-account transaction history
- Real-time balance tracking

### 📝 Transaction Management
- Add income and expense transactions
- Assign categories (food, transport, salary, etc.)
- Support for recurring transactions (daily, weekly, monthly, yearly)
- Bulk delete transactions
- Search and filter by type, category, date
- **Export to CSV** — Download transactions as spreadsheet
- **Export to PDF** — Generate professional printable report

### 🎨 Modern UI/UX
- Animated landing page with gradient effects
- Full dark mode support with system preference detection
- Glassmorphism design elements
- Staggered CSS animations
- Fully responsive (mobile, tablet, desktop)

### 🔒 Security & Rate Limiting
- Arcjet integration for bot protection and rate limiting
- Clerk authentication with secure sessions
- Protected API routes

### 📧 Email System
- Beautiful HTML email templates (React Email + Resend)
- Monthly report delivery
- Budget exceeded alerts

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | JavaScript |
| **Database** | PostgreSQL via Prisma ORM |
| **Authentication** | Clerk |
| **AI** | Google Gemini AI (`@google/generative-ai`) |
| **Background Jobs** | Inngest |
| **Email** | Resend + React Email |
| **UI Components** | Radix UI + shadcn/ui |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |
| **Security** | Arcjet |
| **Chatbot** | Chatbase |
| **Deployment** | Vercel |

---

## 📁 Project Structure
AI-FINANCE-PLATFORM/
├── app/
│   ├── (auth)/              # Sign in / Sign up pages
│   ├── (main)/
│   │   ├── dashboard/       # Main dashboard with charts & AI chatbot
│   │   ├── account/         # Account detail + transaction table
│   │   └── transaction/     # Add/edit transaction
│   └── api/
│       ├── inngest/         # Background job handlers
│       └── seed/            # Database seeding
├── actions/                 # Server actions (transactions, accounts, budgets)
├── components/
│   ├── ui/                  # Reusable shadcn/ui components
│   ├── hero.jsx             # Animated landing page hero
│   ├── header.jsx           # Navigation with dark mode toggle
│   ├── chatbase-widget.jsx  # AI chatbot widget
│   └── theme-toggle.jsx     # Light/dark mode switch
├── data/                    # Categories and seed data
├── emails/                  # React Email templates
│   ├── budget-alert.jsx     # Budget exceeded email
│   └── monthly-report.jsx   # AI-generated monthly report email
├── hooks/                   # Custom React hooks
├── lib/
│   ├── prisma.js            # Database client
│   ├── inngest/             # Background job definitions
│   │   ├── client.js
│   │   └── functions.js     # Monthly report + budget alert jobs
│   ├── arcjet.js            # Rate limiting config
│   └── utils.js             # Helper functions
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── middleware.js            # Clerk auth middleware
└── next.config.mjs

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud e.g. Neon, Supabase)
- Accounts for: Clerk, Google AI Studio, Resend, Inngest, Arcjet

### 1. Clone the repository

```bash
git clone https://github.com/zafarali12/AI-FINANCE-PLATFORM.git
cd AI-FINANCE-PLATFORM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/financedb"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Resend (Email)
RESEND_API_KEY=re_...

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# Arcjet (Security)
ARCJET_KEY=ajkey_...
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema (Key Models)

User         — synced with Clerk, holds budget info
Account      — checking/savings/credit accounts per user
Transaction  — income/expense records with category & recurrence
Budget       — monthly budget limit per user

---

## 🤖 AI Features — How They Work

### Monthly Report Generation
Inngest runs a cron job on the 1st of each month. It fetches all user transactions from the previous month, sends the data to **Google Gemini**, and receives a structured financial analysis. This is then formatted into a beautiful HTML email and sent via **Resend**.

### AI Receipt Scanner
When a user uploads a receipt image while adding a transaction, the image is sent to Gemini's vision model. The AI reads the amount, merchant name, date, and category, then pre-fills the transaction form automatically.

### Budget Alert
Another Inngest job checks daily whether any user's spending has exceeded 80% of their monthly budget. If triggered, an alert email is sent automatically.

---

## 📤 Export Features

From any account's transaction page:

- **CSV Export** — Downloads a `.csv` file with all visible transactions (respects active filters). Compatible with Excel and Google Sheets.
- **PDF Export** — Opens a print-ready HTML report in the browser with a summary card (total income, expenses, net balance) and a full transaction table.

Both exports respect all active filters including search, type filter, and sort order.

---

## 🌙 Dark Mode

Click the **Sun/Moon icon** in the header to toggle between light and dark mode. The preference is saved automatically and follows your system setting by default.

---

## 🚀 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy — Vercel handles the rest automatically

For Inngest background jobs in production, connect your Vercel deployment to your Inngest account at [app.inngest.com](https://app.inngest.com).

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `@clerk/nextjs` | Authentication |
| `@google/generative-ai` | AI features (reports, receipt scanning) |
| `@prisma/client` | Database ORM |
| `inngest` | Background jobs & cron tasks |
| `resend` | Email delivery |
| `@react-email/components` | HTML email templates |
| `recharts` | Dashboard charts |
| `@arcjet/next` | Rate limiting & bot protection |
| `react-hook-form` + `zod` | Form handling & validation |
| `next-themes` | Dark mode |
| `sonner` | Toast notifications |
| `date-fns` | Date formatting |
| `vaul` | Drawer/sheet components |

---

## 📸 Screenshots

> Add screenshots of your dashboard, landing page, transaction table, and email reports here.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — React framework
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Google Gemini](https://ai.google.dev/) — AI capabilities
- [Clerk](https://clerk.com/) — Authentication
- [Inngest](https://www.inngest.com/) — Background jobs
- [Resend](https://resend.com/) — Email delivery
- [Chatbase](https://chatbase.co/) — AI chatbot

---

## 📄 License

This project is for educational purposes as a Final Year Project.

---

<div align="center">
Built with ❤️ by <a href="https://github.com/zafarali12">Zafar Ali</a>
</div>
