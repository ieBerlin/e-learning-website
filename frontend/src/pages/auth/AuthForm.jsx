import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import InfoWithLinkButton from "../../components/InfoWithLinkButton";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
export default function AuthForm({ isLoginMode, onSubmitForm, error = [] }) {
  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50 items-center justify-center min-h-screen">
      <form onSubmit={onSubmitForm} className="w-full flex flex-col gap-2">
        <Input placeholder="Enter Your Email" type="email" name="email" />
        {isLoginMode ? (
          <>
            <PasswordInput
              id="password"
              placeholder="Enter Your Password"
              name="password"
              required
            />
            {Object.entries(error).map(([key, value]) => (
              <ErrorMessage key={key} title={key} message={value} />
            ))}

            <Button label="Login" type="submit" isLoading={true} />
          </>
        ) : (
          <>
            <Input
              placeholder="Enter Your First Name"
              type="text"
              name="first-name"
            />
            <Input
              placeholder="Enter Your Last Name"
              type="text"
              name="last-name"
            />
            <PasswordInput
              id="password"
              placeholder="Enter Your Password"
              name="password"
              required
            />
            <PasswordInput
              id="confirm-password"
              placeholder="Enter Your confirmed Password"
              name="confirm-password"
              required
            />
            {Object.entries(error).map(([key, value]) => (
              <ErrorMessage key={key} title={key} message={value} />
            ))}

            <Button label="Sign Up" type="submit" />
          </>
        )}
      </form>
      {isLoginMode ? (
        <InfoWithLinkButton label="New ?" link="signup" buttonText="Sign Up" />
      ) : (
        <InfoWithLinkButton
          label="Already Have An Account ?"
          link="login"
          buttonText="Login"
        />
      )}
    </div>
  );
}
