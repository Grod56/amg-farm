import {
	NotificationToastModelView,
	NotificationToastModelInteraction,
} from "@/lib/components/notification-toast/notification-toast-model";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function notificationToastVIInterface(
	notifier: NotifierModel<unknown>,
): ViewInteractionInterface<
	NotificationToastModelView,
	NotificationToastModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					return {
						...currentModelView,
						open: true,
					};
				}
				case "CLOSE": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const wasDisplayed = currentModelView.open;
					return {
						...currentModelView,
						open: false,
						wasDisplayed,
					};
				}
				case "CLEAR_NOTIFICATION": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					notifier.interact({ type: "CLEAR" });
					return {
						...currentModelView,
						open: false,
						wasDisplayed: false,
					};
				}
			}
		},
	};
}
