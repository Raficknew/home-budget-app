"use client";
import { Trash2Icon } from "lucide-react";
import { deleteMember } from "../actions/members";
import { ActionButton } from "@/components/ActionButton";

export function Member({
  member,
  householdId,
}: {
  member: {
    name: string | null;
    id: string;
    user: {
      name: string | null;
      id: string;
    } | null;
  };
  householdId: string;
}) {
  return (
    <div className="flex items-center w-full justify-between">
      {member.user?.name ?? member.name}
      <div className="flex items-center gap-6">
        {!member.user && <div>Edit</div>}
        <ActionButton
          action={() => deleteMember(member.id, householdId)}
          variant="destructive"
        >
          <Trash2Icon />
        </ActionButton>
      </div>
    </div>
  );
}
