import {
  FontAwesome6,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';


export const STATS_DATA = [
  {
    id: 1,
    Icon: FontAwesome6,
    name: "arrow-up-wide-short",
    value: "12.5M",
    label: "EXPORTERS",
    iconBg: "bg-purple-100",
  },
  {
    id: 2,
    Icon: FontAwesome5,
    name: "sort-amount-down",
    value: "15M",
    label: "IMPORTERS",
    iconBg: "bg-teal-100",
  },
  {
    id: 3,
    Icon: Feather,
    name: "download-cloud",
    value: "19,990",
    label: "RDP",
    iconBg: "bg-blue-100",
  },
  {
    id: 4,
    Icon: FontAwesome6,
    name: "floppy-disk",
    value: "0/10",
    label: "SAVED SEARCHES",
    iconBg: "bg-indigo-100",
  },
  {
    id: 5,
    Icon: MaterialCommunityIcons,
    name: "contacts-outline",
    value: "50",
    label: "CONTACT POINTS",
    iconBg: "bg-emerald-100",
  },
  {
    id: 6,
    Icon: MaterialCommunityIcons,
    name: "calendar-month-outline",
    value: "14 Oct 2026",
    label: "VALID TILL",
    iconBg: "bg-orange-100",
  },
];
