-- Add optional i18n JSON fields for bilingual content support
ALTER TABLE "Gallery"
ADD COLUMN "titleI18n" JSONB;

ALTER TABLE "TeamMember"
ADD COLUMN "nameI18n" JSONB,
ADD COLUMN "roleI18n" JSONB,
ADD COLUMN "descriptionI18n" JSONB;

ALTER TABLE "Partner"
ADD COLUMN "nameI18n" JSONB,
ADD COLUMN "descriptionI18n" JSONB;
