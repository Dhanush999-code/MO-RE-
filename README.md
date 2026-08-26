# MO-RE — Movie Recommendation Platform

MO-RE is a full-stack movie discovery and recommendation platform that helps users discover movies, explore movie details, and receive personalized recommendations through a modern web interface.

## Features

* 🎬 Browse and discover movies
* 🔎 Search and explore movie information
* ⭐ Movie recommendations
* 🎭 Discover movies by different categories
* 📖 Detailed movie information
* ⚡ Fast and responsive React frontend
* 🚀 REST API powered by FastAPI
* 🌐 Deployed frontend and backend using Render

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn

### Deployment

* GitHub — Source code and version control
* Render — Frontend and backend deployment

## Project Structure

```text
MO-RE/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

## API Endpoints

The FastAPI backend currently provides the following endpoints:

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| GET    | `/`                     | API status / welcome endpoint    |
| GET    | `/api/movies`           | Get movies                       |
| GET    | `/api/recommend`        | Get movie recommendations        |
| GET    | `/api/discover`         | Discover movies                  |
| GET    | `/api/movie/{movie_id}` | Get details for a specific movie |

Interactive API documentation is available through FastAPI Swagger UI at:

```text
/backend-url/docs
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd MO-RE
```

### 2. Run the backend

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

### 3. Run the frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Environment Variables

For production, the frontend should use the deployed FastAPI backend URL through an environment variable rather than hardcoding the API URL throughout individual components.

Example:

```text
VITE_API_URL=https://your-backend.onrender.com
```

## Deployment

The project is deployed as two services:

```text
                    MO-RE
                      │
          ┌───────────┴───────────┐
          │                       │
     React Frontend           FastAPI Backend
       Render                    Render
          │                       │
          └────────── API ────────┘
```

The frontend communicates with the FastAPI backend through the REST API.

## Development Workflow

1. Make changes locally.
2. Test the frontend and backend.
3. Commit the changes to Git.
4. Push to GitHub.
5. Render automatically deploys the updated services.

## Future Improvements

* User authentication
* Personalized recommendation profiles
* Movie ratings and reviews
* Watchlist functionality
* Advanced filtering
* Genre-based recommendations
* Improved recommendation algorithms
* Mobile responsive improvements
* Automated testing
* CI/CD improvements

## License

This project is currently intended for educational and development purposes.
