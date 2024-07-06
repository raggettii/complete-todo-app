import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "../functions/debounce";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Submit } from "../components/Submit";
import { BottomWarning } from "../components/BottomWarning";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const MIN_LENGTH = 6;

  const debouncedCheckUsername = useCallback(
    debounce((value) => {
      setUsernameError(
        value.length < MIN_LENGTH
          ? "Username must be at least 6 characters long"
          : ""
      );
    }, 300),
    []
  );

  const debouncedCheckPassword = useCallback(
    debounce((value) => {
      setPasswordError(
        value.length < MIN_LENGTH
          ? "Password must be at least 6 characters long"
          : ""
      );
    }, 300),
    []
  );

  const handleInputChange = (setter, validator) => (e) => {
    const { value } = e.target;
    setter(value);
    validator(value); // Call the debounced validator
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://complete-todo-app.onrender.com/api/v1/user/signup",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      );
      alert(response.data.msg);
      navigate("/signin");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="bg-red-100 h-screen flex justify-center">
      <div className="flex flex-col justify center">
        <div className="p-4 m-4 w-80 h-max text-center bg-red-300 bg-opacity-50 border-red-500 rounded shadow-lg opacity-75">
          <Heading label={"Sign Up"} />
          <SubHeading data={"Create your account to get started."} />
          <InputBox
            onChange={handleInputChange(setFirstName, () => {})}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={handleInputChange(setLastName, () => {})}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={handleInputChange(setUsername, debouncedCheckUsername)}
            label={"Username"}
            placeholder={"john.doe"}
          />
          {usernameError && (
            <p className="text-red-500 text-sm">{usernameError}</p>
          )}
          <InputBox
            onChange={handleInputChange(setEmail, () => {})}
            label={"Email"}
            placeholder={"john.doe@gmail.com"}
          />
          <InputBox
            onChange={handleInputChange(setPassword, debouncedCheckPassword)}
            label={"Password"}
            placeholder={"Password"}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <Submit onClick={handleSignUp} text={"Submit"} />
          <BottomWarning
            label={"Already have an account?"}
            kindOf={" Signin"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export { SignUp };
