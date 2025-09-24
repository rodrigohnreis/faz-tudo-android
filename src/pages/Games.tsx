import { useSimulation } from "@/hooks/useSimulation";
import { GameCard } from "@/components/game-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Games = () => {
  const { games, signals, isLoading, refreshData, getActiveSignals } = useSimulation();
  const activeSignals = getActiveSignals();

  const getSignalCountForGame = (gameId: string) => {
    return activeSignals.filter(signal => signal.gameId === gameId).length;
  };

  const gamesWithSignals = games
    .map(game => ({
      ...game,
      signalCount: getSignalCountForGame(game.id)
    }))
    .sort((a, b) => b.signalCount - a.signalCount);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Jogos</h1>
            <p className="text-white/80 text-sm">Escolha seu jogo favorito</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="bg-white/20 text-white border-none hover:bg-white/30"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>

        {/* Stats */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-5 h-5 text-white" />
            <span className="text-white/80 text-sm">Total de Jogos</span>
          </div>
          <div className="text-2xl font-bold text-white">{games.length}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="space-y-2 text-center">
                    <div className="w-24 h-5 bg-muted rounded mx-auto"></div>
                    <div className="w-32 h-4 bg-muted rounded mx-auto"></div>
                  </div>
                  <div className="flex justify-between w-full pt-2">
                    <div className="w-16 h-8 bg-muted rounded"></div>
                    <div className="w-12 h-8 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Hot Games (with signals) */}
            {gamesWithSignals.some(game => game.signalCount > 0) && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">🔥</div>
                  <h2 className="text-xl font-semibold text-foreground">Jogos com Sinais Ativos</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gamesWithSignals
                    .filter(game => game.signalCount > 0)
                    .map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        signalCount={game.signalCount}
                      />
                    ))}
                </div>
              </section>
            )}

            {/* All Games */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Todos os Jogos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gamesWithSignals.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    signalCount={game.signalCount}
                  />
                ))}
              </div>
            </section>

            {/* No signals message */}
            {activeSignals.length === 0 && (
              <div className="text-center py-8 mt-8">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-muted-foreground mb-4">
                  Nenhum sinal ativo no momento
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Os sinais são atualizados automaticamente a cada 30 segundos
                </p>
                <Button 
                  variant="outline" 
                  onClick={refreshData} 
                  disabled={isLoading}
                >
                  <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                  Verificar Novos Sinais
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};