// keep-alive-final.mjs - SEM ERROS DE LINT
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

console.log('🟢 KEEP-ALIVE INICIADO')
console.log('📡 URL:', process.env.DATABASE_URL?.includes('pooler') ? '✅ COM POOLER' : '❌ SEM POOLER')
console.log('=' .repeat(50))

let prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
})

let falhas = 0

async function ping() {
  try {
    console.log(`🔄 Ping: ${new Date().toLocaleTimeString()}`)
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ OK\n')
    falhas = 0
  } catch (error) {
    falhas++
    // Aqui usamos a variável error (não "e") e ela é usada
    console.error(`❌ Erro #${falhas}:`, error.message)
    
    if (falhas >= 3) {
      console.log('🔄 Recriando cliente...')
      
      // Usando then/catch em vez de try/catch para evitar variável não usada
      prisma.$disconnect()
        .then(() => {
          console.log('✅ Desconectado, criando novo cliente...')
          prisma = new PrismaClient({
            datasources: { db: { url: process.env.DATABASE_URL } }
          })
          falhas = 0
          ping()
        })
        .catch(() => {
          console.log('⚠️ Erro ao desconectar, criando novo cliente mesmo assim...')
          prisma = new PrismaClient({
            datasources: { db: { url: process.env.DATABASE_URL } }
          })
          falhas = 0
          ping()
        })
    }
  }
}

ping()
setInterval(ping, 2 * 60 * 1000)

process.on('SIGINT', () => {
  console.log('\n🔴 Encerrando...')
  prisma.$disconnect().finally(() => process.exit(0))
})