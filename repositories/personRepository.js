const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listAll() {
    await prisma.$connect()
    return await prisma.person.findMany({
        include: {
            requests: {
                select: {
                    id: true,
                    description: true,
                    status: true
                }
            }
        }
    });
}

async function update(person) {
    await prisma.$connect();
    const requestsData = person.requests.map(request => {
       return {
            description: request.description,
            status: request.status,
            date: request.date,
            person: {
                connectOrCreate: {
                    where: {
                        name: person.name
                    },
                    create: {
                        name: person.name
                    }
                }
            }
        }
    });
    requestsData.map(async request => {
        await prisma.request.create({
            data: request
        });
    });
    return;
}

module.exports = {
    listAll,
    update
}