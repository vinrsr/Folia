'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  Float,
  ContactShadows,
  Stats,
  OrbitControls,
  useTexture,
  Text,
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Model as CanOriginal } from '@/components/canOriginal';
import { LandingUI } from '@/components/LandingUI';
import { ConfiguratorUI } from '@/components/ConfiguratorUI';
// import { IngredientsUI } from '@/components/IngredientsUI';
import { LifestyleUI } from '@/components/LifestyleUI';
import { LifestyleScene } from '@/components/LifestyleScene';
import { CallToActionUI } from '@/components/CallToActionUI';
import { DraggableCan } from '@/components/DraggableCan';
import { SectionNav } from '@/components/SectionNav';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { ContinueButton } from '@/components/ContinueButton';
import * as THREE from 'three';
import gsap from 'gsap';

const sectionColors = [
  '#a8d8b9', // 1: Flavors (A warm, sandy beige)
  '#bbdc51', // 2: Ingredients (A fresh, natural green/mint)
  '#bbdc86', // 2: Ingredients (A fresh, natural green/mint)
  '#4a4e69', // 3: Lifestyle (A warm, sunset-like coral/pink)
  '#4a4e69', // 4: CTA (A deep, elegant indigo to end with)
  '#4a4e69', // 1: Flavors (A warm, sunset orange)
  '#4a4e69', // 2: Ingredients (A cool, dusty lavender)
  '#f25287', // 3: Lifestyle (A vibrant, electric magenta)
  '#2d3047', // 4: CTA (A deep, late-night indigo)
  '#2d3027', // 4: CTA (A deep, late-night indigo)
];

const flavors = [
  { 
    id: 'blackberry', 
    name: 'Wild Blackberry', 
    color: '#2c0412',
    backgroundColor: '#14171A',
    textColor: '#f5f5dc',
    texturePath: '/3D/textures/wild_blackberry.jpg',
    ingredients: [
      { name: 'Sparkling Water', description: 'Sourced from alpine springs.' },
      { name: 'Wild Blackberry Puree', description: 'For a rich, authentic flavor.' },
      { name: 'Organic Cane Sugar', description: 'Just a touch of sweetness.' }
    ],
    nutrition: {
      calories: '15',
      sugar: '3g',
      carbohydrates: '4g',
    }
  },
  { 
    id: 'apple', 
    name: 'Crisp Apple', 
    color: '#58732c',
    backgroundColor: '#4C6425',
    textColor: '#272d56',
    texturePath: '/3D/textures/crisp_apple.jpg',
    ingredients: [
      { name: 'Sparkling Water', description: 'Sourced from alpine springs.' },
      { name: 'Green Apple Concentrate', description: 'For a sharp, clean taste.' },
      { name: 'A Hint of Stevia', description: 'For zero-calorie sweetness.' }
    ],
    nutrition: {
      calories: '10',
      sugar: '2g',
      carbohydrates: '3g',
    }
  },
  { 
    id: 'peach', 
    name: 'Sweet Peach', 
    color: '#ffe5b4',
    backgroundColor: '#978E7B',
    textColor: '#272d56',
    texturePath: '/3D/textures/sweet_peach.jpg',
    ingredients: [
      { name: 'Sparkling Water', description: 'Sourced from alpine springs.' },
      { name: 'White Peach Nectar', description: 'For a soft, fragrant flavor.' },
      { name: 'Organic Cane Sugar', description: 'Just a touch of sweetness.' }
    ],
    nutrition: {
      calories: '15',
      sugar: '3g',
      carbohydrates: '4g',
    }
  },
  { 
    id: 'cherry', 
    name: 'Tart Cherry',
    color: '#b91c1c',
    backgroundColor: '#4C1418',
    textColor: '#e5e4e2',
    texturePath: '/3D/textures/tart_cherry.jpg',
    ingredients: [
      { name: 'Sparkling Water', description: 'Sourced from alpine springs.' },
      { name: 'Sour Cherry Juice', description: 'For a bold, tangy experience.' },
      { name: 'Organic Cane Sugar', description: 'Just a touch of sweetness.' }
    ],
    nutrition: {
      calories: '20',
      sugar: '4g',
      carbohydrates: '5g',
    }
  },
];

const TOTAL_SECTIONS = 9;

