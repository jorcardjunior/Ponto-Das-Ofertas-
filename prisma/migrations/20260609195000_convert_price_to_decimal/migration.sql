-- AlterTable: Convert Float to Decimal(10,2) for monetary values
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
ALTER TABLE "Sale" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
