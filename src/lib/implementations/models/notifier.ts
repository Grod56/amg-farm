import {
	NotifierModelInteraction,
	NotifierModelView,
} from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function notifierVIInterface<T>(): ViewInteractionInterface<
	NotifierModelView<T>,
	NotifierModelInteraction<T>
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "NOTIFY": {
					const { notification } = interaction.input;
					return {
						notification,
					};
				}
				case "CLEAR": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { notification } = currentModelView;
					if (!notification)
						throw new Error("Cannot clear null notification");
					return {
						notification: { ...notification, cleared: true },
					};
				}
			}
		},
	};
}
