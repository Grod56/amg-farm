import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import SignIn from "./SignIn";

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session == null) {
		return <SignIn />;
	}
	redirect("/");
}
