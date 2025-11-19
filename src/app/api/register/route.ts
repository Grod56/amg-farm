import { generateRegister } from "@/lib/utilities/server-actions/register-pdf";
import BlobStream from "blob-stream";
import { NextRequest } from "next/server";
import { toZonedTime } from "date-fns-tz";

export async function GET(_: NextRequest) {
	const pdfStream = BlobStream();
	await generateRegister(pdfStream);
	const blob = pdfStream.toBlob();
	const timeGenerated = toZonedTime(new Date(), "CAT");
	const fileName = `farm_register_${timeGenerated.toISOString()}.pdf`;
	const pdfFile = new File([blob], fileName, {
		lastModified: timeGenerated.getTime(),
	});
	return new Response(pdfFile, {
		status: 201,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `inline; filename="${fileName}"`,
			"Content-Length": `${pdfFile.size}`,
		},
	});
}
