// Custom session type with tenantId support
// This avoids module augmentation issues with next-auth v4's re-export structure

export interface SessionWithTenant {
  user: {
    id: string;
    tenantId: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}
