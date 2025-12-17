import {
	AuthWidgetDropdownModelView,
	AuthWidgetDropdownModelInteraction,
} from "@/lib/components/header/auth-widget/auth-widget-dropdown/auth-widget-dropdown-model";
import { AuthWidgetNotificationType } from "@/lib/components/header/auth-widget/auth-widget-model";
import { signOut } from "@/lib/third-party/clients/better-auth";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function authWidgetDropdownVIInterface(
	notifier: NotifierModel<AuthWidgetNotificationType>,
	router: AppRouterInstance,
): ViewInteractionInterface<
	AuthWidgetDropdownModelView,
	AuthWidgetDropdownModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "SIGN_OUT": {
					if (!currentModelView)
						throw new Error(
							"Cannot interact with uninitialized model",
						);
					await signOut({
						fetchOptions: {
							onRequest: async () => {
								await notifier.interact({
									type: "NOTIFY",
									input: {
										notification: { type: "pending" },
									},
								});
							},
							onSuccess: () => {
								router.push("/");
								router.refresh();
							},
							onError: async context => {
								await notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: context.error.message,
											type: "failure",
										},
									},
								});
							},
						},
					});
					return currentModelView;
				}
			}
		},
	};
}
