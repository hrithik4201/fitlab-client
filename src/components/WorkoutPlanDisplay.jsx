import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Clock,
  Dumbbell,
  Users,
  Heart,
  Shield,
  TrendingUp,
  Lightbulb,
  Download,
} from "lucide-react";
import html2pdf from "html2pdf.js";

const WorkoutPlanDisplay = ({ workoutPlan }) => {
  const pdfRef = useRef();

  if (!workoutPlan) return null;

  const downloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 1,
      filename: `${workoutPlan.title || "Workout Plan"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-[#ff2625] to-[#e01e20] hover:from-[#e01e20] hover:to-[#cc1a1d] shadow-lg"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* PDF Content */}
      <div ref={pdfRef} className="space-y-6">
        {/* Plan Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-green-600" />
              {workoutPlan.title}
            </CardTitle>
            <p className="text-gray-600">{workoutPlan.summary}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Profile Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Your Profile:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div>
                  <span className="font-medium">Age:</span>{" "}
                  {workoutPlan.userProfile.age}
                </div>
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  {workoutPlan.userProfile.gender}
                </div>
                <div>
                  <span className="font-medium">Current:</span>{" "}
                  {workoutPlan.userProfile.currentWeight}kg
                </div>
                <div>
                  <span className="font-medium">Target:</span>{" "}
                  {workoutPlan.userProfile.targetWeight}kg
                </div>
                <div>
                  <span className="font-medium">Height:</span>{" "}
                  {workoutPlan.userProfile.height}cm
                </div>
              </div>
            </div>

            {/* Plan Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <p className="font-semibold">{workoutPlan.duration}</p>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
              <div className="text-center">
                <Dumbbell className="h-8 w-8 mx-auto text-red-500 mb-2" />
                <p className="font-semibold">
                  {workoutPlan.schedule.frequency}
                </p>
                <p className="text-sm text-gray-600">Frequency</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <p className="font-semibold capitalize">
                  {workoutPlan.fitnessLevel}
                </p>
                <p className="text-sm text-gray-600">Level</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 mx-auto text-pink-500 mb-2" />
                <p className="font-semibold">{workoutPlan.schedule.restDays}</p>
                <p className="text-sm text-gray-600">Rest Days</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Goals:</h4>
              <div className="flex flex-wrap gap-2">
                {workoutPlan.goals.map((goal, index) => (
                  <Badge key={index} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Workout Type:</span>{" "}
                {workoutPlan.schedule.preferredWorkoutType}
              </div>
              <div>
                <span className="font-medium">Location:</span>{" "}
                {workoutPlan.schedule.workoutLocation}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {workoutPlan.weeklySchedule.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {day.restDay ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                      <h4 className="font-bold text-lg">
                        Day {day.day} - {day.dayName}
                      </h4>
                      <p className="text-gray-600">
                        Rest Day - Recovery and stretching
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg">
                          Day {day.day} - {day.dayName}
                        </h4>
                        <div className="text-right">
                          <Badge variant="outline">{day.workoutType}</Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {day.duration}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {day.exercises.map((exercise, exerciseIndex) => (
                          <div
                            key={exerciseIndex}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold">{exercise.name}</h5>
                              <div className="flex gap-2">
                                <Badge
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  {exercise.difficulty}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {exercise.equipment}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                              <div>
                                <span className="font-medium">Sets:</span>{" "}
                                {exercise.sets}
                              </div>
                              <div>
                                <span className="font-medium">Reps:</span>{" "}
                                {exercise.reps}
                              </div>
                              <div>
                                <span className="font-medium">Rest:</span>{" "}
                                {exercise.restTime}
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mb-2">
                              {exercise.instructions}
                            </p>

                            <div className="mb-2">
                              <span className="font-medium text-sm">
                                Target Muscles:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {exercise.targetMuscles.map(
                                  (muscle, muscleIndex) => (
                                    <Badge
                                      key={muscleIndex}
                                      variant="outline"
                                      className="text-xs capitalize"
                                    >
                                      {muscle}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            {exercise.modifications && (
                              <div className="grid md:grid-cols-2 gap-2 text-xs">
                                <div className="bg-green-50 p-2 rounded">
                                  <span className="font-medium text-green-700">
                                    Easier:
                                  </span>
                                  <p className="text-green-600">
                                    {exercise.modifications.easier}
                                  </p>
                                </div>
                                <div className="bg-orange-50 p-2 rounded">
                                  <span className="font-medium text-orange-700">
                                    Harder:
                                  </span>
                                  <p className="text-orange-600">
                                    {exercise.modifications.harder}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Nutrition Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-500" />
                Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {workoutPlan.nutritionTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Safety Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Safety Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {workoutPlan.safetyNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Weekly Goals:</h4>
                <ul className="space-y-1">
                  {workoutPlan.progressTracking.weeklyGoals.map(
                    (goal, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{goal}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Track These:</h4>
                <div className="flex flex-wrap gap-2">
                  {workoutPlan.progressTracking.measurementPoints.map(
                    (point, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize text-xs"
                      >
                        {point}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Progression:</h4>
                <p className="text-sm text-gray-700">
                  {workoutPlan.progressTracking.progressionStrategy}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        {workoutPlan.tips && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Success Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {workoutPlan.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanDisplay;
