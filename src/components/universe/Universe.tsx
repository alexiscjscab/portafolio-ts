import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

// Función para crear una textura básica de la Tierra
const createEarthTexture = (): THREE.Texture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 256;

  if (!context) {
    const defaultTexture = new THREE.Texture();
    defaultTexture.needsUpdate = true;
    return defaultTexture;
  }

  context.fillStyle = "#0000ff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#00ff00";
  context.fillRect(100, 80, 80, 60);
  context.fillRect(220, 120, 100, 80);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Genera un valor aleatorio dentro de un rango
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Componente para meteoritos
const Meteorite: React.FC = () => {
  const meteoriteRef = useRef<THREE.Mesh>(null);
  const size = useMemo(() => getRandom(0.1, 0.5), []);
  const speed = useMemo(() => getRandom(0.05, 0.2), []);
  const position = useMemo<[number, number, number]>(() => [getRandom(-10, 10), getRandom(5, 10), getRandom(-10, 10)], []);

  useFrame(() => {
    if (meteoriteRef.current) {
      meteoriteRef.current.position.y -= speed;
      if (meteoriteRef.current.position.y < -10) {
        meteoriteRef.current.position.y = 10;
      }
    }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "red" }), []);

  return (
    <mesh ref={meteoriteRef} position={position} material={material}>
      <sphereGeometry args={[size, 32, 32]} />
    </mesh>
  );
};

// Componente para estrellas fugaces
const Comet: React.FC = () => {
  const cometRef = useRef<THREE.Mesh>(null);
  const size = useMemo(() => getRandom(0.1, 0.5), []);
  const speed = useMemo(() => getRandom(0.05, 0.2), []);
  const position = useMemo<[number, number, number]>(() => [getRandom(-20, 20), getRandom(5, 10), getRandom(-20, 20)], []);

  useFrame(() => {
    if (cometRef.current) {
      cometRef.current.position.x -= speed;
      if (cometRef.current.position.x < -50) {
        cometRef.current.position.x = 50;
      }
    }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "brown" }), []);

  return (
    <mesh ref={cometRef} position={position} material={material}>
      <sphereGeometry args={[size, 32, 32]} />
    </mesh>
  );
};

// Componente para OVNIs
const UFO: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ufoRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ufoRef.current) {
      ufoRef.current.position.y -= 0.05;
      if (ufoRef.current.position.y < -10) {
        ufoRef.current.position.y = 10;
      }
    }
  });

  return (
    <Text
      ref={ufoRef}
      fontSize={1.5}
      position={position}
      color="lightgreen"
      anchorX="center"
      anchorY="middle"
    >
      🛸
    </Text>
  );
};

// Componente para el Sol
const Sun: React.FC = () => {
  const sunMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "yellow",
        emissive: new THREE.Color(0xffff00),
        emissiveIntensity: 2,
      }),
    []
  );

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[5, 40, 40]} />
      <primitive object={sunMaterial} attach="material" />
    </mesh>
  );
};

// Componente para los planetas
const Planet: React.FC<{
  texture?: THREE.Texture;
  color?: string;
  size: number;
  distance: number;
  speed: number;
  emissive?: string;
  emissiveIntensity?: number;
}> = ({
  texture,
  color,
  size,
  distance,
  speed,
  emissive,
  emissiveIntensity,
}) => {
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const elapsedTime = clock.getElapsedTime();
      planetRef.current.position.x = distance * Math.cos(elapsedTime * speed);
      planetRef.current.position.z = distance * Math.sin(elapsedTime * speed);
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        color,
        emissive: emissive ? new THREE.Color(emissive) : undefined,
        emissiveIntensity,
        roughness: 0.7,
        metalness: 0.2,
      }),
    [texture, color, emissive, emissiveIntensity]
  );

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

// Componente para la órbita
const Orbit: React.FC<{ radius: number }> = ({ radius }) => {
  const orbitMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("white"),
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <mesh rotation-x={Math.PI / 2}>
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <primitive object={orbitMaterial} attach="material" />
    </mesh>
  );
};

// Componente principal
const StarryBackground: React.FC = () => {
  const earthTexture = createEarthTexture();

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Stars />
      <Sun />
      <Orbit radius={7} />
      <Orbit radius={10} />
      <Orbit radius={15} />
      <Orbit radius={20} />
      <Orbit radius={25} />
      <Orbit radius={30} />
      <Planet
        texture={earthTexture}
        size={1}
        distance={15}
        speed={0.1}
        emissive="blue"
        emissiveIntensity={0.1}
      />
      <Planet color="darkgrey" size={0.4} distance={7} speed={0.2} />
      <Planet color="orange" size={0.9} distance={10} speed={0.12} />
      <Planet color="red" size={0.7} distance={20} speed={0.05} />
      <Planet color="brown" size={1.5} distance={25} speed={0.03} />
      <Planet color="goldenrod" size={1.2} distance={30} speed={0.02} />
      <Meteorite />
      <Meteorite />
      <Meteorite />
      <Comet />
      <Comet />
      <Comet />
      <UFO position={[0, 20, 0]} />
      <UFO position={[15, 15, 0]} />
      <UFO position={[-10, 10, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default StarryBackground;
