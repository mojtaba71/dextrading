import { FaHandHoldingUsd, FaPercentage } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import {
  MdAutoGraph,
  MdGraphicEq,
  MdLabel,
  MdOutlineScoreboard,
} from "react-icons/md";
import { RiNftFill } from "react-icons/ri";

export interface FilterType {
  name: string;
  value: any;
  type: "radio" | "range";
  list?: string[];
  icon: React.ReactNode;
  isCardOpen?: boolean;
}

export const initTopWalletFilters: {
  [key: string]: FilterType;
} = {
  rank: {
    name: "rank", //
    icon: <FaHashtag size="15" className="text-gray-700" />,
    type: "range",
    value: [0, 10000],
    isCardOpen: true,
  },
  label: {
    name: "label",
    icon: <MdLabel size="22" className="text-gray-700" />,
    type: "radio",
    list: ["Medium Size", "Large Size", "Small Size"],
    value: undefined,
  },
  pnl: {
    name: "pnl",
    icon: <MdAutoGraph size="22" className="text-gray-700" />,
    type: "range",
    value: [-400000000, 400000000],
  },
  winRate: {
    name: "winRate",
    icon: <MdGraphicEq size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 10],
  },
  dayActive: {
    name: "dayActive",
    icon: <IoCheckmarkDoneSharp size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 20000],
  },
  avgHoldingTime: {
    name: "avgHoldingTime",
    icon: <FaHandHoldingUsd size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 10000],
  },
  nftActivity: {
    name: "nftActivity",
    icon: <RiNftFill size="22" className="text-gray-700" />,
    type: "radio",
    list: ["yes", "no"],
    value: undefined,
  },
  totalScore: {
    name: "totalScore",
    icon: <MdOutlineScoreboard size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 1600],
  },
  age: {
    name: "age",
    icon: <LiaBabyCarriageSolid size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 10000],
  },
  TotalFee: {
    name: "TotalFee",
    icon: <FaPercentage size="22" className="text-gray-700" />,
    type: "range",
    value: [0, 100],
  },
};

export enum topWalletFiltersEnum {
  rank = "rank",
  label = "label",
  pnl = "pnl",
  winRate = "winRate",
  dayActive = "dayActive",
  avgHoldingTime = "avgHoldingTime",
  // nftActivity = "nftActivity",
  totalScore = "totalScore",
  date = "date",
  HotHolder = "HotHolder",
  age = "age",
  walletAddress = "walletAddress",
  SwapTime = "SwapTime",
  TotalFee = "TotalFee",
  BotActivity = "BotActivity",
  details = "details",
  totalnumPartiallyClosedData = "totalnumPartiallyClosedData",
  notClosedPositions = "notClosedPositions",
  totalTransactions = "totalTransactions",
}

export const topWalletLayouts: {
  [key in topWalletFiltersEnum]: boolean;
} = {
  [topWalletFiltersEnum.rank]: true,
  [topWalletFiltersEnum.walletAddress]: true,
  [topWalletFiltersEnum.label]: true,
  [topWalletFiltersEnum.pnl]: true,
  [topWalletFiltersEnum.totalTransactions]: true,
  [topWalletFiltersEnum.winRate]: true,
  [topWalletFiltersEnum.dayActive]: true,
  [topWalletFiltersEnum.HotHolder]: true,
  [topWalletFiltersEnum.TotalFee]: true,
  [topWalletFiltersEnum.details]: true,
  [topWalletFiltersEnum.totalnumPartiallyClosedData]: false,
  [topWalletFiltersEnum.notClosedPositions]: true,
  [topWalletFiltersEnum.SwapTime]: false,
  [topWalletFiltersEnum.avgHoldingTime]: true,
  [topWalletFiltersEnum.totalScore]: true,
  [topWalletFiltersEnum.date]: false,
  [topWalletFiltersEnum.age]: false,
  [topWalletFiltersEnum.BotActivity]: false,
};
