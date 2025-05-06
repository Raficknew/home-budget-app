"use client";
import { deleteMember } from "../actions/members";
import { ActionButton } from "@/components/ActionButton";
import { MemberEditDialog } from "./MemberEditDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  PencilEdit02Icon,
  User03FreeIcons,
} from "@hugeicons/core-free-icons";

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
    <div className="flex sm:flex-col sm:justify-center justify-between items-center sm:bg-[#161616] bg-sidebar px-5 py-4 rounded-xl gap-4 drop-shadow-lg">
      <div className="flex sm:flex-col items-center gap-3">
        <Avatar className="sm:size-16 size-8">
          <AvatarImage
            src={member.user?.image ?? ""}
            className="sm:size-10 size-5"
          />
          <AvatarFallback className="bg-accent">
            <HugeiconsIcon
              className="sm:size-10 size-5"
              icon={User03FreeIcons}
            />
          </AvatarFallback>
        </Avatar>
        {member.name}
      </div>
      <div className="flex">
        <MemberEditDialog member={member} householdId={householdId}>
          <DialogTrigger className="flex items-center justify-center w-12">
            <HugeiconsIcon
              className="cursor-pointer sm:size-6 size-5"
              icon={PencilEdit02Icon}
            />
          </DialogTrigger>
        </MemberEditDialog>

        <ActionButton
          action={() => deleteMember(member.id, householdId)}
          requireAreYouSure
          variant="ghostDestructive"
        >
          <HugeiconsIcon
            className="cursor-pointer sm:size-6 size-5"
            icon={Cancel01Icon}
          />
        </ActionButton>
      </div>
    </div>
  );
}
