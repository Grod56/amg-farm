"use server";

import neon from "@/lib/third-party/clients/neon";
import { User } from "better-auth";
import { headers } from "next/headers";
import { forbidden, redirect } from "next/navigation";
import { auth } from "../../../../auth";

export async function isAuthorized(user: User) {
	const results =
		await neon()`SELECT * FROM "UserRole" WHERE user_email = ${user.email}`;
	if (results.rowCount != 0) {
		return true;
	}
	return false;
}

export async function getProtectedResource<T>(
	resource: () => T,
	resourceEndpoint: string,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session == null)
		return redirect(`/sign-in?endpoint=${resourceEndpoint}`);

	const { user } = session;
	if (await isAuthorized(user)) {
		return resource();
	}
	forbidden();
}
