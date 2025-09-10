import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  Mail,
  Lock,
  Dumbbell,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const fillTestCredentials = () => {
    setEmail("joe@gmail.com");
    setPassword("Qwerty12345!");
  };

  const features = [
    {
      icon: Dumbbell,
      title: "1000+ Exercises",
      description: "Comprehensive exercise database",
    },
    {
      icon: Sparkles,
      title: "AI Workout Plans",
      description: "Personalized training programs",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is safe with us",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Branding & Features */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-[#ff2625]/10 to-[#ff4444]/10">
                <img
                  src={logo}
                  alt="FitLab Logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-3xl font-bold bg-gradient-to-r from-[#ff2625] to-[#ff4444] bg-clip-text text-transparent">
                  FitLab
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Welcome Back to Your
                  <span className="block bg-gradient-to-r from-[#ff2625] to-[#ff4444] bg-clip-text text-transparent">
                    Fitness Journey
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  Continue tracking your progress, discovering new exercises,
                  and achieving your fitness goals.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ff2625]/10 to-[#ff4444]/10 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#ff2625]" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="space-y-2 pb-6 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Sign In to Your Account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your credentials to access your fitness dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50"
                    >
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus-visible:ring-[#ff2625] focus-visible:border-[#ff2625] bg-gray-50/50 focus:bg-white transition-colors"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-200 focus-visible:ring-[#ff2625] focus-visible:border-[#ff2625] bg-gray-50/50 focus:bg-white transition-colors"
                        disabled={isLoading}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={handleTogglePassword}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-[#ff2625] border-gray-300 rounded focus:ring-[#ff2625]"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-[#ff2625] hover:text-[#e01e20] font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-[#ff2625] to-[#ff4444] hover:from-[#e01e20] hover:to-[#e03333] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>

                  {/* Demo Credentials */}
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-xs text-gray-500">
                        Try Demo
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={fillTestCredentials}
                    disabled={isLoading}
                    className="w-full h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Fill Demo Credentials
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold text-[#ff2625] hover:text-[#e01e20] transition-colors"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>
                  Your data is protected with enterprise-grade security
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
