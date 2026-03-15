const express = require("express");
const app = express();
const tasksRoutes = require("./routes/tasks");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(express.json());

app.use("/tasks", tasksRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});