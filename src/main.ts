import app from "./app";
import cluster from "cluster";
import os from "os";
import { PORT } from "./common/constants";

app.listen(PORT, () => {
  if (cluster.isPrimary) {
    console.log(`Swagger running on http://localhost:${PORT}/api`);
  }
});
