import neon from "@/lib/third-party/clients/neon";
import { User } from "better-auth";

export async function isAuthorized(user: User) {
	const results =
		await neon()`SELECT * FROM "UserRole" WHERE user_email = ${user.email}`;
	if (results.rowCount != 0) {
		return true;
	}
	return false;
}
