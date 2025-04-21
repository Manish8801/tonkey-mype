type TooltipProps = { title: string };

const Tooltip = ({ title }: TooltipProps) => {
  return (
    <div className="tooltip border-1 text-[10px] tracking-wide bg-[rgba(0,0,0,.3)] px-1 py-0.5 hidden group-hover:block absolute -top-4 left-1/2 -translate-1/2 text-nowrap">
      {title}
    </div>
  );
};

export default Tooltip;
