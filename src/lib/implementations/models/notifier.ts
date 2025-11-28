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
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "NOTIFY": {
					const { notification } = interaction.input;
					return {
						notification,
					};
				}
			}
		},
	};
}
