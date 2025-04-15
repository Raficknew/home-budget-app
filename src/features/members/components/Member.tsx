"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
import { deleteMember } from "../actions/members";
import { ActionButton } from "@/components/ActionButton";
import { MemberEditDialog } from "./MemberEditDialog";
import { DialogTrigger } from "@/components/ui/dialog";

export type Member = {
  name: string;
  id: string;
  user: {
    name: string | null;
    id: string;
  } | null;
};

export function Member({
  member,
  householdId,
}: {
  member: Member;
  householdId: string;
}) {
  return (
    <div className="flex items-center w-full justify-between">
      {member.name}
      <div className="flex items-center gap-6">
        <MemberEditDialog
          member={{ id: member.id, name: member.name }}
          householdId={householdId}
        >
          <DialogTrigger>
            <EditIcon className="cursor-pointer" size={16} />
          </DialogTrigger>
        </MemberEditDialog>

        <ActionButton
          action={() => deleteMember(member.id, householdId)}
          requireAreYouSure
          variant="destructive"
        >
          <Trash2Icon size={16} />
        </ActionButton>
      </div>
    </div>
  );
}
