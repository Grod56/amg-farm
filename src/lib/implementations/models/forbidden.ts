import {
	ForbiddenModelView,
	ForbiddenModelInteraction,
} from "@/app/forbidden/forbidden-model";
import { signOut } from "@/lib/third-party/clients/better-auth";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function forbiddenVIInterface(): ViewInteractionInterface<
	ForbiddenModelView,
	ForbiddenModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "SIGN_OUT": {
					const { notifier, router } = interaction.input;
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
							onSuccess: async () => {
								await notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											type: "success",
											text: "You are now logged out. Please wait...",
										},
									},
								});
								router.push("/");
							},
							onError: async context => {
								await notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											type: "failure",
											text: `Error: ${context.error.message}`,
										},
									},
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
