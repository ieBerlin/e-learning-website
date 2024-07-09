import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "./AuthForm";
import { processLoginForm, processSignUpForm } from "../../utils/userService";
export default function AuthPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentMode, setCurrentMode] = useState(
    searchParams.get("mode") || "login"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!["login", "signup"].includes(currentMode)) {
      setCurrentMode("login");
      setSearchParams({ mode: "login" });
    }

    if (currentMode === "signup") {
      const stepParam = searchParams.get("step");
      if (!stepParam || !["1", "2"].includes(stepParam)) {
        navigate(`/auth?mode=${currentMode}&step=1`);
      }
    } else {
      navigate(`/auth?mode=${currentMode}`);
    }
  }, [currentMode, searchParams, navigate, setSearchParams]);

  async function handleSubmitForm(e, type) {
    e.preventDefault();
    const fd = new FormData(e.target);
    let userCrendetials;
    if (type === "signup") {
      userCrendetials = processSignUpForm(fd);
    } else {
      userCrendetials = processLoginForm(fd);
    }
    // mutate(userCrendetials);
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="h-full bg-blue w-full flex bg-blue-500" />
      {currentMode !== "signup" ? (
        <AuthForm
          isLoginMode
          onSubmitForm={(e) => handleSubmitForm(e, "login")}
        />
      ) : (
        <AuthForm onSubmitForm={(e) => handleSubmitForm(e, "signup")} />
      )}
    </div>
  );
}
