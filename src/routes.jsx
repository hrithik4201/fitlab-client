import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ExerciseDetail from "./pages/ExerciseDetail";
import ExercisesHome from "./pages/ExercisesHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WorkoutPlan from "./pages/WorkoutPlan";
import MainLayout from "./layouts/MainLayout";

function RoutesConfig() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/exercises"
          element={user ? <ExercisesHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/planner"
          element={user ? <WorkoutPlan /> : <Navigate to="/login" />}
        />
        <Route
          path="/exercise/:id"
          element={user ? <ExerciseDetail /> : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
}

export default RoutesConfig;
