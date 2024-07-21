import {
  BellAlertIcon,
  BellIcon,
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TagIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default [
  {
    id: 1,
    type: "info",
    svg: InformationCircleIcon,
    classes: "w-8 h-8 text-blue-500",
  },
  {
    id: 2,
    type: "success",
    svg: CheckCircleIcon,
    classes: "w-8 h-8 text-emerald-500",
  },
  {
    id: 3,
    type: "warning",
    svg: ExclamationTriangleIcon,
    classes: "w-8 h-8 text-yellow-500",
  },
  {
    id: 4,
    type: "error",
    svg: XCircleIcon,
    classes: "w-8 h-8 text-red-500",
  },
  {
    id: 5,
    type: "chat",
    svg: ChatBubbleBottomCenterIcon,
    classes: "w-8 h-8 text-blue-500",
  },
  {
    id: 6,
    type: "reminder",
    svg: BellAlertIcon,
    classes: "w-8 h-8 text-gray-800",
  },
  {
    id: 7,
    type: "tag",
    svg: TagIcon,
    classes: "w-8 h-8 text-amber-800",
  },
  {
    id: 8,
    type: "notification",
    svg: BellIcon,
    classes: "w-8 h-8 text-green-600",
  },
];
