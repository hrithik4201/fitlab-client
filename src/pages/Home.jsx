import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  TrendingUp,
  Calendar,
  Target,
  Flame,
  Trophy,
  Clock,
  Zap,
} from "lucide-react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/workouts`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // Calculate workout statistics
  const getWorkoutStats = () => {
    if (!workouts || workouts.length === 0) {
      return {
        totalWorkouts: 0,
        totalVolume: 0,
        averageWeight: 0,
        thisWeekWorkouts: 0,
      };
    }

    const totalWorkouts = workouts.length;
    const totalVolume = workouts.reduce(
      (sum, workout) => sum + workout.load * workout.reps,
      0
    );
    const averageWeight =
      workouts.reduce((sum, workout) => sum + workout.load, 0) / totalWorkouts;

    // Calculate this week's workouts
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekWorkouts = workouts.filter(
      (workout) => new Date(workout.createdAt) > oneWeekAgo
    ).length;

    return {
      totalWorkouts,
      totalVolume: Math.round(totalVolume),
      averageWeight: Math.round(averageWeight * 10) / 10,
      thisWeekWorkouts,
    };
  };

  const stats = getWorkoutStats();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMotivationalMessage = () => {
    if (stats.totalWorkouts === 0) {
      return "Ready to start your fitness journey? Add your first workout!";
    }
    if (stats.thisWeekWorkouts === 0) {
      return "Let's get back on track! Time for a new workout.";
    }
    if (stats.thisWeekWorkouts >= 5) {
      return "Amazing work this week! You're crushing your goals! 🔥";
    }
    return "Keep up the great momentum! Every workout counts.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {getGreeting()},{" "}
                {user?.email?.split("@")[0] || "Fitness Champion"}! 👋
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {getMotivationalMessage()}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ff2625] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.totalWorkouts}
                  </p>
                  <p className="text-sm text-blue-600">Total Workouts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.totalVolume}
                  </p>
                  <p className="text-sm text-green-600">Total Volume (kg)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">
                    {stats.averageWeight}
                  </p>
                  <p className="text-sm text-purple-600">Avg Weight (kg)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700">
                    {stats.thisWeekWorkouts}
                  </p>
                  <p className="text-sm text-orange-600">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workouts List - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#ff2625]" />
                Recent Workouts
              </h2>
              {workouts && workouts.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-[#ff2625]/10 text-[#ff2625] border-[#ff2625]/20"
                >
                  {workouts.length} total
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {workouts && workouts.length > 0 ? (
                workouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
                ))
              ) : (
                <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Activity className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No workouts yet
                    </h3>
                    <p className="text-gray-500 mb-4 max-w-sm">
                      Start your fitness journey by adding your first workout.
                      Every rep counts!
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <Trophy className="h-4 w-4 mr-1" />
                      <span>Your progress starts here</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar - Add Workout Form */}
          <div className="space-y-6">
            <WorkoutForm />

            {/* Quick Tips Card */}
            <Card className="bg-gradient-to-br from-[#ff2625]/5 to-[#ff4444]/5 border-[#ff2625]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                  <Clock className="h-5 w-5 text-[#ff2625]" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#ff2625] font-bold">•</span>
                    Track every workout to see your progress over time
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#ff2625] font-bold">•</span>
                    Gradually increase weight or reps for continuous improvement
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#ff2625] font-bold">•</span>
                    Consistency beats intensity - aim for regular workouts
                  </p>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-xs text-gray-500 italic">
                    "The best workout is the one you actually do!"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
