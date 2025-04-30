
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: user, isLoading: isUserLoading, error, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false,
    enabled: authService.isAuthenticated(),
  });
  
  useEffect(() => {
    setIsLoading(isUserLoading);
  }, [isUserLoading]);
  
  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (userData) => {
      queryClient.setQueryData(['currentUser'], userData);
      refetch();
      toast.success('Đăng nhập thành công!');
      
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    },
  });
  
  const register = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    },
  });
  
  const logout = () => {
    authService.logout();
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    toast.info('Đã đăng xuất.');
    navigate('/');
  };
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login: login.mutate,
    register: register.mutate,
    logout,
    error,
  };
};
