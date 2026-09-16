import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import sgMail from "@sendgrid/mail";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  // Email API route
  app.post("/api/send-booking", async (req, res) => {
    const { name, email, topic, selectedTime, message } = req.body;

    if (!process.env.SENDGRID_API_KEY || !process.env.NOTIFICATION_EMAIL) {
      console.error("SendGrid environment variables are missing");
      return res.status(500).json({ success: false, error: "Configuration error" });
    }

    try {
      await sgMail.send({
        from: "infokarimganj@gmail.com", // SendGrid requires a verified sender email
        replyTo: email,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Portfolio Booking Request: ${name}`,
        text: `
          New Booking Request:
          Name: ${name}
          Email: ${email}
          Topic: ${topic}
          Time Slot: ${selectedTime}
          Message: ${message}
        `,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  });

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
