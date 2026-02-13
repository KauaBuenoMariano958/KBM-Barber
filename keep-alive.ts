// keep-alive.ts
import { PrismaClient } from '@prisma/client'

// Tipagem correta para o global
const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

// Cria a instância do PrismaClient
const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Salva no global em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

async function keepAlive() {
  try {
    console.log('🔄 Ping no banco...', new Date().toLocaleTimeString())
    
    // Query simples para manter ativo
    const result = await prisma.$queryRaw<[{ alive: number }]>`SELECT 1 as alive`
    
    console.log('✅ Banco ativo!', result[0].alive === 1 ? 'OK' : 'ERRO')
  } catch (error) {
    // Type guard para erro
    if (error instanceof Error) {
      console.error('❌ Erro:', error.message)
      
      if (error.message.includes("Can't reach database")) {
        console.log('⏳ Banco inativo, tentando novamente...')
      }
    } else {
      console.error('❌ Erro desconhecido:', error)
    }
  }
}

// Configuração
const INTERVALO = 4 * 60 * 1000 // 4 minutos

console.log('🟢 Serviço Keep-Alive Iniciado!')
console.log(`⏰ Ping a cada ${INTERVALO/60000} minutos`)
console.log('Pressione Ctrl+C para parar\n')

// Primeira execução imediata
keepAlive()

// Execução periódica
const timer = setInterval(keepAlive, INTERVALO)

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🔴 Encerrando Keep-Alive...')
  clearInterval(timer)
  prisma.$disconnect()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
})