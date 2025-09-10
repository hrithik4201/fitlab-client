import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
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
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  Mail,
  Lock,
  Dumbbell,
  Check,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import logo from "../assets/images/logo.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    if (!acceptTerms) {
      return;
    }

    await signup(email, password);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];

    strength = checks.filter(Boolean).length;
    return {
      score: strength,
      percentage: (strength / 5) * 100,
      label:
        ["Very Weak", "Weak", "Fair", "Good", "Strong"][strength] ||
        "Very Weak",
    };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword && password === confirmPassword;

  const benefits = [
    {
      icon: Target,
      title: "Personalized Goals",
      description: "Set and track your unique fitness objectives",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Detailed insights into your fitness journey",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your personal data stays protected",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Benefits */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Brand Header */}
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
                  Start Your
                  <span className="block bg-gradient-to-r from-[#ff2625] to-[#ff4444] bg-clip-text text-transparent">
                    Fitness Journey
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  Join thousands of fitness enthusiasts who are achieving their
                  goals with FitLab.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ff2625]/10 to-[#ff4444]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#ff2625]" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#ff2625] mb-1">
                  Free
                </div>
                <div className="text-sm text-gray-600">Forever Plan</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#ff2625] mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg order-1 lg:order-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="space-y-2 pb-6 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Get started with your personalized fitness experience
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
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
                        placeholder="Create a strong password"
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
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Password strength:
                          </span>
                          <span
                            className={`font-medium ${
                              passwordStrength.score >= 4
                                ? "text-green-600"
                                : passwordStrength.score >= 3
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {passwordStrength.label}
                          </span>
                        </div>
                        <Progress
                          value={passwordStrength.percentage}
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 pr-10 h-12 border-gray-200 focus-visible:ring-[#ff2625] focus-visible:border-[#ff2625] bg-gray-50/50 focus:bg-white transition-colors ${
                          confirmPassword && !passwordsMatch
                            ? "border-red-300 focus-visible:ring-red-500 focus-visible:border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>

                      {/* Password Match Indicator */}
                      {confirmPassword && (
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                          {passwordsMatch ? (
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-red-600 text-xs font-bold">
                                ×
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {confirmPassword && !passwordsMatch && (
                      <p className="text-xs text-red-600 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 text-[#ff2625] border-gray-300 rounded focus:ring-[#ff2625] mt-1"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#ff2625] hover:text-[#e01e20] font-medium"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[#ff2625] hover:text-[#e01e20] font-medium"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !passwordsMatch ||
                      !acceptTerms ||
                      passwordStrength.score < 3
                    }
                    className="w-full h-12 bg-gradient-to-r from-[#ff2625] to-[#ff4444] hover:from-[#e01e20] hover:to-[#e03333] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#ff2625] hover:text-[#e01e20] transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Protected by 256-bit SSL encryption</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
