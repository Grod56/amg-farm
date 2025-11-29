"use client";

import { authWidgetVIInterface } from "@/lib/implementations/models/auth-widget";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { useSession } from "@/lib/third-party/clients/better-auth";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "react-bootstrap/NavDropdown";
import { AuthWidgetNotificationType } from "./auth-widget-model";

const AuthWidget = () => {
	const { data } = useSession();
	const router = useRouter();
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<AuthWidgetNotificationType>(),
		{ notification: null },
	);
	const { interact } = useInitializedStatefulInteractiveModel(
		authWidgetVIInterface(),
		{ notifier, router },
	);

	return data ? (
		<Dropdown
			className="uppercase text-sm text-white hover:text-orange-300!"
			title={`Hello, ${data.user.name.split(" ")[0]}`}
			menuVariant="dark"
		>
			<Dropdown.Item
				className="capitalize text-white text-sm"
				onClick={() => {
					interact({
						type: "SIGN_OUT",
						input: { router, notifier },
					});
				}}
			>
				Sign Out
			</Dropdown.Item>
		</Dropdown>
	) : (
		<Link
			className="text-decoration-none uppercase text-sm text-white hover:text-orange-300!"
			href={`/sign-in`}
		>
			Sign In
		</Link>
	);
};
export default AuthWidget;
