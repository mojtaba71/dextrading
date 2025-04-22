import { useState } from "react";

export default function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 border-border border ${
        enabled ? "bg-brand" : "bg-transparent"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-3" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
