import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsOffOutline } from "react-icons/io5";

function NotificationToggle({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) {
  return (
    <div className="min-w-[35px] flex justify-center text-[23px] cursor-pointer" onClick={onToggle}>
      {isOn ? <IoNotificationsOutline height={32} /> : <IoNotificationsOffOutline height={32} />}
    </div>
  );
}

export default NotificationToggle;
