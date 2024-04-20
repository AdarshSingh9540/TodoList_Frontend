import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const response = await fetch("http://localhost:3001/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("User signed up successfully");
        // Redirect to the dashboard page upon successful signup
        navigate("/dashboard");
      } else {
        console.error("Failed to sign up:", await response.text());
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (

    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black items-center  justify-center flex flex-col mt-24  bg-slate-300">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to TodoApp
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 ">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="firstname">First name</label>
            <input
              id="firstname"
              type="text"
              className="p-1"
              placeholder="Adarsh"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="lastname">Last name</label>
            <input
             className="p-1"
              id="lastname"
              type="text"
              placeholder="Singh"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <label htmlFor="email">Email Address</label>
          <input
           className="p-1"
            id="email"
            type="email"
            placeholder="projectmayhem@fc.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <label htmlFor="password">Password</label>
          <input
           className="p-1"
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] p-1"
          type="submit"
        >
          Sign up &rarr;
        </button>
      </form>
    </div>
  );
}

export default SignUp;
