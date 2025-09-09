import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Weight, 
  RotateCcw, 
  Calendar,
  TrendingUp 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/workouts/${workout._id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const getVolumeCalculation = () => {
    return workout.load * workout.reps;
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Exercise Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ff2625] transition-colors">
              {workout.title}
            </h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Weight className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-semibold text-gray-900">{workout.load} kg</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-50">
                  <RotateCcw className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reps</p>
                  <p className="font-semibold text-gray-900">{workout.reps}</p>
                </div>
              </div>
            </div>

            {/* Volume Badge */}
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                Volume: {getVolumeCalculation()} kg
              </Badge>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(workout.createdAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutDetails;