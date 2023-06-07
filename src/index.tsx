import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components/App";
import React from "react";

const rootElement = document.getElementById("root") as HTMLCanvasElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
