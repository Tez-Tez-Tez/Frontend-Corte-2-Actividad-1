import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("game", "routes/game.tsx"),
    route("map", "routes/map.tsx"),
  ]),
] satisfies RouteConfig;