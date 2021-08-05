const { create, update, listAll } = require("./../repositories/personRepository");

//e.g.: "/novo Lizandra mãe, entrevista de emprego, viagem"
const addRequests = (message) => {
    const person = convertMessageToUpdatePerson(message);
    const requests = convertMessageToRequests(message);
    const personWithRequests = {...person, requests};
    update(personWithRequests);
    return "success";
}

const listPersons = async () => {
    const persons = await listAll();
    return convertPersonsToMessage(persons);

}

const listHelp = (client) => {
    const HEADER = "*Bot dos Pedidos de Oração* 🙏🏻"
    const message = HEADER + `\n/pedidos - Lista os pedidos de todos\n
/add nomepessoa pedido1, pedido2, ... - adiciona pedidos para uma pessoa \n
/novos nomepessoa pedido1, pedido2...: pedido: adiciona pedidos para uma pessoa\n
/atendido pessoa num: risca um pedido\n
/delete pessoa num: remove um pedido da lista da pessoa.`
    return message;
}

const convertMessageToAddPerson = message => {
    const personName = message.split(" ")[1];
    const person = {name: personName};
    return person;
}

const convertMessageToUpdatePerson = message => {
    return convertMessageToAddPerson(message);
}

const convertMessageToRequests = message => {
    const requestsText = message.split(" ").filter((_, index) => index > 1).join(" ");
    const requests = requestsText.split(",").map(request => ({ description: request, status: "PENDING", date: new Date() }));
    return requests;
}

const convertPersonsToMessage = persons => {
    const personsString = persons.map(person => {
        let message = person.name + "\n";

        person.requests.forEach(request => {
            if(request.status !== "DELETED") {
                const PREFIX = request.status === "PENDING" ? "" : "~";
                message = message + PREFIX + "- " + request.description + PREFIX + "\n";
            }
        });
        message = message + "\n"
        return message;
    });
    return personsString.join("");
}

module.exports = {
    listPersons,
    listHelp,
    addRequests
}