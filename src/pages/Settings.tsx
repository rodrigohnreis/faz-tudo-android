import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Volume2, 
  Smartphone, 
  Shield, 
  Moon, 
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  User,
  Crown,
  Lock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'vip':
        return 'bg-warning text-warning-foreground';
      case 'premium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'vip':
        return 'VIP Diamond';
      case 'premium':
        return 'Premium';
      default:
        return 'Básico';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Configurações</h1>
            <p className="text-white/80 text-sm">Personalize sua experiência</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">
                  {profile?.full_name || 'Usuário'}
                </h3>
                {profile && (
                  <Badge className={getPlanBadgeColor(profile.plan)}>
                    {profile.plan === 'vip' && <Crown className="w-3 h-3 mr-1" />}
                    {getPlanName(profile.plan)}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {profile?.plan_expires_at && (
                <p className="text-xs text-muted-foreground mt-1">
                  Plano válido até {new Date(profile.plan_expires_at).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.href = '/plans'}>
              Fazer Upgrade
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertas de Sinais</p>
                <p className="text-sm text-muted-foreground">Receber notificações de novos sinais</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Som</p>
                <p className="text-sm text-muted-foreground">Alertas sonoros</p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Vibração</p>
                <p className="text-sm text-muted-foreground">Vibrar ao receber alertas</p>
              </div>
              <Switch
                checked={vibration}
                onCheckedChange={setVibration}
              />
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Aplicativo
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Modo Escuro</p>
                <p className="text-sm text-muted-foreground">Tema escuro do aplicativo</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <Separator />
            
            <Button variant="outline" className="w-full justify-start">
              <Volume2 className="w-4 h-4 mr-2" />
              Volume dos Alertas
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Horários de Notificação
            </Button>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Segurança
          </h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Autenticação em Dois Fatores
            </Button>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Suporte
          </h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Central de Ajuda
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Contatar Suporte
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Termos de Uso
            </Button>
          </div>
        </Card>

        {/* Admin Access */}
        {isAdmin && (
          <Card className="p-4">
            <Button 
              variant="default" 
              className="w-full bg-warning hover:bg-warning/90" 
              onClick={() => navigate('/admin')}
            >
              <Lock className="w-4 h-4 mr-2" />
              Painel Admin
            </Button>
          </Card>
        )}

        {/* Logout */}
        <Card className="p-4">
          <Button variant="destructive" className="w-full" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </Card>
      </div>
    </div>
  );
};