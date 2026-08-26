from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.recommender import recommend_movies, get_all_movies
from app import recommender
import requests




app = FastAPI(
    title="U Just Need MO-RE",
    description="Movie Recommendation System",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                  "https://mo-re1.onrender.com", ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "U Just Need MO-RE API is running 🎬"
    }


@app.get("/api/movies")
def get_movies():
    return {
        "movies": get_all_movies()
    }


@app.get("/api/recommend")
def get_recommendations(movie: str):

    recommendations = recommend_movies(movie)

    if recommendations is None:
        raise HTTPException(
            status_code=404,
            detail=f"Movie '{movie}' was not found."
        )

    return {
        "selected_movie": movie,
        "recommendations": recommendations
    }
@app.get("/api/discover")
def discover_movies(search: str = ""):

    filtered_movies = recommender.movies

    if search:
        filtered_movies = filtered_movies[
            filtered_movies["title"]
            .str.contains(search, case=False, na=False)
        ]

    filtered_movies = filtered_movies.head(30)

    results = []

    for _, movie in filtered_movies.iterrows():

        movie_id = int(movie["movie_id"])

        results.append({
            "movie_id": movie_id,
            "title": movie["title"],
            "poster_url": recommender.get_poster(movie_id)
        })

    return {
        "movies": results
    }
@app.get("/api/movie/{movie_id}")
def get_movie_details(movie_id: int):
    try:
        response = requests.get(
            f"https://api.themoviedb.org/3/movie/{movie_id}",
            params={"api_key": recommender.TMDB_API_KEY},
            timeout=5
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=404,
                detail="Movie not found"
            )

        data = response.json()

        return {
            "movie_id": movie_id,
            "title": data.get("title"),
            "overview": data.get("overview"),
            "release_date": data.get("release_date"),
            "rating": data.get("vote_average"),
            "vote_count": data.get("vote_count"),
            "runtime": data.get("runtime"),
            "genres": [
                genre["name"]
                for genre in data.get("genres", [])
            ],
            "poster_url": (
                f"https://image.tmdb.org/t/p/w500"
                f"{data['poster_path']}"
                if data.get("poster_path")
                else None
            ),
            "backdrop_url": (
                f"https://image.tmdb.org/t/p/original"
                f"{data['backdrop_path']}"
                if data.get("backdrop_path")
                else None
            )
        }

    except requests.RequestException:
        raise HTTPException(
            status_code=500,
            detail="TMDB request failed"
        )