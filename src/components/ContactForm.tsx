import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpwzgvqk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl mx-auto mt-10 space-y-4 text-left"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
        />
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-primary bg-primary/10 border border-primary/20 rounded-xl px-4 py-3"
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          Message sent! I'll get back to you soon.
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please email me directly.
        </motion.div>
      )}

      <Button
        type="submit"
        disabled={status === "sending" || status === "success"}
        size="lg"
        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow rounded-full"
      >
        {status === "sending" ? (
          <span className="flex items-center gap-2">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" /> Send Message
          </span>
        )}
      </Button>
    </motion.form>
  );
};
