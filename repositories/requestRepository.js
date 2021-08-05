const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addRequest(personId) {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here

}