import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Pin, Trash2 } from "lucide-react";

export default function ChatActionMenu({
  chat,
  setEditingChatId,
  setEditingTitle,
  pinChat,
  deleteChat,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
  className="relative shrink-0 flex items-center"
  ref={menuRef}
>
      <button
  onClick={() => setOpen(!open)}
  className="
    opacity-100
    text-white
    p-1
    rounded-lg
    hover:bg-white/10
  "
>
        <MoreVertical size={16} />
      </button>

     {open && (
  <div
    className="
      absolute
      right-0
      top-9
      z-50
      w-44
      origin-top-right
      rounded-2xl
      border
      border-white/10
      bg-[#1A1327]/95
      backdrop-blur-xl
      p-2
      shadow-2xl
      animate-in
      fade-in
      zoom-in-95
      duration-150
    "
  >
          <button
            onClick={() => {
              setEditingChatId(chat.id);
              setEditingTitle(chat.title);
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
          >
            <Pencil size={16} />
            Rename
          </button>

          <button
            onClick={() => {
              pinChat(chat.id);
              setOpen(false);
            }}
           className="
flex
w-full
items-center
gap-3
rounded-xl
px-3
py-2
transition-all
duration-150
hover:bg-white/5
hover:translate-x-1
"
          >
            <Pin size={16} />
            {chat.pinned ? "Unpin" : "Pin"}
          </button>

          <button
            onClick={() => {
              deleteChat(chat.id);
              setOpen(false);
            }}
            className="
flex
w-full
items-center
gap-3
rounded-xl
px-3
py-2
text-red-400
transition-all
duration-150
hover:bg-red-500/10
hover:translate-x-1
"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      )}
    </div>
  );
}