
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface EnergyButtonProps extends ButtonProps {
  children: React.ReactNode;
  glowColor?: string;
  animatedPulse?: boolean;
}

export function EnergyButton({
  children,
  glowColor = "rgba(243, 190, 89, 0.6)",
  animatedPulse = false,
  className,
  asChild = false,
  ...props
}: EnergyButtonProps) {
  const content = (
    <>
      <div className="relative z-10">{children}</div>
      <span
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
          animatedPulse && "animate-pulse-glow"
        )}
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
        animatedPulse && "hover:shadow-[0_0_20px_rgba(243,190,89,0.8)] hover:border-energy-300 hover:scale-105",
        className
      )}
      asChild={asChild}
      {...props}
    >
      {asChild ? React.Children.only(children) : content}
    </Button>
  );
}
