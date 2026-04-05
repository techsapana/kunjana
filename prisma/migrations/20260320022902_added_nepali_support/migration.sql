-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "contentI18n" JSONB,
ADD COLUMN     "descriptionI18n" JSONB,
ADD COLUMN     "titleI18n" JSONB;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "contentI18n" JSONB,
ADD COLUMN     "descriptionI18n" JSONB,
ADD COLUMN     "featuresI18n" JSONB,
ADD COLUMN     "nameI18n" JSONB;
