import {
	NotifierModelView,
	NotifierModelInteraction,
} from "@/lib/components/notifier/notifier-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function notifierVIInterface(): ViewInteractionInterface<
	NotifierModelView,
	NotifierModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "Notify": {
					const { text, variant } = interaction.input;
					return {
						variant,
						text,
						shown: true,
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
