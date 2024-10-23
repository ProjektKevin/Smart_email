// INCLUDES
const app = require("./src/app");

// SETUP ENVIRONMENT
const PORT = 8081;

// START SERVER
app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
