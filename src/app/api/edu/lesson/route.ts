import { getItemById } from "@/lib/firebase/firestore";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const lesson = await getItemById("lessons", id);

    if (lesson) {
        return Response.json(lesson);
    }
    return new Response("Nor found!", { status: 404 });
}
