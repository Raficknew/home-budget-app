import { ScratchCardIcon, User03FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryWithTransactions } from "@/global/types";
import { FormatDate, useFormatPrice } from "@/lib/formatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function FormatPrice(price: number, currency: string, type: string) {
  const formattedPrice = useFormatPrice(price, "PLN");

  if (type == "expense") {
    return <div className="text-red-400">-{formattedPrice}</div>;
  }

  return <div className="text-green-400">+{formattedPrice}</div>;
}

export function RecentTransactionTable({
  categories,
  members,
  currency,
}: {
  categories: CategoryWithTransactions;
  members: {
    color: string;
    id: string;
    name: string;
    householdId: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    user: {
      name: string | null;
      id: string;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
    } | null;
  }[];
  currency: string;
}) {
  const allTransactions = categories.flatMap((cat) =>
    cat.transactions.map((transaction) => ({
      ...transaction,
      categoryName: cat.name,
    }))
  );

  const sortedTransactions = allTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentTransactions = sortedTransactions.slice(0, 10);

  return (
    <div className="w-full bg-sidebar p-4 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <HugeiconsIcon strokeWidth={2} icon={ScratchCardIcon} />
        <p className="text-2xl font-light">Ostatnie Transakcje</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nazwa</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Użytkownik</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead className="text-right">Kwota</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.name}</TableCell>
              <TableCell>{FormatDate(transaction.date)}</TableCell>
              <TableCell>
                {(() => {
                  const memberId = transaction.members[0]?.memberId;
                  const member = members.find((m) => m.id === memberId);
                  return member ? (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={member.user?.image ?? ""} />
                        <AvatarFallback className="bg-accent">
                          <HugeiconsIcon icon={User03FreeIcons} />
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                    </div>
                  ) : (
                    "Brak"
                  );
                })()}
              </TableCell>
              <TableCell>{transaction.categoryName}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">
                {FormatPrice(transaction.price, currency, transaction.type)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
