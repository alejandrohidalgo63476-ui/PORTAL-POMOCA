import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Log del puerto detectado por Railway
  console.log(`Port detected from env: ${process.env.PORT}`);
  
  const isProd = process.env.NODE_ENV === "production";
  console.log(`Starting server in ${isProd ? "PRODUCTION" : "DEVELOPMENT"} mode...`);

  if (isProd) {
    const distPath = path.resolve(process.cwd(), "dist");
    const publicPath = path.resolve(process.cwd(), "public");
    
    console.log(`Checking paths: dist=${distPath}, public=${publicPath}`);
    
    // Servir archivos estáticos del build (Vite)
    app.use(express.static(distPath, {
      index: false, // Don't serve index.html via static, handle it in wildcard
      fallthrough: true
    }));

    // Servir carpeta public (donde están logo.png, fondo.png originales)
    app.use(express.static(publicPath, {
      fallthrough: true
    }));

    // Monitor de 404 para assets (opcional para debugging)
    app.use((req, res, next) => {
      if (req.path.includes('.') && !res.headersSent) {
        console.warn(`Static asset not found: ${req.path}`);
      }
      next();
    });

    // SPA Fallback - Siempre al final
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    // En desarrollo, usamos el middleware de Vite
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
