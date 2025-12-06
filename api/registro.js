export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { timestamp, userAgent } = req.body;

  // Información básica que Vercel ya incluye en headers
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Aquí puedes usar una base real; por ahora lo guardamos en un archivo JSON (Vercel lo permite para pruebas)
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "interacciones.json");

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.push({
    timestamp,
    userAgent,
    ip,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return res.status(200).json({ ok: true });
}
