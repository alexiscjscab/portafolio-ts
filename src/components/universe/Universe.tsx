import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Text } from '@react-three/drei';

// Función para crear una textura básica de la Tierra
const createEarthTexture = (): THREE.Texture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Ajusta el tamaño del canvas para la textura
  canvas.width = 512;
  canvas.height = 256;

  if (!context) {
    // Crear una textura blanca en caso de error
    const defaultTexture = new THREE.Texture();
    defaultTexture.needsUpdate = true;
    return defaultTexture;
  }

  // Dibujar el océano
  context.fillStyle = "#0000ff"; // Azul para el océano
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar continentes (simples)
  context.fillStyle = "#00ff00"; // Verde para los continentes
  context.fillRect(100, 80, 80, 60); // Continente simple
  context.fillRect(220, 120, 100, 80); // Otro continente simple

  // Crear la textura a partir del canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Crear la textura de la Tierra

// Componente para las estrellas fugaces
const Comet: React.FC = () => {
  const cometRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cometRef.current) {
      cometRef.current.position.x -= 0.1;
      if (cometRef.current.position.x < -50) {
        cometRef.current.position.x = 50;
      }
    }
  });

  return (
    <Text
      ref={cometRef}
      fontSize={1.7}  // Aumentar el tamaño
      position={[20, 5, 0]}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      🌠
    </Text>
  );
};

// Componente para meteoritos
const Meteorite: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meteoriteRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meteoriteRef.current) {
      meteoriteRef.current.position.y -= 0.1;
      if (meteoriteRef.current.position.y < -10) {
        meteoriteRef.current.position.y = 10;
      }
    }
  });

  return (
    <Text
      ref={meteoriteRef}
      fontSize={1.5}  // Aumentar el tamaño
      position={position}
      color="red"
      anchorX="center"
      anchorY="middle"
    >
      ☄️
    </Text>
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
      fontSize={1.5}  // Tamaño del OVNI
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
    () => new THREE.MeshStandardMaterial({
      color: "yellow",
      emissive: new THREE.Color(0xffff00),
      emissiveIntensity: 2
    }),
    []
  );

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[5, 64, 64]} />
      <primitive object={sunMaterial} attach="material" />
    </mesh>
  );
};

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
  emissiveIntensity
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
    () => new THREE.MeshStandardMaterial({
      map: texture, // Usa la textura generada
      color,
      emissive: emissive ? new THREE.Color(emissive) : undefined,
      emissiveIntensity,
      roughness: 0.7,
      metalness: 0.2
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
    () => new THREE.MeshBasicMaterial({
      color: new THREE.Color("white"),
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide
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
  const earthTexture = createEarthTexture(); // Llama a la función para obtener la textura

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Stars />
      <Sun />
      <Orbit radius={5} /> {/* Mercurio */}
      <Orbit radius={7} /> {/* Venus */}
      <Orbit radius={10} /> {/* Tierra */}
      <Orbit radius={15} /> {/* Marte */}
      <Orbit radius={20} /> {/* Júpiter */}
      <Orbit radius={25} /> {/* Saturno */}
      <Planet
        texture={earthTexture}
        size={1}
        distance={10}
        speed={0.1}
        emissive="blue"
        emissiveIntensity={0.1}
      />
      <Planet color="darkgrey" size={0.4} distance={5} speed={0.2} />
      <Planet color="orange" size={0.9} distance={7} speed={0.12} />
      <Planet color="blue" size={1} distance={10} speed={0.1} emissive="blue" emissiveIntensity={0.1} />
      <Planet color="red" size={0.7} distance={15} speed={0.05} />
      <Planet color="brown" size={1.5} distance={20} speed={0.03} />
      <Planet color="goldenrod" size={1.2} distance={25} speed={0.02} />
      <Meteorite position={[5, 10, 0]} />
      <Meteorite position={[-10, 5, 5]} />
      <Comet />
      <UFO position={[0, 20, 0]} />
      <UFO position={[15, 15, 0]} />
      <UFO position={[-10, 10, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default StarryBackground;
