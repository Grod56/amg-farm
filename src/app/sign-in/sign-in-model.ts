import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export type SignInNotificationType = "success" | "failure" | "pending";

export interface SignInModelView {
	notifier: NotifierModel<SignInNotificationType>;
}

export type SignInModelInteraction = InputModelInteraction<
	"GOOGLE",
	{ notifier: NotifierModel<SignInNotificationType> }
>;

export type SignInModel = InitializedModel<
	InteractiveModel<SignInModelView, SignInModelInteraction>
>;
