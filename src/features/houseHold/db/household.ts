import { db } from "@/drizzle";
import {
  CategoriesOfExpanse,
  CategoryTable,
  HouseholdTable,
  InviteTable,
  MembersTable,
  TransactionTable,
} from "@/drizzle/schema";
import { createUuid, generateRandomColor } from "@/global/functions";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { validate as validateUuid } from "uuid";
import { HouseholdSchema } from "../schema/household";
import { canMakeChangesToHousehold } from "../permissions/household";
import { getTranslations } from "next-intl/server";

export async function insertHousehold(
  data: typeof HouseholdTable.$inferInsert,
  balance: number
) {
  const session = await auth();

  if (!session) throw new Error("failed while createing Household");

  const [newHousehold] = await db
    .insert(HouseholdTable)
    .values(data)
    .returning();

  if (newHousehold == null) throw new Error("failed to create household");

  const randomColor = generateRandomColor();

  const [newMember] = await db
    .insert(MembersTable)
    .values({
      name: session.user.name!,
      householdId: newHousehold.id,
      userId: newHousehold.ownerId,
      color: randomColor,
    })
    .returning();

  if (newMember == null) throw new Error("Failed to create member for owner");

  const linkId = createUuid();

  const [newInviteLink] = await db
    .insert(InviteTable)
    .values({
      householdId: newHousehold.id,
      link: linkId,
    })
    .returning();

  if (newInviteLink == null) throw new Error("Failed to create invite");

  const t = await getTranslations("DefaultCategories");

  const defaultCategories: {
    name: string;
    icon: string;
    categoryType: CategoriesOfExpanse;
    householdId: string;
  }[] = [
    {
      name: t("mortgage"),
      icon: "1_mortgage",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("transportation"),
      icon: "2_transportation",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("phone"),
      icon: "3_phone",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("insurence"),
      icon: "4_insurence",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("groceries"),
      icon: "5_groceries",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("healthcare"),
      icon: "6_healthcare",
      categoryType: "fixed",
      householdId: newHousehold.id,
    },
    {
      name: t("clothing"),
      icon: "7_clothing",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("eatingOut"),
      icon: "8_eatingOut",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("gym"),
      icon: "9_gym",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("gifts"),
      icon: "10_gifts",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("subscriptions"),
      icon: "11_subscriptions",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("coffee"),
      icon: "12_coffee",
      categoryType: "fun",
      householdId: newHousehold.id,
    },
    {
      name: t("emergencyFund"),
      icon: "13_emergencyFund",
      categoryType: "future you",
      householdId: newHousehold.id,
    },
    {
      name: t("education"),
      icon: "14_education",
      categoryType: "future you",
      householdId: newHousehold.id,
    },
    {
      name: t("vacationFund"),
      icon: "15_vacationFund",
      categoryType: "future you",
      householdId: newHousehold.id,
    },
    {
      name: t("dailyJob"),
      icon: "16_dailyJob",
      categoryType: "incomes",
      householdId: newHousehold.id,
    },
    {
      name: t("sideHustle"),
      icon: "17_sideHustle",
      categoryType: "incomes",
      householdId: newHousehold.id,
    },
  ];

  const [newCategories] = await db
    .insert(CategoryTable)
    .values(defaultCategories)
    .returning();

  if (newCategories == null) throw new Error("Failed to create category");

  if (balance > 0) {
    const [newTransaction] = await db
      .insert(TransactionTable)
      .values({
        categoryId: "",
        date: new Date(),
        name: t("balance"),
        price: balance,
        type: "income",
      })
      .returning();

    if (newTransaction == null) throw new Error("Failed to create balance");
  }

  return newHousehold;
}

export async function updateHousehold(
  data: HouseholdSchema,
  householdId: string
) {
  if (
    !validateUuid(householdId) ||
    !(await canMakeChangesToHousehold(householdId))
  ) {
    throw new Error("There was an error generateing new link");
  }

  const [updatedHousehold] = await db
    .update(HouseholdTable)
    .set(data)
    .where(eq(HouseholdTable.id, householdId))
    .returning();

  if (updatedHousehold == null)
    throw new Error("Failed to update your Household");

  return updatedHousehold;
}

export async function deleteHousehold(householdId: string) {
  if (
    !validateUuid(householdId) ||
    !(await canMakeChangesToHousehold(householdId))
  ) {
    throw new Error("There was an error generateing new link");
  }

  const [deletedHousehold] = await db
    .delete(HouseholdTable)
    .where(eq(HouseholdTable.id, householdId))
    .returning();

  if (deletedHousehold == null)
    throw new Error("Failed to update your Household");

  return deletedHousehold;
}

export async function updateLink(householdId: string) {
  if (
    !validateUuid(householdId) ||
    !(await canMakeChangesToHousehold(householdId))
  ) {
    throw new Error("There was an error generateing new link");
  }

  const newLink = await createUuid();

  const [updatedLink] = await db
    .update(InviteTable)
    .set({ link: newLink })
    .where(eq(HouseholdTable.id, householdId))
    .from(HouseholdTable)
    .returning();

  if (updatedLink == null) throw new Error("Failed to generate link");

  return updatedLink;
}
