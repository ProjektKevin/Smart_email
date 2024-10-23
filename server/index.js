// INCLUDES
const app = require("./src/app");

// SETUP ENVIRONMENT
const PORT = 5500;

// START SERVER
app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
