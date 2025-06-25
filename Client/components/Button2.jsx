import {
  PlayCircleIcon,
  PlayIcon,
  TicketIcon,
  TicketMinus,
} from "lucide-react";

function Button2({ children, onClick, icon, color, icon2 }) {
  return (
    <button
      className=" cursor-pointer px-5 py-2 gap-2 flex items-center justify-center rounded-2xl"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {icon && <PlayCircleIcon size={20} />}
      {icon2 && <TicketIcon size={20} />}
      {children}
    </button>
  );
}

export default Button2;
