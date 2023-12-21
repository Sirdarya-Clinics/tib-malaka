import { Metadata } from "next";
import LoginUI from "./ui";

export const metadata: Metadata = {
  title: "Login sahifasi",
  description: "Login sahifasi",
  // other metadata
};

export default function  LoginPage () {
  return (
    <>
    <LoginUI/>
    </>
  );
}
