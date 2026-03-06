// teste-prisma.js - Versão para Prisma 5.22.0
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

console.log('🔵 Testando conexão Prisma 5.22.0...')
console.log('📡 URL:', process.env.DATABASE_URL?.includes('pooler') ? '✅ COM POOLER' : '❌ SEM POOLER')

// Configuração válida para Prisma 5.22.0
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Apenas opções válidas para esta versão
  log: ['error', 'warn'],
  errorFormat: 'pretty'
})

// Timeout manual via Promise.race
async function queryWithTimeout() {
  return Promise.race([
    prisma.$queryRaw`SELECT 1 as test`,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout de 30 segundos')), 30000)
    )
  ])
}

async function testar() {
  try {
    console.log('⏳ Executando query com timeout de 30s...')
    const result = await queryWithTimeout()
    console.log('✅ CONECTOU!', result)
  } catch (error) {
    console.log('❌ FALHOU:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testar()