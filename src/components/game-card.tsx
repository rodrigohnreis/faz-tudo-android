import { Card } from "@/components/ui/card";
import { Game } from "@/types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  className?: string;
  signalCount?: number;
}

export const GameCard = ({ game, onClick, className, signalCount = 0 }: GameCardProps) => {
  const getAnimalGradient = (animal: Game['animal']) => {
    switch (animal) {
      case 'tiger':
        return 'bg-gradient-to-br from-orange-500/20 to-orange-600/10';
      case 'rabbit':
        return 'bg-gradient-to-br from-pink-500/20 to-pink-600/10';
      case 'monkey':
        return 'bg-gradient-to-br from-yellow-600/20 to-yellow-700/10';
      case 'lion':
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10';
      case 'elephant':
        return 'bg-gradient-to-br from-blue-500/20 to-blue-600/10';
      case 'parrot':
        return 'bg-gradient-to-br from-green-500/20 to-green-600/10';
      default:
        return 'bg-gradient-card';
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-elevated",
        "bg-card border-border shadow-card relative overflow-hidden",
        getAnimalGradient(game.animal),
        className
      )}
      onClick={onClick}
    >
      {signalCount > 0 && (
        <div className="absolute top-2 right-2 bg-hot text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {signalCount}
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-4xl mb-2">{game.icon}</div>
        
        <div>
          <h3 className="font-semibold text-card-foreground text-lg">{game.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
        </div>
        
        <div className="flex items-center justify-between w-full pt-2 border-t border-border/50">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Multiplicador</div>
            <div className="text-lg font-bold text-hot">{game.multiplier}x</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Sinais Ativos</div>
            <div className={cn(
              "text-lg font-bold",
              signalCount > 0 ? 'text-success' : 'text-muted-foreground'
            )}>
              {signalCount}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};