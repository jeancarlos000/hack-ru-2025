# hack-ru-2025

A volunteer opportunities platform with AI-powered summaries using Google Gemini.

## Setup

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```bash
cp .env.example .env
```

4. Get your Google Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

5. Add your API key to the `.env` file:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

6. Start the development server:
```bash
npm run dev
```

## Features

- **Browse Volunteer Opportunities**: View volunteer opportunities from VolunteerConnector API
- **AI Summaries**: Click "Summarize with AI" on any opportunity to get a concise summary powered by Google Gemini
- **Modern UI**: Clean, responsive design with smooth interactions

## Tech Stack

- React + Vite
- Google Gemini AI (gemini-pro model)
- VolunteerConnector API