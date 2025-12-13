import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type AuthWidgetNotificationType = "success" | "failure" | "pending";

export interface AuthWidgetModelView {
	notifier: NotifierModel<AuthWidgetNotificationType>;
}

export type AuthWidgetModelInteraction = InputModelInteraction<
	"SIGN_OUT",
	{
		notifier: NotifierModel<AuthWidgetNotificationType>;
		router: AppRouterInstance;
	}
>;

export type AuthWidgetModel = InitializedModel<
	InteractiveModel<AuthWidgetModelView, AuthWidgetModelInteraction>
>;
