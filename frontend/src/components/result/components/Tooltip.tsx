type TooltipProps = {
  text: string;
};

const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="tooltip absolute group-hover:block hidden  -bottom-12 left-1/2 -translate-x-1/2 bg-black py-1 px-4 rounded-md ">
      <span className="tooltip-text font-semibold text-content-primary text-sm text-nowrap rounded-md ">
        {text}
      </span>
      <div className="tooltip-arrow absolute bg-black rotate-[45deg] red-500 top-0 left-1/2 -translate-1/2 size-2"></div>
    </div>
  );
};

export default Tooltip;
