import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { usePlayerStore } from "../store/playerStore";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { playerName } = usePlayerStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  if (!playerName && (location.pathname === "/game" || location.pathname === "/map")) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex gap-6">
          <Link to="/" className="hover:opacity-80 transition-opacity" style={{ color: "var(--color-text-primary)" }}>
            Inicio
          </Link>
          <Link to="/game" className="hover:opacity-80 transition-opacity" style={{ color: "var(--color-text-primary)" }}>
            Explorar
          </Link>
          <Link to="/map" className="hover:opacity-80 transition-opacity" style={{ color: "var(--color-text-primary)" }}>
            Mapa
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-colors hover:opacity-80"
          style={{ 
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-text-primary)"
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}