import { getProtectedResource } from "@/lib/utilities/server-actions/auth";
import { NextRequest } from "next/server";
import { getRegisterPDF } from "./server-actions";

export async function GET(_: NextRequest) {
	return getProtectedResource(() => getRegisterPDF(), "register");
}
