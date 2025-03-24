CREATE TABLE "invite_table" (
	"link" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"houseHoldId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invite_table" ADD CONSTRAINT "invite_table_houseHoldId_houseHolds_id_fk" FOREIGN KEY ("houseHoldId") REFERENCES "public"."houseHolds"("id") ON DELETE cascade ON UPDATE no action;