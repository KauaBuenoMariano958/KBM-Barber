// test-booking.js
;(async () => {
  const { PrismaClient } = await import('@prisma/client')

  const prisma = new PrismaClient()

  async function testCreateBooking() {
  try {
    const booking = await prisma.booking.create({
      data: {
        userId: "cmlv2ag4f0000esstxycw9xfw",
        serviceId: "396f42dd-cb49-4e84-ab45-cae0cdcad4db",
        barbershopId: "24a3f372-9dc8-4fc6-8311-49da48b6d050",
        date: new Date(),
      },
    })
    console.log("✅ Booking criado:", booking)
  } catch (error) {
    console.error("❌ Erro:", error)
  } finally {
    await prisma.$disconnect()
  }
  }

  await testCreateBooking()
})().catch((err) => {
  console.error(err)
  process.exit(1)
})