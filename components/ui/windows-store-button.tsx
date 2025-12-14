import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WindowsStoreButtonProps = React.ComponentProps<typeof Button>;

export function WindowsStoreButton({
  className,
  ...props
}: Omit<WindowsStoreButtonProps, "children">) {
  return (
    <Button className={cn("h-9 gap-1.5 px-2 py-1", className)} {...props}>
      <WindowsIcon className="size-4" />
      <div className="text-left flex flex-col items-start justify-center pr-1">
        <span className="text-[8px] leading-none tracking-tight">
          Get it from
        </span>
        <p className="text-xs font-bold leading-none">Microsoft Store</p>
      </div>
    </Button>
  );
}

function WindowsIcon({
  fill = "currentColor",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V3.75L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.8v-7.15l10 .2z"/>
    </svg>
  );
}

