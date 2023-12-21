import { Metadata } from "next";
import BackendPage from "./AdminUI";
import { HeaderAdmin } from "@/components/Header";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin sahifasi",
  // other metadata
};
export default function AdminPage() {
    return(<>
    <HeaderAdmin/>
   <BackendPage/>
    </>)
}