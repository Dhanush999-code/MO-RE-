import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Film,
  Sparkles,
  Trash2,
  ArrowRight,
} from "lucide-react";

function History({
  setActivePage,
  setSelectedMovieId,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("more_history") || "[]"
    );

    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("more_history");
    setHistory([]);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <Clock3 size={16} />

            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Your Journey
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Your <span className="text-blue-500">History.</span>
              </h1>

              <p className="mt-4 text-sm text-zinc-500">
                Every movie that started a recommendation journey.
              </p>
            </div>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
              >
                <Trash2 size={14} />
                Clear History
              </button>
            )}

          </div>
        </motion.div>

        {/* Empty */}
        {history.length === 0 && (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
              <Clock3
                size={30}
                className="text-zinc-700"
              />
            </div>

            <h2 className="text-xl font-semibold">
              No history yet
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">
              Start exploring movies and your recommendation
              searches will appear here.
            </p>

            <button
              onClick={() => setActivePage("Recommend")}
              className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              <Sparkles size={16} />
              Get Recommendations
            </button>

          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10 space-y-4">

            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.04, 0.3),
                }}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/20"
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  {/* Main */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Film size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                        Recommended from
                      </p>

                      <h2 className="mt-1 text-lg font-bold">
                        {item.movie}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                        <span>
                          {formatDate(item.timestamp)}
                        </span>

                        <span>•</span>

                        <span>
                          {formatTime(item.timestamp)}
                        </span>

                        <span>•</span>

                        <span>
                          {item.recommendationCount} recommendations
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Recommendations preview */}
                  <div className="flex items-center gap-2">

                    {item.recommendations
                      ?.slice(0, 3)
                      .map((movie) => (
                        <div
                          key={movie.movie_id}
                          onClick={() =>
                            openMovie(movie.movie_id)
                          }
                          className="group/poster relative h-16 w-11 cursor-pointer overflow-hidden rounded-lg bg-zinc-900"
                        >
                          {movie.poster_url ? (
                            <img
                              src={movie.poster_url}
                              alt={movie.title}
                              className="h-full w-full object-cover transition group-hover/poster:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Film size={15} />
                            </div>
                          )}
                        </div>
                      ))}

                    <div className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition group-hover:text-white">
                      <ArrowRight size={15} />
                    </div>

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

export default History;