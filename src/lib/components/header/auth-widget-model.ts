import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NotifierModel } from "../notifier/notifier-model";

export interface AuthWidgetModelView {
	notifier: NotifierModel;
	router: AppRouterInstance;
}

export type AuthWidgetModelInteraction = InputModelInteraction<
	"SIGN_OUT",
	{ notifier: NotifierModel; router: AppRouterInstance }
>;

export type AuthWidgetModel = InteractiveModel<
	AuthWidgetModelView,
	AuthWidgetModelInteraction
>;
