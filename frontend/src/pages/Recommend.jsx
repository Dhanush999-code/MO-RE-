import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Loader2,
  Star,
  Film,
} from "lucide-react";

const API_URL = "https://mo-re-01or.onrender.com";

function Recommend() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState("");

  // Load movie titles
  useEffect(() => {
    fetch(`${API_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies || []);
        setLoadingMovies(false);
      })
      .catch(() => {
        setError("Unable to connect to MO-RE server.");
        setLoadingMovies(false);
      });
  }, []);

  const filteredMovies = movies
    .filter((movie) =>
      movie.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);

  const getRecommendations = async () => {
    if (!selectedMovie) return;

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await fetch(
        `${API_URL}/api/recommend?movie=${encodeURIComponent(
          selectedMovie
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Recommendation failed");
      }

     setRecommendations(data.recommendations);

// Save recommendation to History
const history = JSON.parse(
  localStorage.getItem("more_history") || "[]"
);

const historyItem = {
  id: Date.now(),
  movie: selectedMovie,
  recommendationCount: data.recommendations.length,
  recommendations: data.recommendations,
  timestamp: new Date().toISOString(),
};

const updatedHistory = [
  historyItem,
  ...history,
].slice(0, 20);

localStorage.setItem(
  "more_history",
  JSON.stringify(updatedHistory)
);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <Sparkles size={16} />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              AI Recommendation
            </span>
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Find your <span className="text-blue-500">MO-RE.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
            Pick a movie you already love. Our recommendation model
            will find the five closest movies from our collection.
          </p>
        </motion.div>

        {/* Search area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
        >

          <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Choose a movie
          </label>

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              value={search || selectedMovie}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedMovie("");
              }}
              placeholder={
                loadingMovies
                  ? "Loading movies..."
                  : "Search for a movie..."
              }
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
            />

          </div>

          {/* Search results */}
          {search && !selectedMovie && filteredMovies.length > 0 && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">

              {filteredMovies.map((movie) => (
                <button
                  key={movie}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left text-sm text-zinc-300 transition last:border-0 hover:bg-white/[0.05] hover:text-white"
                >
                  <Film size={15} className="text-zinc-600" />
                  {movie}
                </button>
              ))}

            </div>
          )}

          {/* Selected movie */}
          {selectedMovie && (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                  Selected movie
                </p>

                <p className="mt-1 font-semibold">
                  {selectedMovie}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedMovie("");
                  setSearch("");
                }}
                className="text-xs text-zinc-500 hover:text-white"
              >
                Change
              </button>

            </div>
          )}

          {/* Recommend button */}
          <button
            onClick={getRecommendations}
            disabled={!selectedMovie || loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Finding your MO-RE...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Recommend My Movies
              </>
            )}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-400">
              {error}
            </p>
          )}

        </motion.div>

        {/* Results */}
        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >

            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                Because you liked
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {selectedMovie}
              </h2>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-zinc-600">
                YOUR TOP 5
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

              {recommendations.map((movie, index) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  rank={index + 1}
                />
              ))}

            </div>

          </motion.section>
        )}

      </div>
    </div>
  );
}
function MovieCard({ movie, rank }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">

        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-700">
            <Film size={42} />
            <span className="text-xs">No poster available</span>
          </div>
        )}

        {/* Ranking */}
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/75 text-sm font-black backdrop-blur-md">
          {rank}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
          <div className="p-4">
            <p className="text-xs text-zinc-300">
              Similarity
            </p>

            <p className="text-sm font-bold">
              {(movie.similarity_score * 100).toFixed(1)}%
            </p>
          </div>
        </div>

      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold">
          {movie.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-zinc-600">
            Match #{rank}
          </span>

          <Star
            size={13}
            className="text-zinc-600"
          />
        </div>
      </div>
    </motion.div>
  );
}



export default Recommend;