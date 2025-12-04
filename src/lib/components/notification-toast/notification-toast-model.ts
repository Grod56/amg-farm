import { Notification } from "@/lib/types/models/notification";
import {
	InitializedModel,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export type ToastNotificationType = "success" | "failure" | "info";
export interface NotificationToastModelView {
	typeToToastTypeMap: Map<unknown, ToastNotificationType>;
	notification: Notification<unknown> | null;
	open: boolean;
	wasDisplayed: boolean;
}

export type NotificationToastModelInteraction =
	| ModelInteraction<"OPEN">
	| ModelInteraction<"CLOSE">
	| ModelInteraction<"CLEAR_NOTIFICATION">;

export type NotificationToastModel = InitializedModel<
	InteractiveModel<
		NotificationToastModelView,
		NotificationToastModelInteraction
	>
>;
