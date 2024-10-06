# Blog Platform

A **Blog Platform** built with **Angular** and integrated with **Firebase** services for authentication, database operations (CRUD), analytics, and hosting. The application includes SEO optimization and is a Progressive Web App (PWA) for offline access.

---

## GitHub Repo

git clone [https://github.com/BennyChrispin/Blog-App]
cd frontend
npm install

## Live Demo

[https://blog-1e3cd.web.app]

## **Table of Contents**

- [Blog Platform](#blog-platform)
  - [GitHub Repo](#github-repo)
  - [Live Demo](#live-demo)
  - [**Table of Contents**](#table-of-contents)
  - [**Project Overview**](#project-overview)
  - [**Features**](#features)
  - [**Tech Stack**](#tech-stack)
  - [**Folder Structure**](#folder-structure)

---

## **Project Overview**

This platform allows users to:

- Register and log in using **Firebase Authentication** (with email/password and Google sign-in).
- Perform CRUD operations on blog posts and comments using **Firestore**.
- Leverage **Firebase Analytics** for usage tracking.
- Access the blog posts offline with **Progressive Web App (PWA)** support.
- Deploy to **Firebase Hosting** with SEO optimization and a user-friendly experience.

---

## **Features**

- **Firebase Authentication**: Email/Password and Google Sign-In.
- **Firestore**: CRUD operations for blog posts and real-time comment updates.
- **SEO Optimization**: Angular Universal for Server-Side Rendering (SSR) and dynamic meta tags.
- **Progressive Web App (PWA)**: Offline support with a service worker and manifest.
- **Firebase Analytics**: Track page views and custom user events.
- **Responsive Design**: Fully responsive design with Tailwind CSS.

---

## **Tech Stack**

- **Frontend**: Angular, TypeScript, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore Database
- **SEO**: Angular Universal, meta tags, structured data
- **Analytics**: Firebase Analytics
- **Hosting**: Firebase Hosting
- **PWA**: Service Workers, Manifest

---

## **Folder Structure**

```plaintext
src/
│
├── auth/                # Authentication module (Firebase Auth)
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── user-profile/    # User profile management
│
├── core/                # Core services (Authentication, SEO)
│   ├── auth.service.ts  # Firebase Authentication service
│   ├── seo.service.ts   # SEO meta tag service
│
├── blog/                # Blog module (CRUD for blog posts and comments)
│   ├── blog-list/       # Display list of blog posts
│   ├── blog-detail/     # Display blog post details
│   ├── blog-create/     # Create a new blog post
│   ├── blog-edit/       # Edit a blog post
│   ├── comment-section/ # Comment section with real-time updates
│
├── shared/              # Shared components (Header, Footer, Navbar)
│   ├── header/          # Header component
│   ├── footer/          # Footer component
│   ├── navbar/          # Navigation bar
│
├── pwa/                 # PWA (Service Worker, Manifest)
│   ├── manifest.json    # PWA manifest configuration
│   ├── service-worker.js# Service Worker for caching and offline support
│
├── environments/        # Environment settings for different builds
│   ├── environment.ts   # Development environment configuration
│   ├── environment.prod.ts  # Production environment configuration

```
