#  Met Museum Art Gallery

An elegant, mobile-friendly web application built with **Next.js 15 App Router**, **Tailwind CSS**, and the **Metropolitan Museum of Art API**. Explore the world of art with powerful features like:

- Paginated object listings
- Search by title and object ID
- Filter by department
- Deep linking to detail pages
- Mobile responsive design
- Built using React Server Components and App Router (Next 15)

---

## Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [Met Museum Open Access API](https://metmuseum.github.io/)
- React Server Components + React 19 streaming
- TypeScript
- App Router Directory Structure

---

##  Installation Instructions

1. **Unzip Files**

```bash
cd baron_doss_met_api
```

2. **Install dependencies**

```bash
npm install
```

> Dependencies include:
> - `next@15`
> - `react@18`
> - `tailwindcss`
> - `axios`
> - `typescript`, `postcss`, `autoprefixer`

3. **Run the development server**

```bash
npm run dev
```

Then open your browser to:

```
http://localhost:3000
```

---

##  Features

- **Search** for artworks by title
- **Filter** by department (e.g. Egyptian Art, Modern Art)
- **Search by Object ID** and jump directly to the piece
- **Paginated** grid layout of artwork cards
- **Detail pages** show artist, medium, date, and image
- Fully **responsive design**
- Uses `next/navigation` and `react.use()` to unwrap params

---

## 📦 Dependencies

```json
"dependencies": {
  "axios": "^1.6.2",
  "next": "15.0.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "tailwindcss": "^3.4.0"
},
"devDependencies": {
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.21",
  "typescript": "^5.2.2"
}
```

---

## 🧠 Advanced Notes

- Uses **React Server Components** and `use(params)` to unwrap route params for future compatibility
- TailwindCSS handles all styling — no extra UI libraries needed
- Dynamic routing via `app/object/[id]/page.tsx`
- SEO metadata can be added via `generateMetadata()` in App Router
- Hard stop at the 2 hour and 15 minute mark code is working as expected. Installed Shadcn but didn't complete additional styling. 

---

## 🧑‍💻 Author

Built by [Baron Doss](https://barondoss.com)

---

## 📄 License

MIT — do what you want, but give credit where credit's due 