
import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto"

const filePath = path.resolve("contacts.json");



async function readFile() {
    const data = await fs.readFile(filePath, { encoding: "utf-8" })
    return JSON.parse(data)
};


async function writeFile() {
    return fs.writeFile(filePath, JSON.stringify(contacts,undefined,2))
}

async function listContacts() {
    const contacts = await readFile();
    return contacts
}


async function getContactById(contactId) {
    const contacts = await readFile();
    const contact = contacts.find((item) => item.id === contactId)
    if (typeof contact === "undefined") {
        return null
    }
    return contact;
}

async function removeContact(contactId) {
  const contacts = await readFile();
    const index = contacts.findIndex((item) => item.id === contactId)
    if (index === -1) {
        return null
    }

    
    const removedContact= contacts[index]
    return removedContact
    
}

async function addContact(name, email, phone) {
    const contacts = await readFile();
    const newContact = { ...contacts, id: crypto.randomUUID(),name,email,phone }
    contacts.push(newContact)
    await writeFile(contacts)
}
export {
    listContacts,
    getContactById,
    removeContact,
    addContact
};