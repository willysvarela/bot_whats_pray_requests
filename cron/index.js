const cron = require("node-cron");

const createCronListRequests = (client, chatId) => {
    cron.schedule("* * * * *", () => {
        client
        .sendText(chatId, "Testando cronjob no chat")
        .then((result) => {
            console.log("Result: ", result.status); //return object success
        })
        .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
        });
    });
    console.log("created createCronListRequests cronjob");
};

module.exports = {
    createCronListRequests
}