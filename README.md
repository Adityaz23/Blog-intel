
```
 🚀 Blog Intel

A modern, full-stack blog application built with cutting-edge web technologies.  
Blog Intel provides secure authentication, real-time data updates, and a clean, scalable architecture using the latest Next.js App Router paradigm.

---

## 🧠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** better-auth
- **Backend & Database:** Convex (Real-time backend)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** pnpm (npm, yarn, and bun also supported)

---

## ✨ Features

- 🔐 Secure authentication using better-auth
- 📝 Create, edit, and delete blog posts
- ⚡ Real-time database updates with Convex
- 📱 Fully responsive UI
- 🎨 Modern design powered by Tailwind CSS
- 🧩 Scalable App Router architecture
- 🚀 Optimized server and client components
- 🔄 Fast development workflow with hot reload

---

# or
bun dev
# or
pnpm dev
# or npm run dev

# Project Structure :-

├── 📁 app
│   ├── 📁 (shared-layout)
│   │   ├── 📁 blogs
│   │   │   ├── 📁 [postId]
│   │   │   │   ├── 📄 loading.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 create
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 api
│   │   ├── 📁 auth
│   │   │   └── 📁 [...all]
│   │   │       └── 📄 route.ts
│   │   └── 📁 create-route
│   │       └── 📄 route.ts
│   ├── 📁 auth
│   │   ├── 📁 login
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 signup
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 schemas
│   │   ├── 📄 auth.ts
│   │   ├── 📄 blog.ts
│   │   └── 📄 comments.ts
│   ├── 📄 AppProviders.tsx
│   ├── 📄 actions.ts
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   └── 📄 layout.tsx
├── 📁 components
│   ├── 📁 ui
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 field.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 separator.tsx
│   │   ├── 📄 skeleton.tsx
│   │   ├── 📄 sonner.tsx
│   │   ├── 📄 textarea.tsx
│   │   └── 📄 theme-provider.tsx
│   └── 📁 web
│       ├── 📄 CommentSection.tsx
│       ├── 📄 ConvexClientProvider.tsx
│       ├── 📄 Footer.tsx
│       ├── 📄 Navbar.tsx
│       ├── 📄 PostPresence.tsx
│       ├── 📄 SearchInput.tsx
│       └── 📄 theme-toggle.tsx
├── 📁 convex
│   ├── 📁 _generated
│   │   ├── 📄 api.d.ts
│   │   ├── 📄 api.js
│   │   ├── 📄 dataModel.d.ts
│   │   ├── 📄 server.d.ts
│   │   └── 📄 server.js
│   ├── 📁 betterAuth
│   │   ├── 📁 _generated
│   │   │   ├── 📄 api.ts
│   │   │   ├── 📄 component.ts
│   │   │   ├── 📄 dataModel.ts
│   │   │   └── 📄 server.ts
│   │   ├── 📄 adapter.ts
│   │   ├── 📄 auth.ts
│   │   ├── 📄 convex.config.ts
│   │   └── 📄 schema.ts
│   ├── 📝 README.md
│   ├── 📄 auth.config.ts
│   ├── 📄 comments.ts
│   ├── 📄 convex.config.ts
│   ├── 📄 http.ts
│   ├── 📄 posts.ts
│   ├── 📄 presence.ts
│   ├── 📄 schema.ts
│   └── ⚙️ tsconfig.json
├── 📁 lib
│   ├── 📄 auth-client.ts
│   ├── 📄 auth-server.ts
│   └── 📄 utils.ts
├── 📁 public
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── ⚙️ pnpm-workspace.yaml
├── 📄 postcss.config.mjs
├── 📄 proxy.ts
├── 📄 sampleData.jsonl
└── ⚙️ tsconfig.json 
```
