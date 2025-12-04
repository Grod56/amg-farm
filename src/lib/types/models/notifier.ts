import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";
import { Notification } from "./notification";

export interface NotifierModelView<T> {
	notification: Notification<T> | null;
}

export type NotifierModelInteraction<T> =
	| InputModelInteraction<"NOTIFY", { notification: Notification<T> }>
	| ModelInteraction<"CLEAR">;

export type NotifierModel<T> = InitializedModel<
	InteractiveModel<NotifierModelView<T>, NotifierModelInteraction<T>>
>;
