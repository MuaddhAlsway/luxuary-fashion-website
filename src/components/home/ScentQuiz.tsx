import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../../hooks/useLocale";
import { products } from "../../data/products";

const MoonIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
  </svg>
);

const FeatherIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M20 16l-4-4 4-4" />
    <path d="M4 8l4 4-4 4" />
    <path d="M16 4l-4 4-4-4" />
    <path d="M8 20l4-4 4 4" />
  </svg>
);

const SunsetIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M17 18a5 5 0 0 0-10 0" />
    <line x1="12" y1="9" x2="12" y2="2" />
    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
    <line x1="1" y1="18" x2="3" y2="18" />
    <line x1="21" y1="18" x2="23" y2="18" />
    <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
    <line x1="23" y1="22" x2="1" y2="22" />
    <line x1="16" y1="5" x2="19" y2="2" />
    <line x1="8" y1="5" x2="5" y2="2" />
  </svg>
);

const TreeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 2L6 10h3l-3 6h4l-3 6h8l-3-6h4l-3-6h3L12 2z" />
  </svg>
);

const FlowerIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" />
    <path d="M19.07 4.93a4 4 0 0 1-5.66 5.66" />
    <path d="M22 12a4 4 0 0 1-8 0" />
    <path d="M19.07 19.07a4 4 0 0 1-5.66-5.66" />
    <path d="M12 22a4 4 0 0 1 0-8" />
    <path d="M4.93 19.07a4 4 0 0 1 5.66-5.66" />
    <path d="M2 12a4 4 0 0 1 8 0" />
    <path d="M4.93 4.93a4 4 0 0 1 5.66 5.66" />
  </svg>
);

const MaskIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 4C7 4 3 8 3 12s4 8 9 8c2 0 4-1 5-2" />
    <path d="M21 12c0-4-4-8-9-8" />
    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    <path d="M10 15c.5.8 1.2 1 2 1s1.5-.2 2-1" />
  </svg>
);

const CandleIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="8" y="10" width="8" height="12" rx="1" />
    <path d="M12 10V7" />
    <path d="M12 7c-1-2 0-4 1-4s2 2 1 4" />
    <line x1="8" y1="3" x2="16" y2="3" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 22c4-2 8-6 8-12-3 3-6 3-8 0-2 3-5 3-8 0 0 6 4 10 8 12z" />
    <path d="M12 22c-2-1-4-3-4-6 1.5 1.5 3 1.5 4 0-1 2-2.5 2-4 0 .5 3 2 6 4 6z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const questions = [
  {
    key: "mood",
    label: "What mood do you gravitate toward?",
    options: [
      { value: "mysterious", label: "Mysterious & Dark", icon: MoonIcon },
      { value: "radiant", label: "Radiant & Warm", icon: SunIcon },
      { value: "wild", label: "Wild & Untamed", icon: LeafIcon },
      { value: "ethereal", label: "Ethereal & Soft", icon: FeatherIcon },
    ],
  },
  {
    key: "season",
    label: "Which season feels like you?",
    options: [
      { value: "winter", label: "Winter Nights", icon: SnowflakeIcon },
      { value: "summer", label: "Summer Golden Hour", icon: SunsetIcon },
      { value: "autumn", label: "Autumn Forest", icon: TreeIcon },
      { value: "spring", label: "Spring Blossom", icon: FlowerIcon },
    ],
  },
  {
    key: "evening",
    label: "Your ideal evening?",
    options: [
      { value: "gala", label: "Black-Tie Gala", icon: MaskIcon },
      { value: "dinner", label: "Candlelit Dinner", icon: CandleIcon },
      { value: "bonfire", label: "Desert Bonfire", icon: FireIcon },
      { value: "moonlight", label: "Moonlit Garden", icon: StarIcon },
    ],
  },
];

const recommendationMap: Record<string, string> = {
  "mysterious-winter-gala": "velvet-noir",
  "mysterious-winter-dinner": "terre-sauvage",
  "mysterious-autumn-bonfire": "terre-sauvage",
  "radiant-summer-dinner": "soleil-dor",
  "radiant-spring-moonlight": "soleil-dor",
  "wild-autumn-bonfire": "terre-sauvage",
  "wild-winter-gala": "rose-absolue",
  "ethereal-spring-moonlight": "lune-blanche",
  "ethereal-summer-gala": "lune-blanche",
};

