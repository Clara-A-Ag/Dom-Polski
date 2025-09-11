import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Ejemplo: leer usuarios de la tabla Usuario
  const usuarios = await prisma.usuario.findMany()
  console.log(usuarios)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
