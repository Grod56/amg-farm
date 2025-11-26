import { NotifierModel } from "@/lib/components/notifier/notifier-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ForbiddenModelView {
	notifier: NotifierModel;
	router: AppRouterInstance;
}

export type ForbiddenModelInteraction = InputModelInteraction<
	"SIGN_OUT",
	{ notifier: NotifierModel; router: AppRouterInstance }
>;

export type ForbiddenModel = InteractiveModel<
	ForbiddenModelView,
	ForbiddenModelInteraction
>;
