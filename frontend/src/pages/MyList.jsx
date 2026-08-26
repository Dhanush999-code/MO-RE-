import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Trash2,
  Film,
  Sparkles,
} from "lucide-react";

function MyList({
  setActivePage,
  setSelectedMovieId,
}) {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(
      localStorage.getItem("more_my_list") || "[]"
    );

    setSavedMovies(storedMovies);
  }, []);

  const removeMovie = (movieId) => {
    const updatedMovies = savedMovies.filter(
      (movie) => movie.movie_id !== movieId
    );

    setSavedMovies(updatedMovies);

    localStorage.setItem(
      "more_my_list",
      JSON.stringify(updatedMovies)
    );
  };

  const openMovie = (movieId) => {
    setSelectedMovieId(movieId);
    setActivePage("MovieDetails");
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center gap-2 text-pink-400">
            <Heart size={16} fill="currentColor" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Your Collection
            </span>
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            My <span className="text-pink-400">List.</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-500">
            Movies you don't want to forget.
          </p>
        </motion.div>

        {/* Empty state */}
        {savedMovies.length === 0 && (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
              <Heart
                size={30}
                className="text-zinc-700"
              />
            </div>

            <h2 className="text-xl font-semibold">
              Your list is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">
              Discover movies you love and save them here
              so you can find them later.
            </p>

            <button
              onClick={() => setActivePage("Discover")}
              className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              <Sparkles size={16} />
              Discover Movies
            </button>

          </div>
        )}

        {/* Movie grid */}
        {savedMovies.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {savedMovies.map((movie, index) => (
              <motion.div
                key={movie.movie_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.05, 0.3),
                }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
              >

                {/* Poster */}
                <div
                  onClick={() => openMovie(movie.movie_id)}
                  className="relative aspect-[2/3] cursor-pointer overflow-hidden bg-zinc-900"
                >

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

                  {/* Remove */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovie(movie.movie_id);
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/70 text-zinc-300 backdrop-blur-md transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

                {/* Info */}
                <div className="p-4">

                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold">
                    {movie.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-600">
                    <Heart
                      size={12}
                      fill="currentColor"
                    />
                    Saved
                  </div>

                </div>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyList;