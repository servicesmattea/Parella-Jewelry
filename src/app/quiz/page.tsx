"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, ShoppingBag, Check, Sparkles } from "lucide-react";
import { bracelets, getBraceletStoneHex } from "@/data/bracelets";
import { useCart } from "@/context/CartContext";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

type Option = {
  id: string;
  label: string;
  sub?: string;
  dot: string;
  scores: Partial<Record<string, number>>;
};

type Question = {
  id: string;
  question: string;
  sub: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "emotion",
    question: "Comment te sens-tu en ce moment ?",
    sub: "Laisse-toi guider par l'émotion du moment, sans réfléchir.",
    options: [
      {
        id: "calme",
        label: "J'ai besoin de calme et d'équilibre",
        dot: "#8E6BBF",
        scores: { domino: 3, aurore: 3, crepuscule: 3 },
      },
      {
        id: "energie",
        label: "Je cherche de l'énergie et de la motivation",
        dot: "#C1602E",
        scores: { terracotta: 3, grenadine: 2, ambre: 3, miel: 3 },
      },
      {
        id: "amour",
        label: "Je m'ouvre à la douceur et à l'amour",
        dot: "#E7B9C4",
        scores: { bouquet: 3, crepuscule: 2, domino: 1 },
      },
      {
        id: "protection",
        label: "Je veux me sentir ancrée et protégée",
        dot: "#3D3D40",
        scores: { eclipse: 3, mirage: 3, terracotta: 1 },
      },
      {
        id: "chance",
        label: "J'ai besoin d'un souffle de renouveau",
        dot: "#5E9E78",
        scores: { mousse: 3, confetti: 3, bouquet: 1 },
      },
    ],
  },
  {
    id: "couleur",
    question: "Quelle palette t'attire instinctivement ?",
    sub: "Laisse-toi guider par l'instinct, pas par la raison.",
    options: [
      {
        id: "noir-blanc",
        label: "Noir & blanc — graphique et intemporel",
        dot: "#2a1f18",
        scores: { domino: 3, eclipse: 2 },
      },
      {
        id: "chauds",
        label: "Tons chauds — orange, rouge, doré",
        dot: "#C1602E",
        scores: { terracotta: 3, ambre: 3, grenadine: 2, miel: 2 },
      },
      {
        id: "pastels",
        label: "Pastels & violets — doux et lumineux",
        dot: "#8E6BBF",
        scores: { aurore: 3, crepuscule: 2, bouquet: 2 },
      },
      {
        id: "verts",
        label: "Verts naturels — frais et organique",
        dot: "#5E9E78",
        scores: { mousse: 3, confetti: 2, bouquet: 1 },
      },
      {
        id: "cristal",
        label: "Transparent & cristallin — pur et épuré",
        dot: "#c9a96e",
        scores: { glacier: 3, mirage: 2, domino: 1 },
      },
    ],
  },
  {
    id: "intention",
    question: "Quelle intention veux-tu porter au quotidien ?",
    sub: "Pas de bonne ou mauvaise réponse — celle qui résonne, c'est la bonne.",
    options: [
      {
        id: "confiance",
        label: "Confiance — m'affirmer et avancer",
        dot: "#B6792A",
        scores: { terracotta: 3, ambre: 3, eclipse: 1 },
      },
      {
        id: "serenite",
        label: "Sérénité — apaiser mon mental",
        dot: "#8E6BBF",
        scores: { crepuscule: 3, aurore: 3, glacier: 2, mirage: 1 },
      },
      {
        id: "joie",
        label: "Joie — légèreté et bonne humeur",
        dot: "#E2B33C",
        scores: { grenadine: 3, confetti: 3, miel: 3 },
      },
      {
        id: "douceur",
        label: "Amour — douceur et connexion",
        dot: "#E7B9C4",
        scores: { bouquet: 3, crepuscule: 2, domino: 1 },
      },
      {
        id: "ancrage",
        label: "Protection — ancrage et équilibre",
        dot: "#3D3D40",
        scores: { eclipse: 3, mirage: 3, mousse: 1 },
      },
    ],
  },
  {
    id: "contexte",
    question: "Ce bracelet, c'est pour qui ?",
    sub: "Ça nous aide à affiner notre sélection pour toi.",
    options: [
      {
        id: "moi",
        label: "Pour moi — un moment de soin",
        sub: "Une attention à se faire à soi-même",
        dot: "#c4a882",
        scores: {},
      },
      {
        id: "offrir",
        label: "Pour offrir — un cadeau sincère",
        sub: "Un bijou choisi avec intention pour quelqu'un de spécial",
        dot: "#E7B9C4",
        scores: { bouquet: 2, eclipse: 1, ambre: 1 },
      },
      {
        id: "etape",
        label: "Pour marquer une étape importante",
        sub: "Un souvenir à porter au poignet d'un moment fort",
        dot: "#c9a96e",
        scores: { eclipse: 3, bouquet: 2, glacier: 1 },
      },
    ],
  },
];

