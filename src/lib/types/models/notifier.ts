import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { Notification } from "../miscellaneous";

export interface NotifierModelView<T> {
	notification: Notification<T> | null;
}

export type NotifierModelInteraction<T> = InputModelInteraction<
	"NOTIFY",
	{ notification: Notification<T> }
>;

export type NotifierModel<T> = InitializedModel<
	InteractiveModel<NotifierModelView<T>, NotifierModelInteraction<T>>
>;
