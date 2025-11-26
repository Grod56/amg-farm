import { NotifierModel } from "@/lib/components/notifier/notifier-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface SignInModelView {
	notifier: NotifierModel;
}

export type SignInModelInteraction = InputModelInteraction<
	"GOOGLE",
	{ notifier: NotifierModel }
>;

export type SignInModel = InteractiveModel<
	SignInModelView,
	SignInModelInteraction
>;
