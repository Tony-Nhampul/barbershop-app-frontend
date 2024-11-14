import { ChevronLeftIcon } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ChevronLeftProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  leftPosition: number;
  scrollSpeed: number;
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({
  scrollRef,
  leftPosition,
  scrollSpeed,
}) => {
  const { theme } = useTheme();

  return (
    <ChevronLeftIcon
      className={`absolute z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
        theme === "light" ? "bg-slate-400 text-white" : "bg-black"
      }`}
      style={{ left: `${leftPosition}px` }}
      onClick={() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft -= scrollSpeed;
        }
      }}
    />
  );
};

export default ChevronLeft;
