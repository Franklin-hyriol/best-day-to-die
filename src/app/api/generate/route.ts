import { ai } from "@/lib/ai";
import { calculateDeathDate } from "@/lib/utils/date-helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { birthday, gender } = await req.json() as { birthday: string; gender: "male" | "female" };

        if (!birthday || !gender) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        // 1. Calculate the death date and check if it's in the past
        const deathDate = calculateDeathDate(birthday, 70, 100);
        const age = new Date(deathDate).getFullYear() - new Date(birthday).getFullYear();
        const isPast = new Date(deathDate) < new Date();

        // 2. Select the correct prompt based on the date
        let prompt;
        if (isPast) {
            prompt = `
                Tu es une IA à l'humour noir, très sarcastique.
                La "meilleure date pour mourir" d'une personne était le ${deathDate}, une date DÉJÀ PASSÉE.
                Ta tâche est de te moquer de la personne parce qu'elle est toujours en vie en 2 à 3 phrases percutantes.

                IMPORTANT : Inspire-toi des exemples de ton suivants, mais sois créatif et ne les répète pas mot pour mot.
                - "Mais qu'est-ce que tu fais encore ici ? Tu devrais être six pieds sous terre à l'heure qu'il est."
                - "Tu as raté ton plus beau jour pour mourir. Essaie de mourir dès que tu peux."

                Génère une nouvelle explication pour la personne suivante.
                - Adresse-toi à elle avec un ton familier (mec/meuf ou neutre).

                Données pour ta génération :
                - Genre: ${gender}
                - Date de naissance: ${birthday}
            `;
        } else {
            prompt = `
                Tu es une IA sarcastique, avec un humour noir et un ton très familier.
                La "meilleure date pour mourir" d'une personne est le ${deathDate}.
                Ta tâche est de générer une explication courte (2-3 phrases), drôle et percutante pour cette date.

                IMPORTANT : Inspire-toi des exemples suivants pour le ton et le style. Sois créatif.

                --- EXEMPLES ---
                Exemple 1 (pour un homme) :
                "Franchement mec, à cette date t’auras 94 piges. Tes genoux auront plus de souvenirs que ton cerveau. C’est un bon moment pour te dire que le boss final est prêt à te recevoir."

                Exemple 2 (pour une femme) :
                "Écoute meuf, ce jour-là t’auras survécu à trois pandémies et six nouvelles versions d’iPhone pliables. T’auras bien mérité le repos éternel, ou au moins une sieste de mille ans."

                Exemple 3 (neutre) :
                "Honnêtement, c’est pas mal comme timing. À 87 ans, t’auras enfin fini toutes les séries Netflix. Et crois-moi, le reboot de “Fast & Furious 28” n’en vaut pas la peine."
                --- FIN DES EXEMPLES ---

                Maintenant, génère une nouvelle explication pour la personne suivante.
                - N'utilise JAMAIS les exemples, crée une réponse originale.
                - Ne mentionne PAS la date dans ta réponse.
                - Si cela te semble pertinent, tu peux t'adresser à la personne en utilisant "mec" ou "meuf" selon son genre, ou adopter un ton neutre.

                Données pour ta génération :
                - Genre: ${gender}
                - Date de naissance: ${birthday}
                - Date de décès à justifier: ${deathDate}
                - Âge à la date de décès: ${age} ans
            `;
        }

        let textOutput: string;

        try {
            // 3. Ask the AI to generate ONLY the text
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            const aiText = response.text?.trim();

            if (!aiText) {
                throw new Error("AI returned empty text");
            }
            textOutput = aiText;

        } catch (aiError) {
            console.error("AI generation failed:", aiError);
            // Return an error if AI fails
            return NextResponse.json(
                { error: "Le voyant ne sait pas pourquoi c'est une bonne date pour mourir. Réessayez plus tard." },
                { status: 500 }
            );
        }

        // 5. Return the combined result
        return NextResponse.json({ date: deathDate, texte: textOutput });

    } catch (err) {
        console.error("Erreur /api/generate:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
