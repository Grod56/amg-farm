"use client";

import Link from "next/link";
import { useSession } from "@/lib/third-party/clients/better-auth";
import { useRouter } from "next/navigation";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { authWidgetVIInterface } from "@/lib/implementations/models/auth-widget";
import Dropdown from "react-bootstrap/NavDropdown";

const AuthWidget = () => {
	const { data } = useSession();
	const router = useRouter();
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface(),
		{ shown: false, text: "", variant: "none" as const },
	);
	const { interact } = useInitializedStatefulInteractiveModel(
		authWidgetVIInterface(),
		{ notifier, router },
	);

	return data ? (
		<Dropdown
			className="uppercase text-sm text-white"
			title={`Hello, ${data.user.name.split(" ")[0]}`}
		>
			<Dropdown.Item
				onClick={() => {
					interact({ type: "SIGN_OUT", input: { router, notifier } });
				}}
			>
				Sign Out
			</Dropdown.Item>
		</Dropdown>
	) : (
		<Link
			className="text-decoration-none uppercase text-sm text-white hover:text-amber-200"
			href={`/sign-in`}
		>
			Sign In
		</Link>
	);
};
export default AuthWidget;
