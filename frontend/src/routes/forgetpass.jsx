// Di route file untuk forgot-password
import { createFileRoute } from "@tanstack/react-router";
import ForgetPass from "../components/forgetpass";

export const Route = createFileRoute("/forgetpass")({
  component: ForgetPass,
});
