import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, Dumbbell } from "lucide-react";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      setError("You must be logged in");
      setIsLoading(false);
      return;
    }

    const workout = { title, load, reps };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/workouts`,
        {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900">
          <Dumbbell className="h-6 w-6 text-[#ff2625]" />
          Add New Workout
        </CardTitle>
        <p className="text-sm text-gray-600">Track your exercise progress</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Exercise Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Bench Press, Squats"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${
                emptyFields.includes("title")
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-gray-300 focus-visible:ring-[#ff2625]"
              } h-11`}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="load"
                className="text-sm font-medium text-gray-700"
              >
                Weight (kg) *
              </Label>
              <Input
                id="load"
                type="number"
                placeholder="0"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className={`${
                  emptyFields.includes("load")
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300 focus-visible:ring-[#ff2625]"
                } h-11`}
                disabled={isLoading}
                min="0"
                step="0.5"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="reps"
                className="text-sm font-medium text-gray-700"
              >
                Reps *
              </Label>
              <Input
                id="reps"
                type="number"
                placeholder="0"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className={`${
                  emptyFields.includes("reps")
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-gray-300 focus-visible:ring-[#ff2625]"
                } h-11`}
                disabled={isLoading}
                min="1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ff2625] hover:bg-[#e01e20] text-white h-11 font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Workout...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Workout
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;
