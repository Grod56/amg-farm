import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export type Variant = "success" | "failure" | "default";

export interface NotifierModelView {
	text: string;
	shown: boolean;
	variant: Variant;
}

export type NotifierModelInteraction =
	| InputModelInteraction<"Notify", { text: string; variant: Variant }>
	| InputModelInteraction<"Close", { currentModelView: NotifierModelView }>;

export type NotifierModel = InteractiveModel<
	NotifierModelView,
	NotifierModelInteraction
>;
