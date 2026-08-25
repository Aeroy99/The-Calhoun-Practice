// @ts-nocheck
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_audience" AS ENUM('adult', 'youth', 'both');
  CREATE TYPE "public"."enum_planner_notes_kind" AS ENUM('page', 'social', 'media', 'feature', 'other');
  CREATE TYPE "public"."enum_planner_notes_status" AS ENUM('new', 'reviewing', 'building', 'done');
  CREATE TYPE "public"."enum_site_settings_social_links_network" AS ENUM('instagram', 'facebook', 'tiktok');
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"audience" "enum_services_audience" DEFAULT 'both' NOT NULL,
  	"summary" varchar NOT NULL,
  	"details" varchar NOT NULL,
  	"image_id" integer,
  	"button_label" varchar DEFAULT 'Learn More',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "planner_notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"kind" "enum_planner_notes_kind" DEFAULT 'page' NOT NULL,
  	"details" varchar NOT NULL,
  	"status" "enum_planner_notes_status" DEFAULT 'new' NOT NULL,
  	"attachment_id" integer,
  	"engineer_reply" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"is_button" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" "enum_site_settings_social_links_network" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright_name" varchar DEFAULT 'The Calhoun Practice',
  	"newsletter_enabled" boolean DEFAULT true,
  	"newsletter_heading" varchar DEFAULT 'Join our newsletter',
  	"newsletter_description" varchar DEFAULT 'Receive insights, resources, and updates directly to your inbox.',
  	"newsletter_button_label" varchar DEFAULT 'Subscribe',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"intro" varchar NOT NULL,
  	"story" varchar NOT NULL,
  	"button_label" varchar DEFAULT 'Start a conversation',
  	"button_link" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "therapy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overview_heading" varchar NOT NULL,
  	"overview_intro" varchar NOT NULL,
  	"overview_adult_card_title" varchar DEFAULT 'Adult',
  	"overview_adult_card_text" varchar NOT NULL,
  	"overview_youth_card_title" varchar DEFAULT 'Kids / Young Adult',
  	"overview_youth_card_text" varchar NOT NULL,
  	"adult_heading" varchar NOT NULL,
  	"adult_intro" varchar NOT NULL,
  	"adult_body" varchar NOT NULL,
  	"adult_photo_id" integer,
  	"youth_heading" varchar NOT NULL,
  	"youth_intro" varchar NOT NULL,
  	"youth_body" varchar NOT NULL,
  	"youth_photo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "fees_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "fees_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Fees & FAQ' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Privacy Policy' NOT NULL,
  	"last_updated" varchar,
  	"intro" varchar NOT NULL,
  	"footer_note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "planner_notes_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "services_heading" varchar DEFAULT 'How we help:';
  ALTER TABLE "home_page" ADD COLUMN "services_button_label" varchar DEFAULT 'Request a Consultation';
  ALTER TABLE "home_page" ADD COLUMN "therapist_heading" varchar DEFAULT 'Meet your therapist';
  ALTER TABLE "home_page" ADD COLUMN "practice_manager_heading" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "practice_manager_badge" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "practice_manager_description" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "practice_manager_button_label" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "location_heading" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "location_button_label" varchar NOT NULL;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "planner_notes" ADD CONSTRAINT "planner_notes_attachment_id_media_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_nav_items_children" ADD CONSTRAINT "site_settings_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_items" ADD CONSTRAINT "site_settings_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "therapy_page" ADD CONSTRAINT "therapy_page_adult_photo_id_media_id_fk" FOREIGN KEY ("adult_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "therapy_page" ADD CONSTRAINT "therapy_page_youth_photo_id_media_id_fk" FOREIGN KEY ("youth_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fees_page_sections" ADD CONSTRAINT "fees_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fees_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_sections" ADD CONSTRAINT "privacy_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "planner_notes_attachment_idx" ON "planner_notes" USING btree ("attachment_id");
  CREATE INDEX "planner_notes_updated_at_idx" ON "planner_notes" USING btree ("updated_at");
  CREATE INDEX "planner_notes_created_at_idx" ON "planner_notes" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_items_children_order_idx" ON "site_settings_nav_items_children" USING btree ("_order");
  CREATE INDEX "site_settings_nav_items_children_parent_id_idx" ON "site_settings_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_items_order_idx" ON "site_settings_nav_items" USING btree ("_order");
  CREATE INDEX "site_settings_nav_items_parent_id_idx" ON "site_settings_nav_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "about_page_photo_idx" ON "about_page" USING btree ("photo_id");
  CREATE INDEX "therapy_page_adult_adult_photo_idx" ON "therapy_page" USING btree ("adult_photo_id");
  CREATE INDEX "therapy_page_youth_youth_photo_idx" ON "therapy_page" USING btree ("youth_photo_id");
  CREATE INDEX "fees_page_sections_order_idx" ON "fees_page_sections" USING btree ("_order");
  CREATE INDEX "fees_page_sections_parent_id_idx" ON "fees_page_sections" USING btree ("_parent_id");
  CREATE INDEX "privacy_page_sections_order_idx" ON "privacy_page_sections" USING btree ("_order");
  CREATE INDEX "privacy_page_sections_parent_id_idx" ON "privacy_page_sections" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_planner_notes_fk" FOREIGN KEY ("planner_notes_id") REFERENCES "public"."planner_notes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_planner_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("planner_notes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "planner_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_nav_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "therapy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fees_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fees_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services" CASCADE;
  DROP TABLE "planner_notes" CASCADE;
  DROP TABLE "site_settings_nav_items_children" CASCADE;
  DROP TABLE "site_settings_nav_items" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "therapy_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "fees_page_sections" CASCADE;
  DROP TABLE "fees_page" CASCADE;
  DROP TABLE "privacy_page_sections" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_planner_notes_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_planner_notes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "planner_notes_id";
  ALTER TABLE "home_page" DROP COLUMN "services_heading";
  ALTER TABLE "home_page" DROP COLUMN "services_button_label";
  ALTER TABLE "home_page" DROP COLUMN "therapist_heading";
  ALTER TABLE "home_page" DROP COLUMN "practice_manager_heading";
  ALTER TABLE "home_page" DROP COLUMN "practice_manager_badge";
  ALTER TABLE "home_page" DROP COLUMN "practice_manager_description";
  ALTER TABLE "home_page" DROP COLUMN "practice_manager_button_label";
  ALTER TABLE "home_page" DROP COLUMN "location_heading";
  ALTER TABLE "home_page" DROP COLUMN "location_button_label";
  DROP TYPE "public"."enum_services_audience";
  DROP TYPE "public"."enum_planner_notes_kind";
  DROP TYPE "public"."enum_planner_notes_status";
  DROP TYPE "public"."enum_site_settings_social_links_network";`)
}
