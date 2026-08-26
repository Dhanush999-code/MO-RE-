import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Film,
  Sparkles,
  X,
} from "lucide-react";

const API_URL = "https://mo-re-01or.onrender.com";

function Discover({setActivePage, setSelectedMovieId}) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch(`${API_URL}/api/discover`)
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.movies || []);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Discover error:", error);
      setLoading(false);
    });
}, []);

  const filteredMovies = useMemo(() => {
    if (!search.trim()) {
      return movies;
    }

   return movies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);
  }, [movies, search]);

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
              Explore
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Discover <span className="text-blue-500">MO-RE.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
                Explore our collection of movies and find something
                worth watching.
              </p>
            </div>

            <div className="text-sm text-zinc-600">
              {movies.length.toLocaleString()} movies
            </div>

          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mt-10">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the movie collection..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-4 pl-12 pr-12 text-sm outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
            >
              <X size={18} />
            </button>
          )}

        </div>

        {/* Results count */}
        {!loading && (
          <div className="mt-8 mb-5 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              {search
                ? `${filteredMovies.length} results`
                : "Movie Collection"}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />
          </div>
        )}

        {/* Movie grid */}
        {!loading && filteredMovies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {filteredMovies.map((movie, index) => (
  <MovieTile
    key={`${movie.movie_id}-${index}`}
    movie={movie}
    index={index}
    setActivePage={setActivePage}
    setSelectedMovieId={setSelectedMovieId}
  />
))}

          </div>
        )}

        {/* Empty */}
        {!loading && filteredMovies.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <Film size={25} className="text-zinc-600" />
            </div>

            <h2 className="text-lg font-semibold">
              No movies found
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Try searching for another movie.
            </p>

          </div>
        )}

        {/* Limit message */}
        {!search && movies.length > 100 && (
          <p className="mt-8 text-center text-xs text-zinc-700">
            Showing the first 100 movies. Search to find more.
          </p>
        )}

      </div>
    </div>
  );
}

function MovieTile({ movie, index,setActivePage,
  setSelectedMovieId }) {
  return (
    <motion.div
  onClick={() => {
    setSelectedMovieId(movie.movie_id);
    setActivePage("MovieDetails");
  }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: Math.min(index * 0.01, 0.3),
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">

        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film
              size={40}
              className="text-zinc-700"
            />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 pt-12">
          <p className="line-clamp-2 text-sm font-semibold leading-5 text-white">
            {movie.title}
          </p>
        </div>

      </div>
    </motion.div>
  );
}


export default Discover;