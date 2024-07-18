import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "./AuthForm";
import { processLoginForm, processSignUpForm } from "../../utils/userService";
import logoImage from "/icon.png";
export default function AuthPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentMode, setCurrentMode] = useState(
    searchParams.get("mode") || "login"
  );
const isSubmitting = true 
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
      <div className=" bg-rose-400 flex flex-col w-full items-center justify-center">
        <div className="w-1/2">
          <img src={logoImage} className="w-full" alt="" />
          <h2 className="font-semibold text-xl text-center text-gray-950">
            Unlock the full potential of your language learning experience.
          </h2>
          <p className="text-rose-950 font-semibold">
            Ready to continue learning? Log in now!{" "}
          </p>
        </div>
      </div>
      {currentMode !== "signup" ? (
        <AuthForm
          isLoading={isSubmitting}
          isLoginMode
          onSubmitForm={(e) => handleSubmitForm(e, "login")}
        />
      ) : (
        <AuthForm
          isLoading={isSubmitting}
          onSubmitForm={(e) => handleSubmitForm(e, "signup")}
        />
      )}
    </div>
  );
}
