import {
	AuthWidgetModelView,
	AuthWidgetModelInteraction,
} from "@/lib/components/header/auth-widget-model";
import { signOut } from "@/lib/third-party/clients/better-auth";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function authWidgetVIInterface(): ViewInteractionInterface<
	AuthWidgetModelView,
	AuthWidgetModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "SIGN_OUT": {
					const { notifier, router } = interaction.input;
					await signOut({
						fetchOptions: {
							onRequest: () => {
								notifier.interact({
									type: "Notify",
									input: { text: "", variant: "pending" },
								});
							},
							onSuccess: () => {
								router.push("/");
							},
							onError: () => {
								notifier.interact({
									type: "Notify",
									input: { text: "", variant: "none" },
								});
							},
						},
					});
					return {
						notifier,
						router,
					};
				}
			}
		},
	};
}
