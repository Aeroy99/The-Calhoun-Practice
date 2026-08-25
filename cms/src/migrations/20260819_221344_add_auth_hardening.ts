// @ts-nocheck
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "passkeys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar DEFAULT 'Passkey',
  	"credential_id" varchar NOT NULL,
  	"public_key" varchar NOT NULL,
  	"counter" numeric DEFAULT 0 NOT NULL,
  	"device_type" varchar,
  	"backed_up" boolean DEFAULT false,
  	"transports" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "auth_challenges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"challenge_key" varchar NOT NULL,
  	"challenge" varchar NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'editor' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "totp_secret" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "passkeys_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "auth_challenges_id" integer;
  ALTER TABLE "passkeys" ADD CONSTRAINT "passkeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "passkeys_user_idx" ON "passkeys" USING btree ("user_id");
  CREATE UNIQUE INDEX "passkeys_credential_id_idx" ON "passkeys" USING btree ("credential_id");
  CREATE INDEX "passkeys_updated_at_idx" ON "passkeys" USING btree ("updated_at");
  CREATE INDEX "passkeys_created_at_idx" ON "passkeys" USING btree ("created_at");
  CREATE UNIQUE INDEX "auth_challenges_challenge_key_idx" ON "auth_challenges" USING btree ("challenge_key");
  CREATE INDEX "auth_challenges_updated_at_idx" ON "auth_challenges" USING btree ("updated_at");
  CREATE INDEX "auth_challenges_created_at_idx" ON "auth_challenges" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_passkeys_fk" FOREIGN KEY ("passkeys_id") REFERENCES "public"."passkeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_auth_challenges_fk" FOREIGN KEY ("auth_challenges_id") REFERENCES "public"."auth_challenges"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_passkeys_id_idx" ON "payload_locked_documents_rels" USING btree ("passkeys_id");
  CREATE INDEX "payload_locked_documents_rels_auth_challenges_id_idx" ON "payload_locked_documents_rels" USING btree ("auth_challenges_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "passkeys" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "auth_challenges" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "passkeys" CASCADE;
  DROP TABLE "auth_challenges" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_passkeys_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_auth_challenges_fk";
  
  DROP INDEX "payload_locked_documents_rels_passkeys_id_idx";
  DROP INDEX "payload_locked_documents_rels_auth_challenges_id_idx";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "totp_secret";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "passkeys_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "auth_challenges_id";
  DROP TYPE "public"."enum_users_role";`)
}
