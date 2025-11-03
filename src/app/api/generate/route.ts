import { ai } from "@/lib/ai";
import { NextResponse } from "next/server";

// Génération fallback si Gemini renvoie un texte invalide
function fallbackGenerate(birthDate: string, gender: "male" | "female") {
    const birth = new Date(birthDate);
    const min = 70, max = 100;
    const age = Math.floor(Math.random() * (max - min + 1)) + min;
    const death = new Date(birth);
    death.setFullYear(birth.getFullYear() + age);
    const yyyy = death.getFullYear();
    const mm = String(death.getMonth() + 1).padStart(2, "0");
    const dd = String(death.getDate()).padStart(2, "0");
    const date = `${yyyy}-${mm}-${dd}`;

    const intro = gender === "male" ? "Franchement mec" : "Écoute meuf";
    const jokes = [
        `à ${age} ans, même ton dos aura rendu les armes.`,
        `à ${age} ans, tu seras plus vintage que ton premier téléphone.`,
        `à ${age} ans, se lever d'une chaise sera une quête épique.`,
    ];
    const texte = `${intro}, ${jokes[Math.floor(Math.random() * jokes.length)]}`;
    return { date, texte };
}

export async function POST(req: Request) {
    try {
        const { birthday, gender } = await req.json() as { birthday: string; gender: "male" | "female" };

        if (!birthday || !gender) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const prompt = `
            Tu es une IA sarcastique et drôle. 
            Prédit "le meilleur jour pour mourir" d'une personne en te basant sur sa date de naissance.
            Réponds STRICTEMENT en JSON avec ce format exact :
            { "date": "AAAA-MM-JJ", "texte": "ton message humoristique en français" }

            Contraintes :
            - Le champ "date" doit être une date future comprise entre 70 et 100 ans après la date de naissance fournie.
            - "texte" doit être court (2-4 phrases max), complice, drôle, et utiliser "mec" ou "meuf" selon le genre.
            Données :
            Genre: ${gender}
            Date de naissance: ${birthday}
            `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // ou "gemini-2.0-flash-001"
            contents: prompt,
        });

        // Récupération du texte
        const textOutput = response.text ?? "";

        try {
            const parsed = JSON.parse(textOutput);
            if (parsed?.date && parsed?.texte) return NextResponse.json(parsed);
            else return NextResponse.json(fallbackGenerate(birthday, gender));
        } catch {
            return NextResponse.json(fallbackGenerate(birthday, gender));
        }
    } catch (err) {
        console.error("Erreur /api/generate:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
