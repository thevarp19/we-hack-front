import { getItemById } from "@/lib/firebase/firestore";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const course = await getItemById("courses", id);

    if (course) {
        return Response.json(course);
    }
    return new Response("Nor found!", { status: 404 });
}
