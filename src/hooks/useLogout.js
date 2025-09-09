import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });

    navigate('/login');
  };

  return { logout };
};
