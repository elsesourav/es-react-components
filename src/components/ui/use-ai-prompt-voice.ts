"use client";

import { useRef, useState } from "react";
import type { SpeechRecognizer } from "./ai-prompt-bar-types";

export function useAIPromptVoice({
  onTranscript,
  onFeedback,
}: {
  onTranscript: (text: string) => void;
  onFeedback: (msg: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognizer | null>(null);

  const toggleDictation = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const speechWindow = window as Window & {
      SpeechRecognition?: new () => SpeechRecognizer;
      webkitSpeechRecognition?: new () => SpeechRecognizer;
    };
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      onFeedback(
        "Dictation is unavailable in this browser. You can type your message instead."
      );
      return;
    }
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      onTranscript(text);
      onFeedback("Dictation added to your message.");
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
      onFeedback(
        "Dictation could not start. Check microphone access or type your message."
      );
    };
    try {
      recognition.start();
      setListening(true);
      onFeedback("Listening through your microphone…");
    } catch {
      setListening(false);
      onFeedback("Dictation is unavailable right now.");
    }
  };

  return { listening, toggleDictation };
}

export function useRainbowCelebration() {
  const glimmRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const celebrate = () => {
    const canvas = glimmRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);

    const startTime = performance.now();
    const duration = 650; // ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const w = rect.width;
      const h = rect.height;
      const beamWidth = Math.max(120, w * 0.45);
      const centerX = -beamWidth + (w + beamWidth * 2) * ease;
      const alpha = Math.sin(progress * Math.PI) * 0.55;

      const grad = ctx.createLinearGradient(centerX - beamWidth / 2, 0, centerX + beamWidth / 2, h);
      grad.addColorStop(0, "rgba(255, 60, 60, 0)");
      grad.addColorStop(0.15, `rgba(255, 75, 75, ${alpha})`);
      grad.addColorStop(0.3, `rgba(255, 175, 40, ${alpha * 1.1})`);
      grad.addColorStop(0.45, `rgba(255, 235, 60, ${alpha * 1.2})`);
      grad.addColorStop(0.6, `rgba(40, 220, 130, ${alpha * 1.1})`);
      grad.addColorStop(0.75, `rgba(30, 180, 255, ${alpha})`);
      grad.addColorStop(0.9, `rgba(180, 60, 255, ${alpha * 0.9})`);
      grad.addColorStop(1, "rgba(220, 60, 210, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  return { glimmRef, celebrate };
}
