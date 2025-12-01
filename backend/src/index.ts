import app from './app.js'
import { config } from './config/env.js'
import { prisma } from './config/database.js'

async function main() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Start server
    app.listen(config.port, config.host, () => {
      console.log(`🚀 Server running at http://${config.host}:${config.port}`)
      console.log(`📚 API available at http://${config.host}:${config.port}/api/v1`)
      console.log(`❤️  Health check at http://${config.host}:${config.port}/health`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

main()
