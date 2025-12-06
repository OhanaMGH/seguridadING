export default function handler(req, res) {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "interacciones.json");

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]);
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.status(200).json(data);
}
