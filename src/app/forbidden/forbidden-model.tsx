import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type NotificationType = "pending" | "success" | "failure";

export interface ForbiddenModelView {
	notifier: NotifierModel<NotificationType>;
	router: AppRouterInstance;
}

export type ForbiddenModelInteraction = InputModelInteraction<
	"SIGN_OUT",
	{ notifier: NotifierModel<NotificationType>; router: AppRouterInstance }
>;

export type ForbiddenModel = InitializedModel<
	InteractiveModel<ForbiddenModelView, ForbiddenModelInteraction>
>;
