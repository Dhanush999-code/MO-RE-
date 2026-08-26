import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Discover from "./pages/Discover";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("more_logged_in") === "true"
);

const [showRegister, setShowRegister] = useState(false);
if (!isLoggedIn) {
  if (showRegister) {
    return (
      <Register
        onRegister={() => {
          setIsLoggedIn(true);
          setActivePage("Home");
        }}
        onShowLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <Login
      onLogin={() => {
        setIsLoggedIn(true);
        setActivePage("Home");
      }}
      onShowRegister={() => setShowRegister(true)}
    />
  );
}
  return (
    <div className="min-h-screen bg-[#050505]">

      <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
  onLogout={() => {
    localStorage.removeItem("more_logged_in");
    setIsLoggedIn(false);
    setShowRegister(false);
  }}
/>

      <main className="ml-[250px] min-h-screen">
        {activePage === "Home" && (
          <Home setActivePage={setActivePage} />
        )}

       {activePage === "Recommend" && <Recommend />}

        {activePage === "Discover" && (
  <Discover
    setActivePage={setActivePage}
    setSelectedMovieId={setSelectedMovieId}
  />
)}
        {activePage === "My List" && (
  <MyList
    setActivePage={setActivePage}
    setSelectedMovieId={setSelectedMovieId}
  />
)}

       {activePage === "History" && (
  <History
    setActivePage={setActivePage}
    setSelectedMovieId={setSelectedMovieId}
  />
)} 
       {activePage === "MovieDetails" && (
  <MovieDetails
    movieId={selectedMovieId}
    setActivePage={setActivePage}
  />
)}
        {activePage === "Profile" && (
  <Profile
    setActivePage={setActivePage}
  />
)}
         
        {activePage === "Settings" && (
  <Settings />
)}
      </main>

    </div>
  );
}

export default App;