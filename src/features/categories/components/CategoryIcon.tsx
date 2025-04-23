import {
  AirplayIcon,
  BriefcaseBusinessIcon,
  CarFrontIcon,
  CoffeeIcon,
  DumbbellIcon,
  GiftIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  HeartPulseIcon,
  HouseIcon,
  ShieldUserIcon,
  ShirtIcon,
  ShoppingCartIcon,
  SirenIcon,
  SmartphoneIcon,
  TreePalmIcon,
  UtensilsIcon,
} from "lucide-react";

const icons = {
  "1_mortgage": HouseIcon,
  "2_transportation": CarFrontIcon,
  "3_phone": SmartphoneIcon,
  "4_insurence": ShieldUserIcon,
  "5_groceries": ShoppingCartIcon,
  "6_healthcare": HeartPulseIcon,
  "7_clothing": ShirtIcon,
  "8_eatingOut": UtensilsIcon,
  "9_gym": DumbbellIcon,
  "10_gifts": GiftIcon,
  "11_subscriptions": AirplayIcon,
  "12_coffee": CoffeeIcon,
  "13_emergencyFund": SirenIcon,
  "14_education": GraduationCapIcon,
  "15_vacationFund": TreePalmIcon,
  "16_dailyJob": BriefcaseBusinessIcon,
  "17_sideHustle": HandCoinsIcon,
  default: HouseIcon,
};

type IconKeys = keyof typeof icons;

export const CategoryIcon = ({
  categoryIconName,
  size = 20,
  color,
}: {
  categoryIconName: IconKeys;
  size?: number;
  color?: string;
}) => {
  const Icon = icons[categoryIconName] || icons.default;
  return <Icon size={size} color={color} />;
};
