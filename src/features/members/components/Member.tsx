"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
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
        {!member.user && <EditIcon className="cursor-pointer" size={16} />}
        <ActionButton
          action={() => deleteMember(member.id, householdId)}
          variant="destructive"
        >
          <Trash2Icon className="cursor-pointer" size={16} />
        </ActionButton>
      </div>
    </div>
  );
}
