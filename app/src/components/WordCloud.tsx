import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WordData {
  text: string;
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

const SKILLS = [
  'C++', 'C#', 'ASP.NET', 'SQL', 'MVC', 'React', 'Node.js',
  'Python', 'Cisco', 'Wireshark', 'Packet Tracer', 'JavaScript',
  'HTML/CSS', 'Git', 'TypeScript', 'Three.js', 'Tailwind',
];

function createTextTexture(text: string, isHovered: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const fontSize = isHovered ? 64 : 48;
  canvas.width = 512;
  canvas.height = 128;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isHovered) {
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
  } else {
    ctx.fillStyle = '#94a3b8';
  }

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius * 0.6, z * radius));
  }

  return points;
}

interface WordSpriteProps {
  word: WordData;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  groupRotation: React.MutableRefObject<{ x: number; y: number }>;
}

function WordSprite({ word, index, isHovered, onHover, groupRotation }: WordSpriteProps) {
  const spriteRef = useRef<THREE.Sprite>(null);
  const [texture, setTexture] = useState(() => createTextTexture(word.text, false));
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  useEffect(() => {
    setTexture(createTextTexture(word.text, isHovered));
    targetScale.current = isHovered ? 1.5 : 1;
  }, [isHovered, word.text]);

  useFrame(() => {
    if (!spriteRef.current) return;

    // Smooth scale transition
    currentScale.current += (targetScale.current - currentScale.current) * 0.1;
    spriteRef.current.scale.set(
      2.5 * currentScale.current,
      0.6 * currentScale.current,
      1
    );

    // Counter-rotate to keep text facing camera
    spriteRef.current.rotation.z = -groupRotation.current.y * 0.3;
  });

  return (
    <sprite
      ref={spriteRef}
      position={word.position}
      onPointerOver={() => onHover(index)}
      onPointerOut={() => onHover(null)}
    >
      <spriteMaterial
        map={texture}
        transparent
        opacity={isHovered ? 1 : 0.8}
        blending={isHovered ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

function WordCloudScene({ onWordHover }: { onWordHover: (word: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const groupRotation = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const words = useMemo(() => {
    const positions = fibonacciSphere(SKILLS.length, 4);
    return SKILLS.map((text, i) => ({
      text,
      position: positions[i],
      originalPosition: positions[i].clone(),
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;

    // Rotate based on mouse + auto rotation
    groupRotation.current.y += delta * 0.1 + smoothMouseRef.current.x * 0.01;
    groupRotation.current.x += smoothMouseRef.current.y * 0.005;

    groupRef.current.rotation.y = groupRotation.current.y;
    groupRef.current.rotation.x = groupRotation.current.x * 0.3;
  });

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
    onWordHover(index !== null ? SKILLS[index] : null);
  }, [onWordHover]);

  return (
    <group ref={groupRef}>
      {words.map((word, i) => (
        <WordSprite
          key={word.text}
          word={word}
          index={i}
          isHovered={hoveredIndex === i}
          onHover={handleHover}
          groupRotation={groupRotation}
        />
      ))}
    </group>
  );
}

interface WordCloudProps {
  onWordHover?: (word: string | null) => void;
}

export default function WordCloud({ onWordHover }: WordCloudProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const handleWordHover = useCallback((word: string | null) => {
    setHoveredWord(word);
    onWordHover?.(word);
  }, [onWordHover]);

  return (
    <div className="relative w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <WordCloudScene onWordHover={handleWordHover} />
      </Canvas>
      {hoveredWord && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="glass-panel px-6 py-3 rounded-xl">
            <span className="text-accent-cyan font-display text-xl font-bold">{hoveredWord}</span>
          </div>
        </div>
      )}
    </div>
  );
}