/* ─── Scoring ──────────────────────────────────────────────────────────────── */

function computeResults(answers: string[]) {
  const scores: Record<string, number> = {};
  answers.forEach((optionId, qi) => {
    const option = QUESTIONS[qi]?.options.find((o) => o.id === optionId);
    if (!option) return;
    Object.entries(option.scores).forEach(([id, pts]) => {
      scores[id] = (scores[id] ?? 0) + (pts ?? 0);
    });
  });
  return bracelets
    .map((b) => ({ bracelet: b, score: scores[b.id] ?? 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/* ─── Animation variants ────────────────────────────────────────────────────── */

const slide = {
  initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
};

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function ResultCard({ bracelet, rank }: { bracelet: (typeof bracelets)[0]; rank: number }) {
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function handleAdd() {
    add({ id: bracelet.id, name: bracelet.name, price: bracelet.price, hex: getBraceletStoneHex(bracelet), kind: "bracelet" }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border ${rank === 0 ? "border-[var(--color-electric)]/30 ring-2 ring-[var(--color-electric)]/15" : "border-[var(--color-beige)]/30"}`}
    >
      {rank === 0 && (
        <div className="bg-[var(--color-electric)] text-white text-[11px] font-semibold tracking-widest uppercase text-center py-2">
          ✦ Ton bracelet idéal
        </div>
      )}
      <Link href={`/bracelets/${bracelet.id}`} className="block relative aspect-square overflow-hidden bg-[var(--color-cream)]">
        <Image
          src={bracelet.images[0]}
          alt={bracelet.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {bracelet.badge && (
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur text-[var(--color-beige-darker)] text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full">
            {bracelet.badge}
          </span>
        )}
      </Link>
      <div className="p-5">
        <p className="text-[10px] font-semibold tracking-widest text-[var(--color-electric)] uppercase mb-1">
          {bracelet.energy}
        </p>
        <h3 className="font-display text-xl text-[var(--color-beige-darker)]">{bracelet.name}</h3>
        <p className="text-xs text-[var(--color-beige-dark)] mt-1 mb-4 line-clamp-2">{bracelet.description}</p>
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-lg text-[var(--color-electric)]">{bracelet.price.toFixed(2)} €</span>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[var(--color-electric)] text-white text-xs font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
          >
            {added ? <Check size={14} /> : <ShoppingBag size={14} />}
            {added ? "Ajouté !" : "Ajouter"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function QuizPage() {
  const [step, setStep] = useState<"intro" | number | "results">("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [dir, setDir] = useState(1);

  const currentQ = typeof step === "number" ? QUESTIONS[step] : null;
  const results = step === "results" ? computeResults(answers) : [];

  function handleSelect(optionId: string) {
    const qi = step as number;
    const newAnswers = [...answers];
    newAnswers[qi] = optionId;
    setAnswers(newAnswers);
    setDir(1);
    setTimeout(() => {
      if (qi + 1 < QUESTIONS.length) {
        setStep(qi + 1);
      } else {
        setStep("results");
      }
    }, 180);
  }

  function restart() {
    setDir(-1);
    setAnswers([]);
    setStep("intro");
  }

  return (
    <div className="min-h-screen bg-[var(--color-sand)] flex flex-col">
      {/* Progress bar */}
      {typeof step === "number" && (
        <div className="fixed top-[108px] left-0 right-0 z-40 h-0.5 bg-[var(--color-beige)]/30">
          <motion.div
            className="h-full bg-[var(--color-electric)]"
            animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={dir}>

            {/* ── INTRO ── */}
            {step === "intro" && (
              <motion.div
                key="intro"
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-electric)]/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={28} className="text-[var(--color-electric)]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
                  4 questions
                </span>
                <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-beige-darker)] mt-3 text-balance">
                  Trouver le bracelet fait pour toi
                </h1>
                <p className="text-sm text-[var(--color-beige-dark)] mt-4 leading-relaxed max-w-sm mx-auto">
                  Réponds à quelques questions et on te suggère les créations Parella
                  qui résonnent le mieux avec ton énergie du moment.
                </p>
                <button
                  onClick={() => { setDir(1); setStep(0); }}
                  className="mt-8 inline-flex items-center gap-2 min-h-12 px-8 py-3.5 rounded-full bg-[var(--color-electric)] text-white text-sm font-semibold hover:bg-[var(--color-electric-dark)] transition-colors"
                >
                  Commencer <ArrowRight size={16} />
                </button>
                <p className="mt-4 text-xs text-[var(--color-beige-dark)]/50">Moins de 2 minutes</p>
              </motion.div>
            )}

            {/* ── QUESTION ── */}
            {typeof step === "number" && currentQ && (
              <motion.div
                key={`q-${step}`}
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Counter + back */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => { setDir(-1); setStep(step > 0 ? step - 1 : "intro"); }}
                    className="text-xs text-[var(--color-beige-dark)] hover:text-[var(--color-electric)] transition-colors"
                  >
                    ← Retour
                  </button>
                  <span className="text-xs font-medium text-[var(--color-beige-dark)]">
                    {step + 1} / {QUESTIONS.length}
                  </span>
                </div>

                {/* Dots */}
                <div className="flex gap-1.5 mb-7">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full flex-1 transition-all duration-400 ${i <= step ? "bg-[var(--color-electric)]" : "bg-[var(--color-beige)]/40"}`}
                    />
                  ))}
                </div>

                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-beige-darker)] mb-2 text-balance">
                  {currentQ.question}
                </h2>
                <p className="text-sm text-[var(--color-beige-dark)] mb-8">{currentQ.sub}</p>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt) => {
                    const selected = answers[step] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`w-full text-left flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${
                          selected
                            ? "border-[var(--color-electric)] bg-[var(--color-electric)]/5"
                            : "border-[var(--color-beige)]/30 bg-white hover:border-[var(--color-electric)]/40 hover:bg-white/80"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 mt-0.5 ring-2 ring-white shadow-sm"
                          style={{ background: opt.dot }}
                        />
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-[var(--color-beige-darker)]">
                            {opt.label}
                          </span>
                          {opt.sub && (
                            <span className="block text-xs text-[var(--color-beige-dark)] mt-0.5">
                              {opt.sub}
                            </span>
                          )}
                        </span>
                        <span className={`w-5 h-5 rounded-full shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors ${selected ? "border-[var(--color-electric)] bg-[var(--color-electric)]" : "border-[var(--color-beige)]/40"}`}>
                          {selected && <Check size={11} className="text-white" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── RESULTS ── */}
            {step === "results" && (
              <motion.div
                key="results"
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-electric)]/10 flex items-center justify-center mx-auto mb-5">
                    <Sparkles size={24} className="text-[var(--color-electric)]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-electric)]">
                    Tes résultats
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-beige-darker)] mt-2">
                    Voici tes bracelets Parella
                  </h2>
                  <p className="text-sm text-[var(--color-beige-dark)] mt-2">
                    Sélectionnés d'après tes réponses et les énergies qui t'ont attirée.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {results.map((r, i) => (
                    <ResultCard key={r.bracelet.id} bracelet={r.bracelet} rank={i} />
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/bracelets"
                    className="inline-flex items-center gap-2 min-h-11 px-7 py-3 rounded-full border-2 border-[var(--color-beige-darker)] text-[var(--color-beige-darker)] text-sm font-semibold hover:bg-[var(--color-beige-darker)] hover:text-white transition-colors"
                  >
                    Voir toute la collection
                  </Link>
                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-beige-dark)] hover:text-[var(--color-electric)] transition-colors"
                  >
                    <RefreshCw size={14} /> Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
