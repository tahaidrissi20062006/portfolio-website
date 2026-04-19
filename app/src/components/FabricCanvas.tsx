import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollSpeed;
  varying vec2 vUv;
  varying float vElevation;

  float circle(vec2 uv, vec2 circlePosition, float radius) {
    float dist = distance(circlePosition, uv);
    return 1.0 - smoothstep(0.0, radius, dist);
  }

  float elevation(float radius, float intensity, vec2 uv) {
    float time = uTime * 0.1;
    vec2 mousePosition = uMouse * 2.0 - 1.0;
    float mouseCircle = circle(uv, mousePosition, radius);
    float scrollWave = sin(uv.y * 10.0 + uTime) * 0.1 * uScrollSpeed;
    float crossWave = sin(uv.x * 10.0) * 0.05;
    return (mouseCircle * intensity) + scrollWave + crossWave;
  }

  void main() {
    vec3 newPosition = position;
    float elev = elevation(0.2, 0.7, uv);
    newPosition.z += elev;
    vElevation = elev;
    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec2 uv = vUv;
    vec4 textureColor = texture2D(uTexture, uv);
    float lightIntensity = vElevation * 0.3 + 0.7;
    gl_FragColor = vec4(textureColor.rgb * lightIntensity, 1.0);
  }
`;

function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const { viewport } = useThree();

  const texture = useTexture('/images/nebula-texture.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScrollSpeed: { value: 1.0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollRef.current);
      scrollSpeedRef.current = Math.min(delta * 0.01, 3.0);
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;

    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse lerp
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.1;
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.1;
    material.uniforms.uMouse.value.set(smoothMouseRef.current.x, smoothMouseRef.current.y);

    // Decay scroll speed
    scrollSpeedRef.current *= 0.95;
    if (scrollSpeedRef.current < 1.0) scrollSpeedRef.current = 1.0;
    material.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
  });

  // Calculate plane size to cover viewport
  const planeWidth = viewport.width * 1.5;
  const planeHeight = viewport.height * 1.5;

  return (
    <mesh ref={meshRef} rotation={[-0.2, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[planeWidth, planeHeight, 50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default function FabricCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FabricMesh />
      </Canvas>
    </div>
  );
}
