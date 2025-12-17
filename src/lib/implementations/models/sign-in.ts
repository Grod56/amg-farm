import {
	SignInModelInteraction,
	SignInModelView,
} from "@/app/sign-in/sign-in-model";
import { signIn } from "@/lib/third-party/clients/better-auth";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function signInVIInterface(
	successEndpoint: string,
): ViewInteractionInterface<SignInModelView, SignInModelInteraction> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "GOOGLE": {
					const { notifier } = interaction.input;
					await signIn.social(
						{
							provider: "google",
							callbackURL: `/${successEndpoint}`,
						},
						{
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
											text: "Redirecting you to Google sign-in shortly. Please wait...",
										},
									},
								});
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
					);
					return {
						notifier: interaction.input.notifier,
					};
				}
			}
		},
	};
}
