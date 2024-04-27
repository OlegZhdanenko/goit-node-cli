
import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const filePath = path.resolve("contacts.json");



async function readFile() {
    const data = await fs.readFile(filePath, { encoding: "utf-8" })
    return JSON.parse(data)
};


async function writeFile(contact) {
    return fs.writeFile(filePath, JSON.stringify(contact,undefined,2))
};

async function listContacts() {
    const contacts = await readFile();
    return console.table(contacts)
};


async function getContactById(contactId) {
    const contacts = await readFile();
    const contact = contacts.find((item) => item.id === contactId)
    if (typeof contact === "undefined") {
        return  console.log(null)
    }
    return console.log(contact);;
};

async function removeContact(contactId) {
    const contacts = await readFile();
    const index = contacts.findIndex((item) => item.id === contactId)
    if (index === -1) {
        return console.log(null);
    }
    
    const deletedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return console.log(deletedContact) ;
};


async function addContact(name, email, phone) {
    const contacts = await readFile();
    const newContact = { id: crypto.randomUUID(),name,email,phone }
    contacts.push(newContact)
    console.log(newContact);
    await writeFile(contacts)
};



export {
    listContacts,
    getContactById,
    removeContact,
    addContact
};