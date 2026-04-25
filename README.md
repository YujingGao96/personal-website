# Personal Website

Next.js personal website for Yujing Gao.

## Requirements

- Node.js 20.9 or newer
- npm

## Scripts

```bash
npm run dev
```

Starts the development server at [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

Builds the production app.

```bash
npm run start
```

Serves the production build. Run `npm run build` first.

```bash
npm run lint
```

Runs ESLint with the Next.js config.

## Blog CMS

The blog uses Vercel Blob for Markdown posts and images, Clerk for admin login, and Upstash Redis for low-cost popularity counters.

Required environment variables for the admin CMS:

```bash
BLOB_READ_WRITE_TOKEN=
BLOG_PUBLIC_READ_WRITE_TOKEN=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ADMIN_EMAILS=you@example.com
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

If Upstash is connected through Vercel Marketplace, the generated `KV_REST_API_URL` and `KV_REST_API_TOKEN` names are also supported.

Import the old Notion-backed posts as draft Markdown posts after Blob is configured:

```bash
npm run blog:import:notion
```
