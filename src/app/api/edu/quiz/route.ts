import { getItemById } from "@/lib/firebase/firestore";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const quiz = await getItemById("quizzes", id);

    if (quiz) {
        return Response.json(quiz);
    }
    return new Response("Nor found!", { status: 404 });
}
