import { addItemToArrayField, saveItem } from "@/lib/firebase/firestore";

export async function POST(req: Request, res: Response) {
    const body = await req.json();

    const courseId = await saveItem("courses", body);

    if (courseId) {
        return new Response("Success!", { status: 200 });
    }
    return new Response("Bad request!", { status: 400 });
}

export async function PUT(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);

    const courseId = searchParams.get("courseId") || "";
    const lessonId = searchParams.get("lessonId") || "";

    try {
        await addItemToArrayField("courses", courseId, "lessonIds", lessonId);
        return new Response("Success!", { status: 200 });
    } catch (e) {
        return new Response("Bad request!", { status: 400 });
    }
}
