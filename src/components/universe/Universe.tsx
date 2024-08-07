import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import mercurio from "./planets/mercurio.jpg";
import venus from "./planets/venus.jpg";
import tierra from "./planets/tierra.jpg";
import sol from "./planets/sol.jpg";
import marte from "./planets/marte.jpg";
import jupiter from "./planets/jupiter.jpg";
import urano from "./planets/urano.jpg";
import neptuno from "./planets/neptuno.jpg";
import saturno from "./planets/saturnmap.jpg";
import meteorito from "./planets/meteorito.jpg";
import luna from './planets/luna.jpg';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// Crear una textura global para los planetas
const textureSol = new THREE.TextureLoader().load(sol);
const textureMercurio = new THREE.TextureLoader().load(mercurio);
const textureVenus = new THREE.TextureLoader().load(venus);
const textureTierra = new THREE.TextureLoader().load(tierra);
const textureMarte = new THREE.TextureLoader().load(marte);
const textureJupiter = new THREE.TextureLoader().load(jupiter);
const textureUrano = new THREE.TextureLoader().load(urano);
const textureNeptuno = new THREE.TextureLoader().load(neptuno);
const textureSaturno = new THREE.TextureLoader().load(saturno);
const textureMeteorito = new THREE.TextureLoader().load(meteorito);
const textureLuna = new THREE.TextureLoader().load(luna);

// Función para generar un valor aleatorio dentro de un rango
const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const Comet: React.FC = () => {
  const cometRef = useRef<THREE.Mesh>(null);
  const size = useMemo(() => getRandom(0.1, 0.5), []);
  const speed = useMemo(() => getRandom(0.3, 4), []);
  const position = useMemo<[number, number, number]>(
    () => [getRandom(-40, 40), getRandom(-40, 40), getRandom(-40, 40),],
    []
  );

  useFrame(() => {
    if (cometRef.current) {
      cometRef.current.position.x -= speed;
      cometRef.current.rotation.y += 0.05;
      if (cometRef.current.position.x < -50) {
        cometRef.current.position.x = 50;
      }
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "rgba(100,50,100,0.5)",
        map: textureMeteorito,
        emissive: new THREE.Color("brown"),
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.5,
      }),
    []
  );

  return (
    <mesh ref={cometRef} position={position} material={material}>
      <sphereGeometry args={[size, 80, 80]} />
    </mesh>
  );
};

// Componente para el Sol
const Sun: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  const sunMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: textureSol,
      emissive: new THREE.Color("#f84"),
      emissiveIntensity: 0.666
    });
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y = elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[5, 40, 40]} />
      <meshStandardMaterial attach="material" {...sunMaterial} />
    </mesh>
  );
};

interface PlanetProps {
  texture?: THREE.Texture;
  color?: string;
  size: number;
  distance: number;
  speed: number;
  emissive?: string;
  emissiveIntensity?: number;
  hasRings?: boolean;
  ringTexture?: THREE.Texture;
  ringSize?: number;
  hasMoon?: boolean;
}

const Planet: React.FC<PlanetProps> = ({
  texture,
  color,
  size,
  distance,
  speed,
  emissive,
  emissiveIntensity,
  hasRings = false,
  ringTexture,
  ringSize = 1.5,
  hasMoon = false,
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.position.x = distance * Math.cos(elapsedTime * speed);
      planetRef.current.position.z = distance * Math.sin(elapsedTime * speed);
      planetRef.current.rotation.y += 0.01;
    }
    if (hasMoon && moonRef.current && planetRef.current) {
      moonRef.current.position.x =
        planetRef.current.position.x +
        Math.cos(elapsedTime * speed * 2) * size * 2;
      moonRef.current.position.z =
        planetRef.current.position.z +
        Math.sin(elapsedTime * speed * 2) * size * 2;
    }
  });

  const planetMaterial = useMemo(
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

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      }),
    [ringTexture]
  );

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <primitive object={planetMaterial} attach="material" />
        {hasRings && (
          <mesh rotation-x={Math.PI / 2}>
            <ringGeometry args={[size * ringSize, size * ringSize + 0.1, 64]} />
            <primitive object={ringMaterial} attach="material" />
          </mesh>
        )}
      </mesh>
      {hasMoon && (
        <mesh ref={moonRef}>
          <sphereGeometry args={[size * 0.2, 32, 32]} />
          <meshStandardMaterial color="gray" map={textureLuna} />
        </mesh>
      )}
    </group>
  );
};

// Componente para la órbita
const Orbit: React.FC<{ radius: number }> = ({ radius }) => {
  const orbitMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('rgba(20,255,180,0.9)'),
        opacity: 1.2,
        transparent: true,
        side: THREE.DoubleSide,
        name:'orbit'
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
  return (
    <div style={{minHeight: '100vh'}}>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.9} />
        <Stars
          radius={200}
          count={50000}
          factor={4}
          saturation={0.5}
          fade
          speed={1}
        />
        <Sun />
        <Orbit radius={7} />
        <Orbit radius={10} />
        <Orbit radius={15} />
        <Orbit radius={20} />
        <Orbit radius={25} />
        <Orbit radius={30} />
        <Orbit radius={35} />
        <Orbit radius={40} />
        <Planet texture={textureMercurio} size={0.4} distance={7} speed={0.2} />
        <Planet texture={textureVenus} size={0.9} distance={10} speed={0.12} />
        <Planet
          texture={textureTierra}
          size={1.2}
          distance={15}
          speed={0.1}
          emissive="blue"
          emissiveIntensity={0.1}
          hasMoon
        />
        <Planet texture={textureMarte} size={0.6} distance={20} speed={0.08} />
        <Planet
          texture={textureJupiter}
          size={1.5}
          distance={25}
          speed={0.06}
        />
        <Planet
          texture={textureSaturno}
          size={1.3}
          distance={30}
          speed={0.05}
          hasRings
          ringTexture={textureSaturno}
        />
        <Planet texture={textureUrano} size={1.1} distance={35} speed={0.04} />
        <Planet
          texture={textureNeptuno}
          size={1.1}
          distance={40}
          speed={0.03}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Comet />
        <Comet />
        <Comet />
        <Comet />
        <EffectComposer>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.5}
            width={300}
            height={300}
            kernelSize={3}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default StarryBackground;
