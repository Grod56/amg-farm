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
							onRequest: () => {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: { type: "pending" },
									},
								});
							},
							onSuccess: () => {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											type: "success",
										},
									},
								});
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
					);
					return {
						notifier: interaction.input.notifier,
					};
				}
			}
		},
	};
}
