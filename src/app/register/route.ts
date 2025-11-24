import { generateRegister } from "@/lib/utilities/server-actions/register-pdf";
import BlobStream from "blob-stream";
import { NextRequest } from "next/server";
import { formatInTimeZone } from "date-fns-tz";

export async function GET(_: NextRequest) {
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
