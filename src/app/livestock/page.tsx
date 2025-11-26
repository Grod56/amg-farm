import { headers } from "next/headers";
import { forbidden, redirect } from "next/navigation";
import { auth } from "../../../auth";
import { isAuthorized } from "@/lib/utilities/server-actions/auth";
import Livestock from "./Livestock";

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session == null) return redirect(`/sign-in?endpoint=${"livestock"}`);

	const { user } = session;
	if (await isAuthorized(user)) {
		return <Livestock />;
	}
	forbidden();
}
