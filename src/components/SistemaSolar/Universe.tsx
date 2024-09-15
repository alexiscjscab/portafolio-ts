import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Planet } from './Planet';
import { Sun } from './Sun';
import { Orbit } from './Orbit';
import { Comet } from './Comet';

// Importación de las texturas
import mercurio from '../../assets/planets/mercurio.jpg';
import venus from '../../assets/planets/venus.jpg';
import tierra from '../../assets/planets/tierra.jpg';
import marte from '../../assets/planets/marte.jpg';
import jupiter from '../../assets/planets/jupiter.jpg';
import urano from '../../assets/planets/urano.jpg';
import neptuno from '../../assets/planets/neptuno.jpg';
import saturno from '../../assets/planets/saturnmap.jpg';

// Definición de las rutas de las texturas
const planetTextures: { [key: string]: string } = {
  mercurio: mercurio,
  venus: venus,
  tierra: tierra,
  marte: marte,
  jupiter: jupiter,
  urano: urano,
  neptuno: neptuno,
  saturno: saturno,
};

type LoadedTextures = {
  [key: string]: THREE.Texture;
};

const loadTextures = (textures: { [key: string]: string }): LoadedTextures => {
  const loader = new THREE.TextureLoader();
  const loadedTextures: LoadedTextures = {};
  for (const [key, value] of Object.entries(textures)) {
    loadedTextures[key] = loader.load(value);
  }
  return loadedTextures;
};

const textures = loadTextures(planetTextures);

type PlanetConfig = {
  texture: THREE.Texture;
  size: number;
  distance: number;
  speed: number;
  emissive?: string;
  emissiveIntensity?: number;
  hasMoon?: boolean;
  hasRings?: boolean;
  ringTexture?: THREE.Texture;
  planetName: string;
};

const planetsConfig: PlanetConfig[] = [
  {
    texture: textures.mercurio,
    size: 0.4,
    distance: 7,
    speed: 0.2,
    planetName: 'Mercurio',
  },
  {
    texture: textures.venus,
    size: 0.9,
    distance: 10,
    speed: 0.12,
    planetName: 'Venus',
  },
  {
    texture: textures.tierra,
    size: 1.2,
    distance: 15,
    speed: 0.1,
    emissive: 'blue',
    emissiveIntensity: 0.1,
    hasMoon: true,
    planetName: 'Tierra',
  },
  {
    texture: textures.marte,
    size: 0.6,
    distance: 20,
    speed: 0.08,
    planetName: 'Marte',
  },
  {
    texture: textures.jupiter,
    size: 1.5,
    distance: 25,
    speed: 0.06,
    planetName: 'Jupiter',
  },
  {
    texture: textures.saturno,
    size: 1.3,
    distance: 30,
    speed: 0.05,
    hasRings: true,
    ringTexture: textures.saturno,
    planetName: 'Saturno',
  },
  {
    texture: textures.urano,
    size: 1.1,
    distance: 35,
    speed: 0.04,
    planetName: 'Urano',
  },
  {
    texture: textures.neptuno,
    size: 1.1,
    distance: 40,
    speed: 0.03,
    planetName: 'Neptuno',
  },
];

const StarryBackground: React.FC = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
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
      {[7, 10, 15, 20, 25, 30, 35, 40].map((radius) => (
        <Orbit key={radius} radius={radius} />
      ))}

      {planetsConfig.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {Array.from({ length: 30 }).map((_, index) => (
        <Comet key={index} />
      ))}

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.5}
          width={300}
          height={300}
          kernelSize={2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <OrbitControls />
    </Canvas>
  );
};

export default StarryBackground;
