const Database = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const sqlitePath = path.join(__dirname, '..', 'prisma', 'dev.db');

if (!fs.existsSync(sqlitePath)) {
  console.log('No SQLite database found at', sqlitePath, '— skipping migration.');
  process.exit(0);
}

async function migrate() {
  const sqlite = new Database(sqlitePath);
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });

  try {
    // --- Users ---
    const users = sqlite.prepare('SELECT * FROM User').all();
    console.log(`Migrating ${users.length} users...`);
    for (const u of users) {
      await prisma.user.upsert({
        where: { id: u.id },
        update: { email: u.email, name: u.name, passwordHash: u.passwordHash || null },
        create: {
          id: u.id,
          email: u.email,
          name: u.name,
          passwordHash: u.passwordHash || null,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
        },
      });
    }

    // --- Categories ---
    const categories = sqlite.prepare('SELECT * FROM Category').all();
    console.log(`Migrating ${categories.length} categories...`);
    for (const c of categories) {
      await prisma.category.upsert({
        where: { id: c.id },
        update: { name: c.name, color: c.color, userId: c.userId },
        create: {
          id: c.id,
          name: c.name,
          color: c.color || '#94a3b8',
          userId: c.userId,
        },
      });
    }

    // --- Suppliers ---
    const suppliers = sqlite.prepare('SELECT * FROM Supplier').all();
    console.log(`Migrating ${suppliers.length} suppliers...`);
    for (const s of suppliers) {
      await prisma.supplier.upsert({
        where: { id: s.id },
        update: { name: s.name, contact: s.contact, phone: s.phone, email: s.email, userId: s.userId },
        create: {
          id: s.id,
          name: s.name,
          contact: s.contact,
          phone: s.phone,
          email: s.email,
          userId: s.userId,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
        },
      });
    }

    // --- Products ---
    const products = sqlite.prepare('SELECT * FROM Product').all();
    console.log(`Migrating ${products.length} products...`);
    for (const p of products) {
      await prisma.product.create({
        data: {
          id: p.id,
          name: p.name,
          sku: p.sku,
          category: p.category,
          marketplace: p.marketplace,
          price: p.price,
          stock: p.stock,
          userId: p.userId,
          supplierId: p.supplierId || null,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        },
      });
    }

    // --- AuditLogs ---
    const logs = sqlite.prepare('SELECT * FROM AuditLog').all();
    console.log(`Migrating ${logs.length} audit logs...`);
    for (const l of logs) {
      await prisma.auditLog.create({
        data: {
          id: l.id,
          action: l.action,
          entity: l.entity,
          entityId: l.entityId || null,
          details: l.details || null,
          userId: l.userId,
          createdAt: new Date(l.createdAt),
        },
      });
    }

    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    sqlite.close();
    await prisma.$disconnect();
  }
}

migrate();
