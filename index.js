// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");
const { createCronListRequests } = require("./cron");
const { addPerson, addRequests, listPersons, listHelp } = require("./service/index");

//const GROUP_ID = '559281365822-1598813263@g.us'; //Grupo GO-Efésios
const GROUP_ID = process.env.GROUP_ID; //Grupo Read Later

const addPersonRoute = "/add";
const addRequestsRoute = "/novo";
const listRequestsRoute = "/pedidos";
const markRequestRoute = "/atendido";
const deleteRequestRoute = "/delete";
const helpRoute = "/help";

venom
  .create()
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });

async function start(client) {

    //startCronJobs(client);
    //returnMessage(client, await listPersons());
    console.log(client);

    client.onMessage(async (message) => {
        const groupName = client;

        if (message[0] === "/") {
            const command = getCommand(message);

            if (command === listRequestsRoute) {
                returnMessage(client, await listPersons());
            }

            if (command === addRequestsRoute) {
                returnMessage(client, addRequests(message));
            }

            if (command === helpRoute) {
                returnMessage(client, listHelp());
            }

            returnMessage(client, "Comando não encontrado. Digite /help para ver a lista de comandos");
        }
  });
}

const returnMessage = (client, message) => {
    client
    .sendText(GROUP_ID, message)
    .then((result) => {
        console.log("Result: ", result.status); //return object success
    })
    .catch((erro) => {
        console.error("Error when sending: ", erro); //return object error
    });
}

const getCommand = message => {
    const command = message.split(" ")[0];
}

const startCronJobs = client => {
    createCronListRequests(client, GROUP_ID);
}

//Todos os dias, às 18h, mandar msg no grupo

/* 
Comandos:
    /pedidos: Listar pedidos salvos
    /add {pessoa}: adiciona pedido para uma pessoa
    /novos {pessoa} {pedido1}, {pedido2}...: pedido: adiciona pedidos para uma pessoa
    /atendido {pessoa} {num}: risca um pedido
    /delete {pessoa} {num}: remove um pedido da lista da pessoa.
*/
