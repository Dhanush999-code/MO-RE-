import os
import pickle
import requests
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

with open("data/movies.pkl", "rb") as file:
    movies = pickle.load(file)

with open("data/similarity.pkl", "rb") as file:
    similarity = pickle.load(file)


def get_all_movies():
    return movies["title"].tolist()


def get_poster(movie_id):
    if not TMDB_API_KEY:
        return None

    try:
        response = requests.get(
            f"https://api.themoviedb.org/3/movie/{movie_id}",
            params={"api_key": TMDB_API_KEY},
            timeout=5
        )

        if response.status_code != 200:
            return None

        data = response.json()
        poster_path = data.get("poster_path")

        if poster_path:
            return f"https://image.tmdb.org/t/p/w500{poster_path}"

    except requests.RequestException:
        pass

    return None


def recommend_movies(movie_title: str, limit: int = 5):

    matches = movies[
        movies["title"].str.lower() == movie_title.lower()
    ]

    if matches.empty:
        return None

    movie_index = matches.index[0]

    distances = similarity[movie_index]

    movie_indices = sorted(
        enumerate(distances),
        key=lambda x: x[1],
        reverse=True
    )

    recommendations = movie_indices[1:limit + 1]

    results = []

    for index, score in recommendations:

        movie = movies.iloc[index]
        movie_id = int(movie["movie_id"])

        results.append({
            "movie_id": movie_id,
            "title": movie["title"],
            "similarity_score": round(float(score), 4),
            "poster_url": get_poster(movie_id)
        })

    return results