const Scene = ({ section, activeFlavor, isAnimating }) => {
  const canGroupRef = useRef(null);
  const canLimitedGroupRef = useRef(null);
  const titleTextRef = useRef(null); 
  const descriptionTextRef = useRef(null); 

  // --- 2. MOVE THE HOOKS AND LOGIC INSIDE ---
  // const loadedTextures = useTexture(flavors.map(f => f.texturePath));
  
  const loadedTextures = useTexture(flavors.map(f => f.texturePath), (textures) => {
    (Array.isArray(textures) ? textures : [textures]).forEach(texture => {
      texture.flipY = false;
      texture.colorSpace = "srgb"; 
    });
  });

  // --- 2. LOAD THE SINGLE LIMITED EDITION TEXTURE ---
  // We call useTexture again with a single string path.
  const limitedEditionTexture = useTexture('/3D/textures/icy_blueberry.jpg', (texture) => {
    // We apply the same corrections to this texture as well.
    texture.flipY = false;
    texture.colorSpace = "srgb";
  });

  const activeTexture = loadedTextures[flavors.indexOf(activeFlavor)];

  // GSAP animation logic also moves inside
  // This useEffect now ONLY handles the animation between sections
  useEffect(() => {
    if (!canGroupRef.current) return;
    if (!canLimitedGroupRef.current) return;
    if (!titleTextRef.current) return;
    if (!descriptionTextRef.current) return;

    let textMaterial, textPosition, textCurrent;
    let descTextMaterial;

    let descriptionTextDuration = 2;

    if (section === 0) {
      textMaterial = {
        opacity: 1
      }
      textPosition = new THREE.Vector3(0, 0, -2);
      textCurrent = {
        fontSize: 4
      }

      descTextMaterial = {
        opacity: 0
      }
    descriptionTextDuration = 0.5;
    } else if (section === 1) {
      textMaterial = {
        opacity: 1
      }
      textPosition = new THREE.Vector3(0, 2, -2);
      textCurrent = {
        fontSize: 2
      }

      descTextMaterial = {
        opacity: 1
      }
    } else if (section >= 2 && section <= 2) {
      textMaterial = {
        opacity: 0.2
      }
      textPosition = new THREE.Vector3(0, 0, -2);
      textCurrent = {
        fontSize: 4
      }

      descTextMaterial = {
        opacity: 0
      }
    descriptionTextDuration = 0.5;
    } else {
      textMaterial = {
        opacity: 0
      }
      textPosition = new THREE.Vector3(0, 0, 0);
      textCurrent = {
        fontSize: 4
      }
      
      descTextMaterial = {
        opacity: 0
      }
    }

    gsap.to(titleTextRef.current.material, {
      ...textMaterial,
      duration: 1.5,
      ease: 'power3.inOut',
    });
    gsap.to(titleTextRef.current.position, {
      ...textPosition,
      duration: 1.5,
      ease: 'power3.inOut',
    });
    gsap.to(titleTextRef.current, { ...textCurrent, duration: 1.5, ease: 'power3.inOut' });

    gsap.to(descriptionTextRef.current.material, {
      ...descTextMaterial,
      duration: descriptionTextDuration,
      ease: 'power3.inOut',
    });

    // CAN ANIMATION
    let canTargetPosition, canTargetScale, canTargetRotation;
    let canLimitedTargetPosition, canLimitedTargetScale, canLimitedTargetRotation;

    switch(section) {
      case 0: // Landing
        console.log('0')
        canTargetPosition = new THREE.Vector3(0, 7, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 1:
        console.log('1')
        canTargetPosition = new THREE.Vector3(0, 7, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 2: // Product Hub (Flavors & Ingredients)
        console.log('2')
        canTargetPosition = new THREE.Vector3(0, 0, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 3: // Lifestyle
        console.log('3')
        canTargetPosition = new THREE.Vector3(0, 0, 4); // Move to the right
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 4: // Lifestyle
        console.log('4')
        canTargetPosition = new THREE.Vector3(0, 0, 4); // Move to the right
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 2.1, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 5: // Lifestyle
        console.log('5')
        canTargetPosition = new THREE.Vector3(0, 0, 4); // Move to the right
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 4, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 6: // Lifestyle
        console.log('6')
        canTargetPosition = new THREE.Vector3(0, 0, 4); // Move to the right
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(6, 0.3, 0.3);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 7: // Call to Action
        console.log('7')
        // Animate the can down and away to put focus on the CTA text
        canTargetPosition = new THREE.Vector3(2.8, 5, 1.5); 
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0, 0);

        canLimitedTargetPosition = new THREE.Vector3(-0.1, 0, 3); 
        canLimitedTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canLimitedTargetRotation = new THREE.Vector3(0, 0.2, 0);
        break;
      default: // Fallback to the first section's state
        console.log('8')
        canTargetPosition = new THREE.Vector3(2.8, 5, 1.5); 
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0, 0);

        canLimitedTargetPosition = new THREE.Vector3(-10, 0, 3); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0.2, 0);
    }

    gsap.to(canGroupRef.current.position, { ...canTargetPosition, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canGroupRef.current.scale, { ...canTargetScale, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canGroupRef.current.rotation, { ...canTargetRotation, duration: 1.5, ease: 'power3.inOut' });

    gsap.to(canLimitedGroupRef.current.position, { ...canLimitedTargetPosition, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canLimitedGroupRef.current.scale, { ...canLimitedTargetScale, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canLimitedGroupRef.current.rotation, { ...canLimitedTargetRotation, duration: 1.5, ease: 'power3.inOut' });
  }, [section]);

  function CameraRig({ section }) {
    useFrame((state) => {
      const { pointer } = state;
      const targetY = section === 7 ? 0.5 : pointer.y * 0.5;

      const targetPosition = new THREE.Vector3(
        pointer.x * 0.5,
        targetY,
        8
      );

      state.camera.position.lerp(targetPosition, 0.025);
      state.camera.lookAt(0, 0, 0);
    });

    return null;
  }

  return (
    <>
      {/* <AnimatedBackground color={currentBackgroundColor} /> */}
      
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 2, 8]}
        intensity={1.2}
      />
      <Environment resolution={512}>
        <Lightformer intensity={1.5} rotation-y={Math.PI / 2} position={[-5, 1, 1]} scale={[20, 5, 1]} />
        <Lightformer intensity={0.8} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        <Lightformer
          intensity={0.8}
          rotation-x={Math.PI / 2}
          position={[0, 4, 5]}
          scale={[10, 10, 1]}
        />
      </Environment>

      {/* {section < 2 && <FloatingOrbs />} */}

      <Text
        ref={titleTextRef}
        font="/fonts/Poppins-Bold.ttf"
        fontSize={4}
        color="#272d56"
        material-toneMapped={false}
        material-opacity={0} 
        position={[0, 0, -5]}
      >
        FOLIA
      </Text>

      <Text
        ref={descriptionTextRef}
        font="/fonts/Poppins-Bold.ttf"
        fontSize={.4}
        color="#272d56"
        maxWidth={12}
        material-toneMapped={false}
        textAlign='center'
        material-opacity={0} 
        position={[0, -1, -10]}
      >
        Folia is a new wave of sparkling botanical water. We believe in the power of pure, simple ingredients to restore balance and awaken the senses. Each can is a moment of clarity—crisp, clean, and endlessly refreshing.
      </Text>

      <group ref={canGroupRef} position={[0, 7, 2.5]} scale={[1, 1, 1]}>
        <Float
          speed={3}
          floatIntensity={0.2}
          rotationIntensity={0.4}
        >
          <CanOriginal
            position={[0, 0, 0]}
            texture={activeTexture}
          />
        </Float>
      </group>

      <group ref={canLimitedGroupRef} position={[2.5, 0, 0.8]} scale={[1, 1, 1]}>
        {(section == 7 || section == 6 || section == 8) && (
          <Float
            speed={2}
            floatIntensity={0.1}
            rotationIntensity={0}
            enabled={false}
          >
            <DraggableCan
              position={[0, 0, 0]}
              texture={limitedEditionTexture}
              isAnimating={isAnimating}
              section={section}
            />
          </Float>
        )}
      </group>
      
      <ContactShadows
        position={[0, -1.4, 0]} // Position it at the "floor" level
        opacity={0.6} // How dark the shadow is
        scale={10} // The size of the shadow area
        blur={2.5} // The magic property: how blurry the shadow is!
        far={3} // How far away from the object the shadow can be
        resolution={512} // The quality of the shadow map
      />

      <CameraRig section={section} />

      {/* <Stats /> */}
    </>
  );
};

export default function Home() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFlavorId, setActiveFlavorId] = useState(flavors[0].id);

  const mainRef = useRef(null);

  const activeFlavor = flavors.find(f => f.id === activeFlavorId) || flavors[0];

  const currentBackgroundColor = [2, 3, 4, 5, 6].includes(section) ? activeFlavor.backgroundColor : sectionColors[section];
  const currentTextColor = activeFlavor.textColor;

  useEffect(() => {
    if (!mainRef.current) return;

    const handleWheel = (event) => {
      if (isAnimating) return;

      const scrollDown = event.deltaY > 0;
      
      if (scrollDown && section < TOTAL_SECTIONS - 1) { 
        setIsAnimating(true);
        setSection(section + 1);
        setTimeout(() => setIsAnimating(false), 1500);
      } else if (!scrollDown && section > 0) {
        setIsAnimating(true);
        setSection(section - 1);
        setTimeout(() => setIsAnimating(false), 1500);
      }
    };

    const mainElement = mainRef.current;
    mainElement.addEventListener('wheel', handleWheel);
    return () => mainElement.removeEventListener('wheel', handleWheel);
  }, [section, isAnimating]);

  const changeSection = (newSection) => {
    if (isAnimating || newSection === section) return;
    
    setIsAnimating(true);
    setSection(newSection);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <main ref={mainRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <AnimatedBackground color={currentBackgroundColor} />
        <Suspense fallback={null}>
          <Scene 
            section={section}
            activeFlavor={activeFlavor}
            isAnimating={isAnimating}
          />
        </Suspense>
      </Canvas>

      <AnimatePresence mode="wait">
        <motion.div key={section} className="ui-container">

          {section === 1 && (
            <ContinueButton 
              key="continue-btn" 
              onClick={() => changeSection(2)} 
              text="Explore the Collection" 
            />
          )}

          {/* {section === 1 && <LandingUI onDiscoverClick={() => changeSection(2)} />} */}
          {section === 2 && <ConfiguratorUI key="config" activeFlavor={activeFlavor} onFlavorChange={setActiveFlavorId} flavors={flavors} textColor={currentTextColor} />}
          {section === 3 && <LifestyleUI />}
          {section === 8 && <CallToActionUI />}
        </motion.div>
      </AnimatePresence>

      <SectionNav 
        total={TOTAL_SECTIONS} 
        current={section} 
        onChange={changeSection} 
      />
    </main>
  );
}
