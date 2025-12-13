"use client";

import { authWidgetDropdownVIInterface } from "@/lib/implementations/models/auth-widget-dropdown";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	AuthWidgetModel,
	AuthWidgetNotificationType,
} from "./auth-widget-model";
import { ModeledVoidComponent } from "@mvc-react/components";
import AuthWidgetDropdown from "./auth-widget-dropdown/AuthWidgetDropdown";

const AuthWidget = function ({ model }) {
	const { user } = model.modelView;
	const router = useRouter();
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<AuthWidgetNotificationType>(),
		{ notification: null },
	);
	const authWidgetDropdown = useInitializedStatefulInteractiveModel(
		authWidgetDropdownVIInterface(notifier, router),
		{ user },
	);

	return user ? (
		<AuthWidgetDropdown
			model={{
				...authWidgetDropdown,
				modelView: { ...authWidgetDropdown.modelView, user },
			}}
		/>
	) : (
		<Link
			className="text-decoration-none uppercase text-sm text-white hover:text-orange-300!"
			href={`/sign-in`}
		>
			Sign In
		</Link>
	);
} as ModeledVoidComponent<AuthWidgetModel>;
export default AuthWidget;
