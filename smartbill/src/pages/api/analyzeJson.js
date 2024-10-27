// src/pages/api/analyzeJson.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Assume your Flask backend can process a file and description via FormData
      const response = await fetch(
        "http://localhost:5000/your-flask-endpoint",
        {
          method: "POST",
          body: req.body, // Send the formData directly
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error connecting to Flask backend:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch data from Flask backend" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
