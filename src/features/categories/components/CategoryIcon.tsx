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
  LandmarkIcon,
  ShieldUserIcon,
  ShirtIcon,
  ShoppingCartIcon,
  SirenIcon,
  SmartphoneIcon,
  TreePalmIcon,
  UtensilsIcon,
} from "lucide-react";

export const icons = {
  "1_rent": HouseIcon,
  "2_loan": LandmarkIcon,
  "3_transportation": CarFrontIcon,
  "4_phone": SmartphoneIcon,
  "5_insurence": ShieldUserIcon,
  "6_groceries": ShoppingCartIcon,
  "7_healthcare": HeartPulseIcon,
  "8_clothing": ShirtIcon,
  "9_eatingOut": UtensilsIcon,
  "10_gym": DumbbellIcon,
  "11_gifts": GiftIcon,
  "12_subscriptions": AirplayIcon,
  "13_coffee": CoffeeIcon,
  "14_emergencyFund": SirenIcon,
  "15_education": GraduationCapIcon,
  "16_vacationFund": TreePalmIcon,
  "17_dailyJob": BriefcaseBusinessIcon,
  "18_sideHustle": HandCoinsIcon,
  default: HouseIcon,
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
  const Icon = icons[categoryIconName] || icons.default;
  return <Icon size={size} color={color} />;
};
