import db from "./config/db.js";
import app from "./index.js";

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

db();
