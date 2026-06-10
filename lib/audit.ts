import { prisma } from './db';

type AuditAction = 'create' | 'update' | 'delete';
type AuditEntity = 'product' | 'category' | 'supplier' | 'sale' | 'stock_movement';

export async function createAuditLog(
  action: AuditAction,
  entity: AuditEntity,
  entityId: string | null,
  userId: string,
  details?: string,
  tenantId?: string,
) {
  if (!userId) return;

  try {
    await prisma.auditLog.create({
      data: { action, entity, entityId, details, userId, tenantId: tenantId ?? 'default' },
    });
  } catch (e) {
    console.error('Audit log failed:', e);
  }
}
