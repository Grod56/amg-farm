import {
	NotificationToastModelView,
	NotificationToastModelInteraction,
} from "@/lib/components/notification-toast/notification-toast-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function notificationToastVIInterface(): ViewInteractionInterface<
	NotificationToastModelView,
	NotificationToastModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "Notify": {
					const { currentModelView, notification } =
						interaction.input;
					const { notificationMap, notifier } = currentModelView;

					notifier.interact({
						type: "NOTIFY",
						input: {
							notification: {
								text: notification.text,
								type:
									notificationMap.get(notification.type) ??
									"info",
							},
						},
					});
					return {
						notifier,
						notificationMap,
						shown: notification?.type != "pending",
					};
				}
				case "Close": {
					return {
						...interaction.input.currentModelView,
						shown: false,
					};
				}
			}
		},
	};
}
