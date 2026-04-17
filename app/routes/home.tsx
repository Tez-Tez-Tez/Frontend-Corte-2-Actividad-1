import { useState } from "react";
import { useNavigate } from "react-router";
import { usePlayerStore } from "../store/playerStore";

export default function Home() {
  const [name, setName] = useState("");
  const { setPlayerName } = usePlayerStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name.trim());
      navigate("/game");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
          Aventura en la Cueva
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Explora las profundidades de un mundo olvidado
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="playerName" 
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Tu nombre
          </label>
          <input
            id="playerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre..."
            className="px-4 py-3 rounded-lg border transition-colors"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg-primary)",
          }}
        >
          Comenzar Aventura
        </button>
      </form>
    </div>
  );
}