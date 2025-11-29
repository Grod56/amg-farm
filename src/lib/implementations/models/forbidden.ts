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
							onRequest: () => {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: { type: "pending" },
									},
								});
							},
							onSuccess: () => {
								router.push("/");
							},
							onError: context => {
								notifier.interact({
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
					return {
						notifier,
						router,
					};
				}
			}
		},
	};
}
