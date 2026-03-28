# LiveMentors — Charity Conference Website 🤝

A full-stack multilingual website for **LiveMentors**, a charitable conference platform operated by [Dayaq Xeyriyyə](https://dayaq.az/). The platform serves as the public-facing hub for conference information, speaker profiles, schedules, and attendee registration — built with a complete CMS backend and admin panel.

> ✅ **This project is live in production** at [livementors.org](https://livementors.org/az)

🔗 **Live Website:** [livementors.org/az](https://livementors.org/az)
🔗 **Admin Panel (Next.js):** [github.com/pashaskerov21/livementor-admin](https://github.com/pashaskerov21/livementor-admin)
🔗 **Backend (PHP Laravel):** [github.com/pashaskerov21/livementors-api](https://github.com/pashaskerov21/livementors-api)

---

## 🗂️ Project Architecture

```
LiveMentors
├── livementors-nextjs    → Public website (Next.js + TypeScript)  ← this repo
├── livementor-admin      → Admin panel / CMS (Next.js + TypeScript)
└── livementors-api       → REST API (PHP Laravel)
```

---

## ✨ Features

- 🎤 **Conference platform** — Speaker profiles, event schedules, and session details
- 🌐 **Multilingual support** — Custom i18n routing with locale middleware (`/az`, `/en`, `/ru`)
- ⚡ **SSR / SSG** — Server-side rendering for fast load times and SEO performance
- 📱 **Fully responsive** — Optimized across all devices and screen sizes
- 📋 **Attendee registration** — Contact and application forms with validation
- 🔗 **REST API integration** — Dynamic content managed via Laravel backend
- 🗂️ **CMS-driven content** — All content managed through the admin panel
- 🎠 **Interactive UI elements** — Sliders, galleries, and animated sections
- 📦 **Global state management** — Redux Toolkit for application-wide state
- ✅ **Form handling** — Formik + Yup validation

---

## 🛠️ Tech Stack

### Frontend (this repo)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=flat-square&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-Custom_Routing-38B2AC?style=flat-square)

### Backend
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-009688?style=flat-square&logo=fastapi&logoColor=white)

---

## 📁 Project Structure

```
livementors-nextjs/
├── app/                  # Next.js App Router
│   └── [lang]/           # Locale-based dynamic routing
├── src/
│   ├── components/       # Reusable UI components
│   ├── redux/            # Redux Toolkit store & slices
│   └── types/            # TypeScript interfaces & types
├── lang/                 # i18n translation files (az, en, ru)
├── public/               # Static assets & images
├── middleware.ts          # Locale detection & redirect logic
└── i18n-config.ts        # Supported locales configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pashaskerov21/livementors-nextjs.git
cd livementors-nextjs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API base URL to .env

# Start development server
npm run dev
```

Open [http://localhost:3000/az](http://localhost:3000/az) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

---

## 🌍 Multilingual Routing

The app supports 3 locales with automatic detection and redirect:

| Locale | URL |
|--------|-----|
| Azerbaijani | `/az/...` |
| English | `/en/...` |
| Russian | `/ru/...` |

Locale routing is handled via Next.js middleware and a custom i18n config — no third-party i18n library required.

---

## 🏢 About LiveMentors

LiveMentors is a charitable conference initiative by [Dayaq Xeyriyyə](https://dayaq.az/), bringing together mentors, speakers, and participants for educational and community-driven events in Azerbaijan.

---

## 👤 Author

**Alipasha Askerov** — Frontend Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=flat-square&logo=vercel&logoColor=white)](https://alipashaskerov.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/alipasha-askerov-868213246)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/pashaskerov21)
