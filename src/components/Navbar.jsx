import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Dumbbell,
  Menu,
  X,
  User,
  LogOut,
  Home,
  Calendar,
  Activity,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "../assets/images/Logo.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/exercises", label: "Exercises", icon: Activity },
    { to: "/planner", label: "Planner", icon: Calendar },
  ];

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center space-x-3 mr-8 hover:opacity-80 transition-opacity"
          onClick={closeMobileMenu}
        >
          <img
            src={logo}
            alt="FitLab Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-[#ff2625] to-[#ff4444] bg-clip-text text-transparent">
            FitLab
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        {user && (
          <nav className="hidden md:flex items-center justify-center space-x-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#ff2625]/10 text-[#ff2625] font-medium"
                        : "text-gray-600 hover:text-[#ff2625] hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        )}

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center space-x-2 px-3 py-2 hover:bg-gray-50"
                >
                  <Avatar className="h-8 w-8 bg-[#ff2625]">
                    <AvatarFallback className="text-white text-sm font-medium bg-[#ff2625]">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <NavLink to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-[#ff2625]"
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button
                  size="sm"
                  className="bg-[#ff2625] hover:bg-[#e01e20] text-white shadow-md"
                >
                  Sign Up
                </Button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-auto"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 pb-3 border-b">
                  <Avatar className="h-10 w-10 bg-[#ff2625]">
                    <AvatarFallback className="text-white font-medium bg-[#ff2625]">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Welcome back!
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Navigation Links */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-[#ff2625]/10 text-[#ff2625]"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Log out</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600"
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup" onClick={closeMobileMenu}>
                  <Button className="w-full bg-[#ff2625] hover:bg-[#e01e20] text-white">
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
