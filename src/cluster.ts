import os from "os";
import cluster from "cluster";
import { PORT } from "./common/constants";

const runPrimaryProcess = () => {
  console.log(`Swagger running on http://localhost:${PORT}/api`);
  console.log(`Primary ${process.pid} is running`);

  const numCPUs = os.cpus().length;
  console.log(`Number of CPUs is ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
};

const runWorkerProcess = () => {
  require("./main");
  console.log(`Worker ${process.pid} started`);
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
