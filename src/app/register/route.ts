import { generateRegister } from "@/lib/utilities/server-actions/register-pdf";
import BlobStream from "blob-stream";
import { NextRequest } from "next/server";
import { formatInTimeZone } from "date-fns-tz";
import { forbidden, redirect } from "next/navigation";
import { isAuthorized } from "@/lib/utilities/server-actions/auth";
import { headers } from "next/headers";
import { auth } from "../../../auth";

export async function GET(_: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session == null) return redirect(`/sign-in?endpoint=${"register"}`);

	const { user } = session;
	if (!(await isAuthorized(user))) return forbidden();

	const pdfStream = BlobStream();
	const registerNo = "003978";
	const title = "A & M CATTLE RANCHING REGISTER";
	const timeZone = "CAT";
	await generateRegister(pdfStream, timeZone, title, registerNo);
	const blob = pdfStream.toBlob();
	const timeGenerated = new Date();
	const timeGeneratedString = formatInTimeZone(
		new Date(),
		timeZone,
		"yyyy-MM-dd_HHmmss",
	);
	const fileName = `farm_register_${timeGeneratedString}.pdf`;
	const pdfFile = new File([blob], fileName, {
		lastModified: timeGenerated.getTime(),
	});
	return new Response(pdfFile, {
		status: 201,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${fileName}"`,
			"Content-Length": `${pdfFile.size}`,
		},
	});
}
