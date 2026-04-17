import { usePlayerStore } from "../store/playerStore";
import { worldMap } from "../data/map";

export default function Map() {
  const { currentLocationId } = usePlayerStore();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "var(--color-text-primary)" }}
      >
        Mapa del Mundo
      </h1>

      <div className="grid gap-4">
        {worldMap.map((room) => {
          const isCurrent = room.id === currentLocationId;

          return (
            <div
              key={room.id}
              className="p-4 rounded-lg border transition-all"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderColor: isCurrent ? "var(--color-accent)" : "var(--color-border)",
                borderWidth: isCurrent ? "2px" : "1px",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 
                  className="font-bold text-lg"
                  style={{ 
                    color: isCurrent 
                      ? "var(--color-accent)" 
                      : "var(--color-text-primary)" 
                  }}
                >
                  {room.nombre}
                </h3>
                {isCurrent && (
                  <span 
                    className="px-2 py-1 rounded text-sm font-medium"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-bg-primary)",
                    }}
                  >
                    🚩 ESTÁS AQUÍ
                  </span>
                )}
              </div>
              <p 
                className="mt-2 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {room.descripcion}
              </p>
              <div className="mt-3 flex gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <span>Salidas:</span>
                {Object.entries(room.direcciones)
                  .filter(([, target]) => target !== null)
                  .map(([dir, target]) => (
                    <span key={dir} className="capitalize">
                      {dir}: {worldMap.find(r => r.id === target)?.nombre}
                    </span>
                  ))
                  .reduce((acc, curr, i, arr) => 
                    i < arr.length - 1 ? [...acc, curr, ", "] : [...acc, curr]
                  , [] as React.ReactNode[])
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}