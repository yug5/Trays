# 🧠 Trays — A Tray for Everyday Mood

Trays is an AI-powered mood journal that transforms your daily thoughts into visual emotional insights. It's a beautifully designed web app where users can log their day, and the app detects their mood using AI and presents it with colors, emojis, and music.

---

## ✨ Features

- 📝 **Daily Journaling** – Users can write about their day and save it.
- 🎭 **Mood Detection** – AI analyzes the journal and assigns a mood.
- 🌈 **Visual Mood Representation** – Animated transitions, emojis, and vibes.
- 📆 **Calendar View** – A notebook-style grid showing past moods with emojis.
- 🎧 **Spotify Suggestions** – Suggests music that matches your mood.
- 📊 **Monthly Mood Stats** – Breakdown of happy/sad/meh days with emoji charts.
- 🔁 **Update Journal** – Users can revisit and edit their mood entries.
- 🔒 **Authentication** – Email/password login powered by NextAuth.
- ☁️ **Cloud Upload** – Profile image uploads handled with Cloudinary.

---

## 🛠️ Tech Stack

| Layer        | Tech Used                         |
|--------------|----------------------------------|
| Frontend     | Next.js 14 (App Router), Tailwind CSS, shadcn/ui |
| Backend      | Next.js API Routes, Prisma ORM   |
| Database     | PostgreSQL                       |
| Auth         | NextAuth.js (Email/Password)     |
| AI Analysis  | Mistral + Hugging Face (NLP APIs)|
| Media Upload | Cloudinary                       |
| Music API    | Spotify Web API                  |

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/yug5/Trays.git
   cd Trays

    Install dependencies

npm install

Set up environment variables
Create a .env file and add:

DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_secret
CLOUDINARY_URL=cloudinary_upload_url

Run the app

    npm run dev

📸 Screenshots

   <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e0a4a3fd-cdc3-4baf-a47d-9c3ab2eb0136" />
   <img width="1920" height="1078" alt="image" src="https://github.com/user-attachments/assets/a5476c05-8cc3-46cb-b000-9389988e39e0" />


    Home page with "Today's Vibe"

    Emoji-based calendar

    Monthly mood insights

    Journal entry page with AI suggestions

🧪 Roadmap 

    🧬 Personalized mood history insights

    📱 Responsive PWA mode for mobile journaling

    🧘 Mental health tips based on mood trends

    👥 Friend mood sharing & anonymous public moods

🤝 Contributing

Contributions are welcome! Feel free to:

    Open issues

    Suggest features

    Fork the repo and submit pull requests

📬 Feedback & Suggestions

Loved using Trays? Have a feature idea or just want to share your mood?
Drop your feedback here or open an issue!
🧑‍💻 Author

Yug Shrimali
→ LinkedIn https://www.linkedin.com/in/yug-shrimali/
→ Portfolio https://portfolio-yug6s-projects.vercel.app/
⭐️ Show Some Love

If you found this project helpful, leave a ⭐ on the repo and share it!
Let’s help more people feel seen, one emoji at a time 🌞🌧️🌈
