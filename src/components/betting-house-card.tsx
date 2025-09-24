import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { BettingHouse } from "@/types";
import { cn } from "@/lib/utils";

interface BettingHouseCardProps {
  house: BettingHouse;
  onClick?: () => void;
  className?: string;
}

export const BettingHouseCard = ({ house, onClick, className }: BettingHouseCardProps) => {
  const formatPayoutRate = (rate: number) => {
    return `${rate.toFixed(1)}%`;
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-gradient-hot';
      case 'cold':
        return 'bg-gradient-to-r from-cold/20 to-cold/10';
      default:
        return 'bg-gradient-card';
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-elevated",
        "bg-card border-border shadow-card",
        getStatusGradient(house.status),
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{house.logo}</div>
          <div>
            <h3 className="font-semibold text-card-foreground">{house.name}</h3>
            <p className="text-sm text-muted-foreground">
              Atualizado há {Math.floor((Date.now() - house.lastUpdate.getTime()) / 60000)}min
            </p>
          </div>
        </div>
        <StatusBadge status={house.status} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Taxa de Retorno</span>
          <span className={cn(
            "text-2xl font-bold",
            house.status === 'hot' ? 'text-hot' : 
            house.status === 'cold' ? 'text-cold' : 'text-card-foreground'
          )}>
            {formatPayoutRate(house.payoutRate)}
          </span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Status</span>
          <div className="flex items-center gap-1">
            {house.status === 'hot' && (
              <div className="flex gap-0.5">
                <div className="w-2 h-2 bg-hot rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-hot rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-hot rounded-full animate-pulse delay-200"></div>
              </div>
            )}
            <span className={cn(
              "text-sm font-medium",
              house.status === 'hot' ? 'text-hot' : 
              house.status === 'cold' ? 'text-cold' : 'text-muted-foreground'
            )}>
              {house.status === 'hot' ? 'Pagando Muito' : 
               house.status === 'cold' ? 'Baixo Retorno' : 'Normal'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};