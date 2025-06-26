const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Database configuration
const databaseConfig = {
  // Development environment
  development: {
    url: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  },

  // Production environment
  production: {
    url: process.env.DATABASE_URL,
    pool: {
      min: 5,
      max: 20
    }
  },

  // Test environment
  test: {
    url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 5
    }
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';
const config = databaseConfig[environment];

// Create Prisma client instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.url
    }
  },
  log: environment === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
});

// Database connection test
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    console.log(`🌍 Environment: ${environment}`);
    console.log(`🔗 Database URL: ${config.url.replace(/\/\/.*@/, '//***:***@')}`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
async function disconnect() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
}

// Health check
async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
  }
}

// Get database statistics
async function getStats() {
  try {
    const userCount = await prisma.user.count();
    const conversationCount = await prisma.conversation.count();
    const messageCount = await prisma.message.count();
    const reviewCount = await prisma.review.count();

    return {
      users: userCount,
      conversations: conversationCount,
      messages: messageCount,
      reviews: reviewCount,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}

module.exports = {
  prisma,
  config,
  testConnection,
  disconnect,
  healthCheck,
  getStats,
  environment
};
