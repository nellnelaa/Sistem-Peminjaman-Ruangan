// Di route file untuk register
import { createFileRoute } from "@tanstack/react-router";
import Register from "../components/register";

export const Route = createFileRoute("/register")({
  component: Register,
});
