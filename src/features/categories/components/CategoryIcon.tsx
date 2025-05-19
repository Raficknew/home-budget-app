import {
  AirplaneTakeOff01Icon,
  BankIcon,
  Briefcase02Icon,
  Car01Icon,
  Coffee02Icon,
  DropletIcon,
  Dumbbell02Icon,
  EnergyIcon,
  GiftIcon,
  HangerIcon,
  HealthIcon,
  Home05Icon,
  MoneyBag02Icon,
  Mortarboard02Icon,
  Restaurant02Icon,
  ShoppingCart01Icon,
  SmartPhone01Icon,
  StethoscopeIcon,
  Tv01Icon,
  Wallet03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const icons = {
  "1_rent": Home05Icon,
  "2_loan": BankIcon,
  "3_transportation": Car01Icon,
  "4_phone": SmartPhone01Icon,
  "5_insurence": HealthIcon,
  "6_groceries": ShoppingCart01Icon,
  "7_healthcare": StethoscopeIcon,
  "8_clothing": HangerIcon,
  "9_eatingOut": Restaurant02Icon,
  "10_gym": Dumbbell02Icon,
  "11_gifts": GiftIcon,
  "12_subscriptions": Tv01Icon,
  "13_coffee": Coffee02Icon,
  "14_emergencyFund": MoneyBag02Icon,
  "15_education": Mortarboard02Icon,
  "16_vacationFund": AirplaneTakeOff01Icon,
  "17_dailyJob": Briefcase02Icon,
  "18_sideHustle": Wallet03Icon,
  "19_electricity": EnergyIcon,
  "20_water": DropletIcon,
  default: Home05Icon,
};

export type CategoryIconKeys = keyof typeof icons;

export const CategoryIcon = ({
  categoryIconName,
  size = 20,
  color,
}: {
  categoryIconName: CategoryIconKeys;
  size?: number;
  color?: string;
}) => {
  const icon = icons[categoryIconName] || icons.default;
  return <HugeiconsIcon icon={icon} size={size} color={color} />;
};