function getRecommendation(answers: Record<string, string>) {
  const key = `${answers.mood}-${answers.season}-${answers.evening}`;
  return recommendationMap[key] || "soleil-dor";
}

export default function ScentQuiz() {
  const { localizePath } = useLocale();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 500);
    } else {
      setTimeout(() => {
        setResult(getRecommendation(newAnswers));
      }, 500);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const product = products.find((p) => p.id === result);
    if (!product) return null;
    return (
      <section
        className="section-padding text-center"
        style={{ backgroundColor: "var(--color-deep)" }}
      >
        <div className="max-w-lg mx-auto">
          <div
            className="w-20 h-px mx-auto mb-10"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <p
            className="text-label mb-6 tracking-[0.4em]"
            style={{ color: "var(--color-accent)" }}
          >
            Your Signature Fragrance
          </p>
          <div
            className="w-48 h-64 mx-auto bg-cover bg-center rounded-sm mb-8"
            style={{
              backgroundColor: "var(--color-accent)",
              backgroundImage: `url(${product.image})`,
            }}
          />
          <h2
            className="heading-display text-5xl md:text-7xl mb-4"
            style={{ color: "var(--color-secondary)" }}
          >
            {product.name}
          </h2>
          <p
            className="heading-editorial text-xl mb-6"
            style={{ color: "var(--color-accent)" }}
          >
            {product.subtitle}
          </p>
          <p
            className="text-body-elegant text-lg max-w-md mx-auto mb-12"
            style={{ color: "var(--color-muted)" }}
          >
            {product.description}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to={localizePath(`/product/${product.id}`)}
              className="magnetic-btn"
              style={{ color: "var(--color-secondary)", borderColor: "var(--color-secondary)" }}
            >
              <span>Discover {product.name}</span>
            </Link>
            <button
              onClick={handleRestart}
              className="magnetic-btn"
              style={{ color: "var(--color-muted)", borderColor: "var(--color-muted)" }}
            >
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const q = questions[step];

  return (
    <section
      className="section-padding text-center"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <p
        className="text-label mb-6 tracking-[0.4em]"
        style={{ color: "var(--color-muted)" }}
      >
        Scent Discovery
      </p>

      {/* Elegant Progress */}
      <div className="flex items-center justify-center gap-6 mb-12">
        {questions.map((_, i) => (
          <div key={i} className="flex items-center gap-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500"
              style={{
                border: `1px solid ${i <= step ? "var(--color-text)" : "var(--color-muted)"}`,
                backgroundColor: i < step ? "var(--color-text)" : "transparent",
                color: i < step ? "var(--color-secondary)" : "var(--color-muted)",
              }}
            >
              {i < step ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < questions.length - 1 && (
              <div
                className="w-12 h-px transition-all duration-500"
                style={{
                  backgroundColor: i < step ? "var(--color-text)" : "var(--color-muted)",
                  opacity: i < step ? 0.6 : 0.2,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <h2
        className="heading-display text-4xl md:text-5xl mb-14"
        style={{ color: "var(--color-text)" }}
      >
        {q.label}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {q.options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => handleAnswer(q.key, opt.value)}
              className="group relative p-8 rounded-sm text-left transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              style={{
                border: `1px solid ${
                  answers[q.key] === opt.value
                    ? "var(--color-text)"
                    : "var(--color-accent)"
                }`,
                backgroundColor:
                  answers[q.key] === opt.value
                    ? "var(--color-text)"
                    : "transparent",
                color:
                  answers[q.key] === opt.value
                    ? "var(--color-secondary)"
                    : "var(--color-text)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-5 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12"
                style={{ transform: "translate(30%, -30%)" }}
              >
                <Icon />
              </div>
              <div className="mb-4" style={{ color: "inherit" }}>
                <Icon />
              </div>
              <span className="heading-editorial text-lg block">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
