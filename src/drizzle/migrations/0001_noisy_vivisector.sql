CREATE TABLE "currency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "houseHolds" ADD COLUMN "currencyId" uuid;--> statement-breakpoint
ALTER TABLE "houseHolds" ADD CONSTRAINT "houseHolds_currencyId_currency_id_fk" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;