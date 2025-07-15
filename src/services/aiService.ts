import axios from "axios";

const API_KEY = process.env.REACT_APP_TOGETHER_API_KEY || "";
const BASE_URL = "https://api.together.xyz/v1/chat/completions";
const MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // veya başka bir Together destekli model

export const generateSummary = async (text: string): Promise<string> => {
  const response = await axios.post(
    BASE_URL,
    {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `Bu metni özetle: ${text}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};

export const generateTags = async (text: string): Promise<string[]> => {
  const response = await axios.post(
    BASE_URL,
    {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `Bu not için etiket önerileri üret (virgülle ayır): ${text}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const tagsRaw = response.data.choices[0].message.content;
  return tagsRaw
    .split(/[,#\n]/)
    .map((t: string) => t.trim())
    .filter(Boolean);
};
