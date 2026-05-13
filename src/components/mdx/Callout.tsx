import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip";

const styles: Record<CalloutType, { bg: string; border: string; icon: string }> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-500",
    icon: "ℹ️",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-500",
    icon: "⚠️",
  },
  tip: {
    bg: "bg-green-50",
    border: "border-green-500",
    icon: "💡",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const s = styles[type];

  return (
    <div className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} p-4`}>
      <div className="flex gap-3">
        <span className="text-lg">{s.icon}</span>
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
