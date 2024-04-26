import {
    listContacts,
    getContactById,
    removeContact,
    addContact
} from "./contacts.js";
import { program } from "commander";


// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
    case "list":
    const list = await listContacts()
        return list

    case "get":
    const user = await getContactById(id)
        return user

    case "add":
    const newContact= await addContact(name, email, phone)
        return newContact
    case "remove":
    const removedContacts = await removeContact(id) 
        return removedContacts

    default:
      console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option("-a, --action <action>", "choose action")
    .option("-i, --id <id>", "user id")
    .option("-n, --name <name>", "user name")
    .option("-e, --email <email>", "user email")
    .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

invokeAction(program.opts()).then(console.log).catch(console.error);
// const { error } = require("console")




