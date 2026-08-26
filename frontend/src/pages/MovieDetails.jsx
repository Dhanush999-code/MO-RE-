import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Heart,
  Sparkles,
  Film,
} from "lucide-react";

const API_URL = "https://mo-re-01or.onrender.com";

function MovieDetails({ movieId, setActivePage }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
  if (!movieId) return;

  const savedMovies = JSON.parse(
    localStorage.getItem("more_my_list") || "[]"
  );

  setIsSaved(
    savedMovies.some(
      (item) => item.movie_id === movieId
    )
  );
}, [movieId]);
  useEffect(() => {
    if (!movieId) return;

    setLoading(true);

    fetch(`${API_URL}/api/movie/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }

        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [movieId]);
    const toggleMyList = () => {
  const savedMovies = JSON.parse(
    localStorage.getItem("more_my_list") || "[]"
  );

  if (isSaved) {
    const updatedMovies = savedMovies.filter(
      (item) => item.movie_id !== movie.movie_id
    );

    localStorage.setItem(
      "more_my_list",
      JSON.stringify(updatedMovies)
    );

    setIsSaved(false);
  } else {
    const updatedMovies = [
      ...savedMovies,
      {
        movie_id: movie.movie_id,
        title: movie.title,
        poster_url: movie.poster_url,
        rating: movie.rating,
        release_date: movie.release_date,
      },
    ];

    localStorage.setItem(
      "more_my_list",
      JSON.stringify(updatedMovies)
    );

    setIsSaved(true);
  }
};

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white">
        <Film size={40} className="mb-4 text-zinc-700" />

        <h2 className="text-xl font-semibold">
          Movie not found
        </h2>

        <button
          onClick={() => setActivePage("Discover")}
          className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          Back to Discover
        </button>
      </div>
    );
  }

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const rating = movie.rating
    ? movie.rating.toFixed(1)
    : "N/A";

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Back button */}
      <div className="relative z-20 px-6 pt-6 md:px-10">
        <button
          onClick={() => setActivePage("Discover")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 backdrop-blur-md transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Discover
        </button>
      </div>

      {/* Hero */}
      <div className="relative mt-[-55px] min-h-[650px] overflow-hidden">

        {/* Backdrop */}
        {movie.backdrop_url && (
          <img
            src={movie.backdrop_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[650px] max-w-6xl items-end px-6 pb-16 md:px-10">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col gap-10 md:flex-row md:items-end"
          >

            {/* Poster */}
            <div className="hidden w-[240px] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:block">

              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-zinc-900">
                  <Film className="text-zinc-700" size={50} />
                </div>
              )}

            </div>

            {/* Information */}
            <div className="max-w-3xl">

              <div className="mb-4 flex items-center gap-2 text-blue-400">
                <Sparkles size={15} />

                <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                  Movie Details
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-zinc-400">

                <span className="flex items-center gap-2">
                  <Calendar size={15} />
                  {year}
                </span>

                <span className="flex items-center gap-2">
                  <Star size={15} className="text-yellow-500" />
                  {rating}
                </span>

                {movie.runtime && (
                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {movie.runtime} min
                  </span>
                )}

              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">

                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {genre}
                    </span>
                  ))}

                </div>
              )}

              {/* Overview */}
              <p className="mt-7 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                {movie.overview || "No overview available for this movie."}
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">

                <button
  onClick={toggleMyList}
  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
    isSaved
      ? "bg-pink-500 text-white hover:bg-pink-600"
      : "bg-white text-black hover:bg-zinc-200"
  }`}
>
  <Heart
    size={17}
    fill={isSaved ? "currentColor" : "none"}
  />

  {isSaved ? "Saved to My List" : "Add to My List"}
</button>

                <button
                  onClick={() => setActivePage("Recommend")}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Sparkles size={17} />
                  Find Similar
                </button>

              </div>

            </div>

          </motion.div>

        </div>
      </div>

    </div>
  );
}

export default MovieDetails;