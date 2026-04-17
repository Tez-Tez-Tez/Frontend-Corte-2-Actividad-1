import { usePlayerStore } from "../store/playerStore";
import { worldMap } from "../data/map";

type Direction = "norte" | "sur" | "este" | "oeste";

const directionLabels: Record<Direction, string> = {
  norte: "Norte ↑",
  sur: "Sur ↓",
  este: "Este →",
  oeste: "Oeste ←",
};

export default function Game() {
  const { playerName, currentLocationId, move } = usePlayerStore();
  const currentRoom = worldMap.find((room) => room.id === currentLocationId);

  if (!currentRoom) return null;

  const directions: Direction[] = ["norte", "sur", "este", "oeste"];

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto gap-8">
      <div className="text-center">
        <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
          Aventurero: <strong>{playerName}</strong>
        </p>
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--color-text-primary)" }}
        >
          {currentRoom.nombre}
        </h2>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {currentRoom.descripcion}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {directions.map((dir) => {
          const targetRoomId = currentRoom.direcciones[dir];
          const isDisabled = targetRoomId === null;

          return (
            <button
              key={dir}
              onClick={() => !isDisabled && move(dir)}
              disabled={isDisabled}
              className={`px-6 py-4 rounded-lg font-medium transition-all ${
                isDisabled 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:opacity-80"
              }`}
              style={{
                backgroundColor: isDisabled 
                  ? "var(--color-bg-secondary)" 
                  : "var(--color-accent)",
                color: isDisabled 
                  ? "var(--color-text-secondary)" 
                  : "var(--color-bg-primary)",
                border: `1px solid var(--color-border)`,
              }}
            >
              {directionLabels[dir]}
            </button>
          );
        })}
      </div>
    </div>
  );
}