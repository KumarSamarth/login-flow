"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsInstagram, BsGoogle, BsFacebook } from "react-icons/bs";
import { baseURL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {setAuthentication} from "../utils/auth"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)
        .then((res) => {
        setAuthentication(res.data.token)  
        toast.success("Login Successful");

        router.push("/");
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <div className="grid grid-cols-[1fr,30%]">
      <div className="grid place-items-center">
        <div className="text-center">
          <h1 className="text-accent font-bold text-5xl">
            Login to your account
          </h1>

          <div className="flex text-2xl pt-8 items-center gap-4 w-fit mx-auto">
            <div className="icon_wrapper">
              <BsFacebook />
            </div>
            <div className="icon_wrapper">
              <BsGoogle />
            </div>
            <div className="icon_wrapper">
              <BsInstagram />
            </div>
          </div>

          <p className="pt-8 text-[13px] ">
            Or use your email account for Login.
          </p>

          <form
            action=""
            className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              className="input__style"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="input__style"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="bg-accent px-4 py-2 text-white mt-4 hover:bg-[#3d8170]">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-accent h-screen grid place-items-center">
        <div className="w-full text-white text-center space-y-9">
          <h2 className="text-5xl font-bold">Hi Friends!</h2>
          <div className="text-[#eeeeee] ">
            <p>To keep connected with us please</p>
            <p>Please login with you personal info</p>

            <Link href="/signup">
              <button className="uppercase rounded-full px-4 py-2 border-2 mt-8 hover:bg-[#3d8170]">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
