import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  User,
  Weight,
  Ruler,
  Target,
  Dumbbell,
  Calendar,
  MapPin,
  Download,
  Sparkles,
} from "lucide-react";

// Import your workout icons
import any from "../assets/icons/any.png";
import strength from "../assets/icons/strength.png";
import cardio from "../assets/icons/cardio.png";
import HIIT from "../assets/icons/HIIT.png";
import yoga from "../assets/icons/yoga.png";
import hike from "../assets/icons/hike.png";
import WorkoutPlanDisplay from "@/components/WorkoutPlanDisplay";

const WorkoutPlan = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    currentWeight: "",
    desiredWeight: "",
    height: "",
    fitnessLevel: "",
    primaryGoal: "",
    secondaryGoal: "",
    workoutType: "",
    workoutFreq: [3],
    workoutPlace: "",
    planDays: [7],
  });

  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [error, setError] = useState("");

  const workoutOptions = [
    { value: "any", label: "Any", image: any },
    { value: "Strength training", label: "Strength training", image: strength },
    {
      value: "Cardiovascular training",
      label: "Cardiovascular training",
      image: cardio,
    },
    {
      value: "High-intensity interval training (HIIT)",
      label: "HIIT",
      image: HIIT,
    },
    { value: "Yoga and Pilates", label: "Yoga & Pilates", image: yoga },
    { value: "Outdoor activities", label: "Outdoor activities", image: hike },
  ];

  const fitnessGoals = [
    "Weight loss",
    "Muscle gain",
    "Endurance",
    "Flexibility and mobility",
    "Functional fitness",
    "Sports performance",
    "Rehabilitation",
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user makes changes
  };

  const validateForm = () => {
    const required = [
      "age",
      "gender",
      "currentWeight",
      "desiredWeight",
      "height",
      "fitnessLevel",
      "primaryGoal",
      "workoutType",
      "workoutPlace",
    ];
    const missing = required.filter((field) => !formData[field]);

    if (missing.length > 0) {
      setError(`Please fill in all required fields: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");

      const user = JSON.parse(localStorage.getItem("user"));
      const headers = { Authorization: `Bearer ${user.token}` };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/planner/workout-plan`,
        formData,
        { headers }
      );

      setWorkoutPlan(response.data.workoutPlan);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
          "Failed to generate workout plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#ff2625] to-[#e01e20] rounded-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          AI Workout Plan Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get a personalized workout plan tailored to your fitness goals,
          experience level, and preferences
        </p>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6 text-[#ff2625]" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className="text-base font-medium flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="h-12"
                  min="10"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Gender *
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Physical Measurements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  Current Weight (kg) *
                </Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={formData.currentWeight}
                  onChange={(e) =>
                    handleInputChange("currentWeight", e.target.value)
                  }
                  className="h-12"
                  min="30"
                  max="300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Desired Weight (kg) *
                </Label>
                <Input
                  type="number"
                  placeholder="65"
                  value={formData.desiredWeight}
                  onChange={(e) =>
                    handleInputChange("desiredWeight", e.target.value)
                  }
                  className="h-12"
                  min="30"
                  max="300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Height (cm) *
                </Label>
                <Input
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="h-12"
                  min="120"
                  max="250"
                />
              </div>
            </div>

            {/* Fitness Level */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Fitness Level *
              </Label>
              <ToggleGroup
                type="single"
                value={formData.fitnessLevel}
                onValueChange={(value) =>
                  handleInputChange("fitnessLevel", value)
                }
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                <ToggleGroupItem
                  value="beginner"
                  className="h-12 data-[state=on]:bg-[#ff2625] data-[state=on]:text-white"
                >
                  Beginner
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="intermediate"
                  className="h-12 data-[state=on]:bg-[#ff2625] data-[state=on]:text-white"
                >
                  Intermediate
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="advanced"
                  className="h-12 data-[state=on]:bg-[#ff2625] data-[state=on]:text-white"
                >
                  Advanced
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="expert"
                  className="h-12 data-[state=on]:bg-[#ff2625] data-[state=on]:text-white"
                >
                  Expert
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Primary Goal *</Label>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(value) =>
                    handleInputChange("primaryGoal", value)
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {fitnessGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Secondary Goal</Label>
                <Select
                  value={formData.secondaryGoal}
                  onValueChange={(value) =>
                    handleInputChange("secondaryGoal", value)
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select secondary goal (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {fitnessGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Workout Type */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Preferred Workout Type *
              </Label>
              <ToggleGroup
                type="single"
                value={formData.workoutType}
                onValueChange={(value) =>
                  handleInputChange("workoutType", value)
                }
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {workoutOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="h-24 flex-col space-y-2 data-[state=on]:bg-[#ff2625] data-[state=on]:text-white"
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-8 h-8"
                    />
                    <span className="text-xs text-center">{option.label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Workout Frequency */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Workout Frequency: {formData.workoutFreq[0]} days/week
              </Label>
              <Slider
                value={formData.workoutFreq}
                onValueChange={(value) =>
                  handleInputChange("workoutFreq", value)
                }
                max={7}
                min={1}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 day</span>
                <span>7 days</span>
              </div>
            </div>

            {/* Workout Location */}
            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Workout Location *
              </Label>
              <Select
                value={formData.workoutPlace}
                onValueChange={(value) =>
                  handleInputChange("workoutPlace", value)
                }
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Where do you prefer to workout?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gym">Gym</SelectItem>
                  <SelectItem value="Home with no equipments">
                    Home (no equipment)
                  </SelectItem>
                  <SelectItem value="Home with basic equipments">
                    Home (basic equipment)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Duration */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Plan Duration: {formData.planDays[0]} days
              </Label>
              <Slider
                value={formData.planDays}
                onValueChange={(value) => handleInputChange("planDays", value)}
                max={30}
                min={1}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg bg-gradient-to-r from-[#ff2625] to-[#e01e20] hover:from-[#e01e20] hover:to-[#cc1a1d] shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate My Workout Plan
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Workout Plan Display */}
      {workoutPlan && <WorkoutPlanDisplay workoutPlan={workoutPlan} />}
    </div>
  );
};

export default WorkoutPlan;
