import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchAuth } = useAuth();
  const { role } = useAuth();

  useEffect(() => {
    if (role) {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  const toggleView = () => {
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && data.success) {
        navigate("/otp");
      }
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && data.success) {
        await fetchAuth(); // refresh context state after login
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="relative w-[950px] h-[600px] bg-white rounded-4xl flex">
      <div className="w-1/2 h-full ">
        <div className="w-[200%] h-full flex transition-transform duration-700 ease-in-out">
          {/* Login form */}
          <div
            className={`w-1/2 h-full flex flex-col items-center pl-5 py-18 space-y-3 transition duration-[0.7s] ${
              isRegister ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-center w-full space-y-2">
              <h1 className="text-5xl font-bold">Login</h1>
              <p className="text-gray-500">
                Please enter your login details to access your account.
              </p>
            </div>
            <div className="w-full p-8 space-y-4">
              <div className="w-full space-y-2">
                <h1>Email</h1>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className="w-full rounded-xl px-5 py-3 bg-gray-700/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full space-y-2">
                <h1>Password</h1>
                <input
                  type="password"
                  className="w-full rounded-xl px-5 py-3 bg-gray-700/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center space-y-4">
                <p className="text-lg font-light underline cursor-pointer hover:decoration-indigo-900 hover:decoration-2 transition duration-300">
                  Forget Your Password?
                </p>
                <button
                  className="rounded-xl text-lg px-20 py-2 text-white font-medium bg-indigo-800 uppercase transition duration-300 hover:bg-indigo-900"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Register form */}
          <div
            className={`w-1/2 h-full flex flex-col items-center pl-5 py-18 space-y-3 transition duration-[0.7s] ${
              isRegister ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center w-full space-y-2">
              <h1 className="text-5xl font-bold">Create Account</h1>
              <p className="text-gray-500">
                Register now to create your personal account.
              </p>
            </div>
            <div className="w-full p-8 space-y-4">
              <div className="w-full space-y-2">
                <h1>Name</h1>
                <input
                  type="text"
                  className="w-full rounded-xl px-5 py-3 bg-gray-700/10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full space-y-2">
                <h1>Email</h1>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className="w-full rounded-xl px-5 py-3 bg-gray-700/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full space-y-2">
                <h1>Password</h1>
                <input
                  type="password"
                  className="w-full rounded-xl px-5 py-3 bg-gray-700/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="rounded-xl text-lg px-20 py-2 text-white font-medium bg-indigo-800 uppercase transition duration-300 hover:bg-indigo-900"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side panel */}
      <div
        className={` w-1/2 h-full flex flex-col justify-center items-center text-center space-y-3 p-5 transition-all duration-700 ease-in-out bg-indigo-900/90 rounded-4xl ${
          isRegister
            ? "-translate-x-full rounded-tr-[160px] rounded-br-[120px]"
            : "translate-x-0 rounded-tl-[160px] rounded-bl-[120px]"
        }`}
      >
        <h1 className="text-white text-5xl font-semibold">
          {isRegister ? "Welcome Back!" : "Hello, Welcome"}
        </h1>
        <p className="text-gray-200 text-lg mt-4">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account? Sign up now."}
        </p>
        <button
          onClick={toggleView}
          className="mt-6 rounded-xl text-lg border border-white px-10 py-2 text-white font-medium uppercase hover:text-black transition duration-300 hover:bg-white hover:border-black"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
