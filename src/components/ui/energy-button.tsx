
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface EnergyButtonProps extends ButtonProps {
  children: React.ReactNode;
  glowColor?: string;
}

export function EnergyButton({
  children,
  glowColor = "rgba(243, 190, 89, 0.6)",
  className,
  asChild = false,
  ...props
}: EnergyButtonProps) {
  const content = (
    <>
      <div className="relative z-10">{children}</div>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />
    </>
  );

  return (
    <Button
      className={cn(
        "relative overflow-hidden group border-energy-400 bg-gradient-to-r from-mystic-900 to-mystic-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(243,190,89,0.5)]",
        className
      )}
      asChild={asChild}
      {...props}
    >
      {asChild ? React.Children.only(children) : content}
    </Button>
  );
}
