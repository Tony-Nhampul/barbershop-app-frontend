import { ChevronRightIcon } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ChevronRightProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  rightPosition: number;
}

const ChevronRight: React.FC<ChevronRightProps> = ({
  scrollRef,
  rightPosition,
}) => {
  const { theme } = useTheme();

  return (
    <ChevronRightIcon
      className={`absolute z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
        theme === "light" ? "bg-slate-400 text-white" : "bg-black"
      }`}
      style={{ right: `${rightPosition}px` }}
      onClick={() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 300;
        }
      }}
    />
  );
};

export default ChevronRight;
