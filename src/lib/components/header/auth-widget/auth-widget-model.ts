import { ReadonlyModel } from "@mvc-react/mvc";
import { User } from "better-auth";

export type AuthWidgetNotificationType = "success" | "failure" | "pending";

export interface AuthWidgetModelView {
	user: User | null;
}

export type AuthWidgetModel = ReadonlyModel<AuthWidgetModelView>;
