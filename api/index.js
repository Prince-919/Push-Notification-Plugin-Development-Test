const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const config = require("./config/config");
const {
  sendEveryMinuteNotification,
} = require("./controllers/firebase-controller");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/firebase", require("./routes/firebase-route"));

cron.schedule("* * * * *", async () => {
  console.log("Sending notification every minute...");
  await sendEveryMinuteNotification();
});

const serverStart = async () => {
  try {
    const port = config.get("port") || 8000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
