import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BottleModel() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Bottle Body */}
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
        {/* Bottle Neck */}
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
        {/* Cap */}
        <mesh position={[0, 1.9, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.4, 32]} />
          <meshStandardMaterial
            color="#6D0F1A"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        {/* Liquid inside */}
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
      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
      />
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

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* 3D Bottle */}
        <div className="h-[60vh] md:h-screen relative">
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

        {/* Content */}
        <div className="featured-content flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Featured
          </p>
          <h2
            className="heading-display text-5xl md:text-7xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Rose
            <br />
            Absolue
          </h2>
          <p
            className="heading-editorial text-xl mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            The Ultimate Floral Statement
          </p>
          <p
            className="text-body-elegant text-lg mb-8 max-w-md"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            One thousand roses from Grasse, distilled into a single expression
            of devotion. Paired with rare oud and aged leather. Limited to
            500 pieces worldwide.
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
                className="heading-editorial text-2xl"
                style={{ color: "var(--color-text)" }}
              >
                $4,800
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
                className="heading-editorial text-2xl"
                style={{ color: "var(--color-text)" }}
              >
                30ml
              </p>
            </div>
          </div>

          <div>
            <button className="magnetic-btn">
              <span>Discover</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
