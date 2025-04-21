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
  mortgage: HouseIcon,
  transportation: CarFrontIcon,
  phone: SmartphoneIcon,
  insurence: ShieldUserIcon,
  groceries: ShoppingCartIcon,
  healthcare: HeartPulseIcon,
  clothing: ShirtIcon,
  eatingOut: UtensilsIcon,
  gym: DumbbellIcon,
  gifts: GiftIcon,
  streaming: AirplayIcon,
  coffee: CoffeeIcon,
  emergencyFund: SirenIcon,
  education: GraduationCapIcon,
  vacationFund: TreePalmIcon,
  dailyJob: BriefcaseBusinessIcon,
  sideHustle: HandCoinsIcon,
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
