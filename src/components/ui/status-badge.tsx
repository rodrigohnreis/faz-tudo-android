import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'hot' | 'cold' | 'normal';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'hot':
        return {
          text: 'HOT',
          className: 'bg-hot text-white',
          icon: '🔥'
        };
      case 'cold':
        return {
          text: 'FRIO',
          className: 'bg-cold text-white',
          icon: '🧊'
        };
      default:
        return {
          text: 'NORMAL',
          className: 'bg-muted text-muted-foreground',
          icon: '⚪'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth",
      config.className,
      className
    )}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </div>
  );
};