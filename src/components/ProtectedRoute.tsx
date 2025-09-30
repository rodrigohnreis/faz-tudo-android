import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  feature?: 'games' | 'signals' | 'vip-signals';
}

export const ProtectedRoute = ({ children, feature }: ProtectedRouteProps) => {
  const { user, profile, loading, hasAccess } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile && feature && !hasAccess(feature)) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer upgrade do seu plano para acessar este recurso.",
        variant: "destructive",
      });
      navigate('/plans');
    }
  }, [loading, user, profile, feature, hasAccess, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (feature && profile && !hasAccess(feature)) {
    return <Navigate to="/plans" replace />;
  }

  return <>{children}</>;
};
