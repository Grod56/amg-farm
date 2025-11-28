import { Notification } from "@/lib/types/miscellaneous";
import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export type ToastNotificationType = "success" | "failure" | "info";
export interface NotificationToastModelView {
	notificationMap: Map<unknown, ToastNotificationType>;
	notifier: NotifierModel<unknown>;
	shown: boolean;
}

export type NotificationToastModelInteraction =
	| InputModelInteraction<
			"Notify",
			{
				notification: Notification<unknown>;
				currentModelView: NotificationToastModelView;
			}
	  >
	| InputModelInteraction<
			"Close",
			{ currentModelView: NotificationToastModelView }
	  >;

export type NotificationToastModel = InitializedModel<
	InteractiveModel<
		NotificationToastModelView,
		NotificationToastModelInteraction
	>
>;
