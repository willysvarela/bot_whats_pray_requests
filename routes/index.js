const { addPerson, listHelp } = require("./../service/index");

const addPersonRoute = "/novo";
const listRequestsRoute = "/pedidos";
const markRequestRoute = "/atendido";
const deleteRequestRoute = "/delete";
const helpRoute = "/help";

const NOT_FOUND = 404;
