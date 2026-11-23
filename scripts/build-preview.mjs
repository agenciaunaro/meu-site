// Gera uma versão estática (pasta out/) para apresentação e aprovação.
// As rotas de API não existem em export estático, então são movidas temporariamente.
import { execSync } from "node:child_process";
import { renameSync, existsSync } from "node:fs";
const api = "app/api", tmp = ".api-preview-tmp";
if (existsSync(api)) renameSync(api, tmp);
try {
  execSync("next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });
} finally {
  if (existsSync(tmp)) renameSync(tmp, api);
}
