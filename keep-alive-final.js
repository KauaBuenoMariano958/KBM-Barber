// keep-alive-final.js - Versão ES Modules CORRIGIDA
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

console.log('🦸 KEEP-ALIVE ESM ATIVADO');
console.log('📡 URL:', process.env.DATABASE_URL?.includes('pooler') ? '✅ COM POOLER' : '❌ SEM POOLER');
console.log('⏱️  Timeout: 45 segundos');
console.log('=' .repeat(50));

let prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
});

let falhas = 0;
let reconectando = false;

async function pingComTimeout() {
  return new Promise((resolve, reject) => {
    // Timeout de 45 segundos usando setTimeout nativo
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout após 45 segundos'));
    }, 45000);

    prisma.$queryRaw`SELECT 1`
      .then((resultado) => {
        clearTimeout(timeoutId);
        resolve(resultado);
      })
      .catch((erro) => {
        clearTimeout(timeoutId);
        reject(erro);
      });
  });
}

async function ping() {
  if (reconectando) {
    console.log('⏳ Já reconectando, aguardando...');
    return;
  }

  try {
    console.log(`\n🔄 Ping #${falhas + 1}: ${new Date().toLocaleTimeString()}`);
    console.log('⏰ Aguardando até 45 segundos...');
    
    const resultado = await pingComTimeout();
    console.log('✅ Banco RESPONDEU!', resultado);
    falhas = 0;
    reconectando = false;
  } catch (erro) {
    falhas++;
    console.error(`❌ Falha #${falhas}:`, erro.message);
    
    if (falhas >= 2 && !reconectando) {
      reconectando = true;
      console.log('🔄 Múltiplas falhas. Recriando conexão em 5 segundos...');
      
      setTimeout(async () => {
        try {
          await prisma.$disconnect().catch(() => {});
          console.log('🔄 Criando novo cliente Prisma...');
          prisma = new PrismaClient({
            datasources: { db: { url: process.env.DATABASE_URL } }
          });
          console.log('✅ Novo cliente criado!');
          falhas = 0;
          reconectando = false;
          await ping(); // Tenta imediatamente
        } catch (erroRec) {
          console.error('❌ Erro na reconexão:', erroRec.message);
          reconectando = false;
        }
      }, 5000);
    }
  }
}

// Ping imediato
ping();

// Ping a cada 2 minutos
setInterval(ping, 2 * 60 * 1000);

process.on('SIGINT', () => {
  console.log('\n🔴 Encerrando keep-alive...');
  prisma.$disconnect().finally(() => process.exit(0));
});