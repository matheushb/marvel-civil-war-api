import app from "./app";
import { PORT } from "./common/constants";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});
