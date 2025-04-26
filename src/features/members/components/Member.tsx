"use client";
import { Edit2Icon, Trash2Icon, User } from "lucide-react";
import { deleteMember } from "../actions/members";
import { ActionButton } from "@/components/ActionButton";
import { MemberEditDialog } from "./MemberEditDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Member = {
  name: string;
  id: string;
  user: {
    id: string;
    image: string | null;
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
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={member.user?.image ?? ""} />
          <AvatarFallback className="bg-accent">
            <User />
          </AvatarFallback>
        </Avatar>
        {member.name}
      </div>
      <div className="flex items-center gap-6">
        <MemberEditDialog
          member={{
            id: member.id,
            image: member.user?.image ?? "",
            name: member.name,
          }}
          householdId={householdId}
        >
          <DialogTrigger>
            <Edit2Icon className="cursor-pointer" size={16} />
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
