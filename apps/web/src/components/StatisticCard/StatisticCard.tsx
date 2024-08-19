import type { HTMLAttributes } from "react";

type StatisticsCardProps = HTMLAttributes<HTMLElement> & {
  header: string;
  value: string;
};

export default function StatisticCard({
  header,
  value,
  ...props
}: StatisticsCardProps) {
  return (
    <div {...props} className="flex flex-col items-start justify-center gap-2">
      <h4 className=" font-bold text-2xl uppercase">{header}</h4>
      <p className=" text-3xl font-semibold">{value}</p>
    </div>
  );
}
