This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#46 min
npm install next@latest
npm install react-responsive-carousel

# building /scrapper/index.ts/scrapeAmazonProduct

BRIGHT_DATA_USERNAME=
BRIGHT_DATA_PASSWORD=

npm install axios --legacy-peer-deps
npm install axios cheerio --legacy-peer-deps

# 1:49:15 build mongoDB : https://cloud.mongodb.com/

npm install mongoose --legacy-peer-deps

# 2:58:13 implementing /components/Modal.tsx

# https://headlessui.com/react/menu

npm install @headlessui/react --legacy-peer-deps

# 3:15:23 install nodemailer https://nodemailer.com/ - sending emails package

npm install nodemailer --legacy-peer-deps
npm install --save-dev @types/nodemailer --legacy-peer-deps

# 3:47:01 github and deployement

# open terminal

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/lead1974/pricewise.git
git push -u origin main

# fixing dependencies to compile

npm install eslint@^8.0.0 eslint-config-next@latest --save-dev
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm dedupe
