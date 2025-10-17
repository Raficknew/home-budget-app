"use client";
import { deleteMember } from "@/features/members/actions/members";
import { ActionButton } from "@/components/atoms/ActionButton";
import { MemberEditDialog } from "@/features/members/components/MemberEditDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { UserAvatar } from "@/components/atoms/UserAvatar";

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
  ownerId,
}: {
  member: Member;
  householdId: string;
  ownerId: string;
}) {
  return (
    <div className="flex md:flex-col md:justify-center justify-between items-center sm:bg-[#161616] bg-sidebar md:px-5 md:py-4 pl-3 py-2 rounded-xl gap-4 drop-shadow-lg">
      <div className="flex md:flex-col items-center gap-3">
        <UserAvatar image={member.user?.image ?? ""} size={50} />
        {member.name}
      </div>
      <div className="flex">
        <MemberEditDialog member={member} householdId={householdId}>
          <DialogTrigger className="flex items-center justify-center w-12">
            <HugeiconsIcon
              className="cursor-pointer md:size-6 size-5"
              icon={PencilEdit02Icon}
            />
          </DialogTrigger>
        </MemberEditDialog>

        {ownerId !== member.user?.id && (
          <ActionButton
            action={() => deleteMember(member.id, householdId)}
            requireAreYouSure
            variant="ghostDestructive"
          >
            <HugeiconsIcon
              className="cursor-pointer md:size-6 size-5"
              icon={Cancel01Icon}
            />
          </ActionButton>
        )}
      </div>
    </div>
  );
}
