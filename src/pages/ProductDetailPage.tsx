import { useEffect, useRef, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { products } from "../data/products";
import MagneticButton from "../components/ui/MagneticButton";
import { useLocale } from "../hooks/useLocale";

gsap.registerPlugin(ScrollTrigger);

function BottleModel() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 2.2, 32]} />
          <meshPhysicalMaterial
            color="#D8C8B6"
            metalness={0.1}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.6, 32]} />
          <meshPhysicalMaterial
            color="#D8C8B6"
            metalness={0.1}
            roughness={0.1}
            transmission={0.6}
            thickness={0.3}
            ior={1.5}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, 1.9, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.4, 32]} />
          <meshStandardMaterial
            color="#6D0F1A"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 1.6, 32]} />
          <meshPhysicalMaterial
            color="#6D0F1A"
            metalness={0}
            roughness={0}
            transmission={0.8}
            thickness={1}
            ior={1.33}
            opacity={0.4}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <BottleModel />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="studio" />
    </>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const pageRef = useRef<HTMLDivElement>(null);
  const { localizePath } = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current || !product) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pd-hero-content",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      gsap.utils.toArray(".pd-section").forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="heading-display text-4xl mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Fragrance Not Found
          </h1>
          <Link
            to={localizePath("/collection")}
            className="text-label tracking-[0.2em] border-b pb-0.5"
            style={{
              color: "var(--color-text)",
              borderColor: "var(--color-text)",
            }}
          >
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef}>
      {/* Hero - Fullscreen Bottle */}
      <section className="relative min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* 3D Bottle */}
          <div className="h-[50vh] md:h-screen order-2 md:order-1 relative">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border border-current rounded-full animate-spin" />
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: "transparent" }}
              >
                <Scene />
              </Canvas>
            </Suspense>
          </div>

          {/* Product Info */}
          <div className="pd-hero-content flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 order-1 md:order-2">
            <p
              className="text-label mb-4 tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              {product.category[0].toUpperCase()}
            </p>
            <h1
              className="heading-display text-6xl md:text-8xl mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {product.name}
            </h1>
            <p
              className="heading-editorial text-xl mb-8"
              style={{ color: "var(--color-accent)" }}
            >
              {product.subtitle}
            </p>
            <p
              className="text-body-elegant text-lg mb-10 max-w-md"
              style={{ color: "var(--color-text)", opacity: 0.7 }}
            >
              {product.description}
            </p>

            <div className="flex items-center gap-8 mb-10">
              <div>
                <p
                  className="text-label mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  Price
                </p>
                <p
                  className="heading-editorial text-3xl"
                  style={{ color: "var(--color-text)" }}
                >
                  ${product.price.toLocaleString()}
                </p>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--color-text)", opacity: 0.2 }}
              />
              <div>
                <p
                  className="text-label mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  Volume
                </p>
                <p
                  className="heading-editorial text-3xl"
                  style={{ color: "var(--color-text)" }}
                >
                  {product.size}
                </p>
              </div>
            </div>

            <MagneticButton>Add to Collection</MagneticButton>
          </div>
        </div>
      </section>

      {/* Fragrance Notes Timeline */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Olfactory Pyramid
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-16"
            style={{ color: "var(--color-text)" }}
          >
            Fragrance Notes
          </h2>

          <div className="flex flex-col items-center gap-0">
            {/* Top Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Top Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.top.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="divider-line w-24" />

            {/* Heart Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Heart Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.heart.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="divider-line w-24" />

            {/* Base Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Base Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.base.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Origins */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-label mb-4 tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Raw Materials
            </p>
            <h2
              className="heading-display text-4xl md:text-6xl"
              style={{ color: "var(--color-text)" }}
            >
              Ingredient Origins
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.ingredients.map((ingredient) => (
              <div
                key={ingredient}
                className="glass-panel p-8 rounded-sm text-center group hover:bg-white/12 transition-all duration-500"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <span className="heading-editorial text-lg" style={{ color: "var(--color-text)" }}>
                    {ingredient[0]}
                  </span>
                </div>
                <h3
                  className="heading-editorial text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {ingredient}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  Sourced with care
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="pd-section relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundColor: "var(--color-deep)",
            backgroundImage: "url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=1080&fit=crop&q=80)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(61,8,16,0.7)" }}
        />
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-accent)" }}
          >
            Made by Hand
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-6"
            style={{ color: "var(--color-secondary)" }}
          >
            Crafted with
            <br />
            Devotion
          </h2>
          <p
            className="text-body-elegant text-lg max-w-lg mx-auto mb-8"
            style={{ color: "var(--color-muted)" }}
          >
            Every bottle is hand-assembled in our Grasse atelier by master
            craftspeople with decades of experience.
          </p>
          <MagneticButton>Watch the Film</MagneticButton>
        </div>
      </section>

      {/* Purchase Sticky Section */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3
              className="heading-display text-4xl md:text-5xl mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {product.name}
            </h3>
            <p
              className="heading-editorial text-lg"
              style={{ color: "var(--color-accent)" }}
            >
              {product.size} &mdash; ${product.price.toLocaleString()}
            </p>
          </div>
          <MagneticButton>Add to Collection</MagneticButton>
        </div>
      </section>
    </main>
  );
}
