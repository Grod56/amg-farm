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
					if (notification)
						// throw new Error("Cannot clear null notification"); //TODO: To be fixed
						return {
							notification: { ...notification, cleared: true },
						};
					return {
						notification: {
							cleared: true,
							text: undefined,
							type: undefined as T,
						},
					};
				}
			}
		},
	};
}
