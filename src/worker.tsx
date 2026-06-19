import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { authRoutes } from "@/app/auth/routes";
import { setCommonHeaders } from "@/app/headers";
import { Dashboard } from "@/app/pages/dashboard";
import { Home } from "@/app/pages/home";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  ...authRoutes,
  render(Document, [route("/", Home), route("/dashboard", Dashboard)]),
]);
