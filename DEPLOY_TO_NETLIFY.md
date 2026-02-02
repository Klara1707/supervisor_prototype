# Deploying Your Vite React App to Netlify

1. **Build your app**
   - You already ran:
     ```sh
     npm run build
     ```
   - This creates a `dist` folder with your production build.

2. **Sign up or log in to Netlify**
   - Go to https://app.netlify.com/

3. **Create a new site**
   - Click "Add new site" > "Import an existing project".
   - Connect your GitHub repo (recommended) **or** drag-and-drop the `dist` folder for a manual deploy.

   **For drag-and-drop/manual deploy:**
   - Click "Deploy manually".
   - Drag your `dist` folder into the upload area.

   **For GitHub deploy:**
   - Select your repo.
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site".

4. **Configure redirects (optional)**
   - If you use React Router, add a `_redirects` file in `public/` with this line:
     ```
     /*    /index.html   200
     ```
   - This is already present in your project.

5. **Wait for deploy**
   - Netlify will build and deploy your site.
   - You’ll get a live URL when it’s done!

6. **Custom domain (optional)**
   - In Netlify, go to "Domain settings" to add your own domain.

---

**Troubleshooting:**
- If you see a blank page, check the `_redirects` file and make sure your build output is in `dist`.
- For environment variables, set them in Netlify's site settings under "Environment variables".

---

You’re ready to go! For more, see: https://docs.netlify.com/
