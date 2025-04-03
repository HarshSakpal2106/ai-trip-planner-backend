import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { userInput, userBudget, userDestination, numberPeople, numberDays, startDate, tripVibe, activities } = req.body;

        const prompt = `Plan a trip to ${userDestination} with a budget of ${userBudget}. 
        It is a ${tripVibe} trip for ${numberPeople} people, lasting ${numberDays} days, starting on ${startDate}. 
        The user wants to include these activities: ${activities}.`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`,
            {
                prompt: { text: prompt },
            }
        );

        res.json({ itinerary: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating itinerary" });
    }
              }
