import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useLoginMutation } from "@/services/features/auth/slice";
import {
  setCredentials,
  selectIsAuthenticated,
} from "@/store/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Form validation function
const validateForm = (values) => {
  const errors = {};

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// Initial form values
const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
  role: "systemadmin",
};

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <Field
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${Icon ? "pl-10" : "pl-3"}
            ${showPasswordToggle ? "pr-10" : "pr-3"}
          `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

// Checkbox Field Component
const CheckboxField = ({ label, name, ...props }) => {
  return (
    <div className="flex items-center mb-4">
      <Field
        id={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        {...props}
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

// Alert Component
const Alert = ({ type, message }) => {
  const baseClasses = "p-4 rounded-md flex items-center space-x-2 mb-4";
  const typeClasses = {
    success: "bg-green-50 text-green-800 border border-green-200",
    error: "bg-red-50 text-red-800 border border-red-200",
  };

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// Main Login Component
const SystemAdminLoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const from = '/admin/dashboard' || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setLoginSuccess(false);
      const result = await login(values).unwrap();
      // Simulate successful login
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
        })
      );
      setLoginSuccess(true);
      navigate("/admin/dashboard", { replace: true });
      console.log("Login successful:", result);
    } catch (err) {
      console.error("Login failed:", err);
      // Handle specific error cases
      if (err.status === 401) {
        setFieldError("email", "Invalid email or password");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          {loginSuccess && (
            <Alert
              type="success"
              message="Login successful! Redirecting to dashboard..."
            />
          )}

          {error && (
            <Alert
              type="error"
              message="Login failed. Please check your credentials and try again."
            />
          )}

          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleSubmit: formikHandleSubmit,
            }) => (
              <div className="space-y-6">
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  icon={Mail}
                />

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  icon={Lock}
                  showPasswordToggle={true}
                />

                <div className="flex items-center justify-between">
                  <CheckboxField label="Remember me" name="rememberMe" />

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={formikHandleSubmit}
                  disabled={isSubmitting || isLoading}
                  className={`
                    group relative w-full flex justify-center py-2 px-4 border border-transparent 
                    text-sm font-medium rounded-md text-white transition-colors
                    ${
                      isSubmitting || isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }
                  `}
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Demo credentials helper */}
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-600 text-center">
                    <strong>Demo:</strong> Use any email and password (min 6
                    chars)
                  </p>
                </div>
              </div>
            )}
          </Formik>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Protected by advanced security measures
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminLoginPage;
