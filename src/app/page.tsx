'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  Float,
  ContactShadows,
  Stats,
  useTexture,
  Text,
  Image
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Model as CanOriginal } from '@/components/canOriginal';
import { ConfiguratorUI } from '@/components/ConfiguratorUI';
import { CallToActionUI } from '@/components/CallToActionUI';
import { DraggableCan } from '@/components/DraggableCan';
import { SectionNav } from '@/components/SectionNav';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ContinueButton } from '@/components/ContinueButton';
import { LimitedEditionUI } from '@/components/LimitedEditionUI';
import { OurProcessUI } from '@/components/OurProcessUI';
import { useWindowSize } from '@/hooks/useWindowSize'
import * as THREE from 'three';
import gsap from 'gsap';

const sectionColors = [
  '#3eb14a', // 1: Flavors (A warm, sandy beige)
  '#3eb14a', // 2: Ingredients (A fresh, natural green/mint)
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

const TOTAL_SECTIONS = 6;
const NEW_SECTION_INDEX = 3;

const Scene = ({ section, activeFlavor, isAnimating, isMobile }: {
  section: number;
  activeFlavor: {
    id: string;
    name: string;
    color: string;
    backgroundColor: string;
    textColor: string;
    texturePath: string;
    ingredients: Array<{ name: string; description: string }>;
    nutrition: { calories: string; sugar: string; carbohydrates: string };
  };
  isAnimating: boolean;
  isMobile: boolean;
}) => {
  const canGroupRef = useRef<THREE.Group>(null);
  const canLimitedGroupRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Mesh>(null); 
  const titleTextRef = useRef<THREE.Mesh>(null); 
  const descriptionTextRef = useRef<THREE.Mesh>(null); 
  
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
    if (!logoRef.current) return;
    if (!titleTextRef.current) return;
    if (!descriptionTextRef.current) return;

    let logoPosition, logoScale, logoMaterial;
    let textMaterial, textPosition, textCurrent;
    let descTextMaterial, descTextCurrent;

    let descriptionTextDuration = 2;

    if (section === 0) {
      logoPosition = new THREE.Vector3(2.4, 2.5, -2);
      logoScale = new THREE.Vector3(1.5, 1.5, 1.5);

      logoMaterial = {
        opacity: 1
      }

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
      descTextCurrent= {
        fontSize: .4,
        maxWidth: 12
      }
      descriptionTextDuration = 0.5;

      if (isMobile) {
        logoPosition = new THREE.Vector3(0.7, 0.75, -2);
        logoScale = new THREE.Vector3(0.5, 0.5, 0.5);
        textCurrent = {
          fontSize: 1.1
        }
      }

    } else if (section === 1) {
      logoPosition = new THREE.Vector3(1.28, 3.3, -2);
      logoScale = new THREE.Vector3(0.9, 0.9, 0.9);
      logoMaterial = {
        opacity: 1
      }

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
      descTextCurrent= {
        fontSize: .4,
        maxWidth: 12
      };

      if (isMobile) {
        logoPosition = new THREE.Vector3(0.7, 2.75, -2);
        logoScale = new THREE.Vector3(0.5, 0.5, 0.5);

        textCurrent = {
          fontSize: 1.1
        }

        descTextCurrent= {
          fontSize: .3,
          maxWidth: 6
        };
      }
    } else if (section === 2) {
      logoPosition = new THREE.Vector3(1.28, 3.3, -2);
      logoScale = new THREE.Vector3(0, 0, 0);
      logoMaterial = {
        opacity: 0
      }

      textMaterial = {
        opacity: 0.2
      }
      textPosition = new THREE.Vector3(0, 0, -2);
      textCurrent = {
        fontSize: 3.5
      }

      descTextMaterial = {
        opacity: 0
      }
      descTextCurrent= {
        fontSize: .4,
        maxWidth: 12
      };
      descriptionTextDuration = 0.5;

      if (isMobile) {
        textCurrent = {
          fontSize: 0.75
        }
      }

    } else {
      logoPosition = new THREE.Vector3(1.28, 3.3, -2);
      logoScale = new THREE.Vector3(0, 0, 0);
      logoMaterial = {
        opacity: 0
      }

      textMaterial = {
        opacity: 0
      }
      textPosition = new THREE.Vector3(0, 0, 0);
      textCurrent = {
        fontSize: 3.5
      }
      
      descTextMaterial = {
        opacity: 0
      }
      descTextCurrent= {
        fontSize: .4,
        maxWidth: 12
      };
    }

    gsap.to(logoRef.current.position, {
      ...logoPosition,
      duration: 1.5,
      ease: 'power3.inOut',
    });

    gsap.to(logoRef.current.scale, {
      ...logoScale,
      duration: section == 2 ? 0.1 : 1.5,
      ease: 'power3.inOut',
    });

    gsap.to(logoRef.current.material, {
      ...logoMaterial,
      duration: section == 2 ? 0.1 : 1.5,
      ease: 'power3.inOut',
    });

    // TITLE
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

    // DESCRIPTION
    gsap.to(descriptionTextRef.current, {
      ...descTextCurrent,
      duration: descriptionTextDuration,
      ease: 'power3.inOut',
    });

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
        canTargetPosition = new THREE.Vector3(0, 7, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 1:
        canTargetPosition = new THREE.Vector3(0, 7, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 2: // Product Hub (Flavors & Ingredients)
        canTargetPosition = new THREE.Vector3(0, 0, 2.5);
        canTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(0, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);

        if (isMobile) {
          canTargetPosition = new THREE.Vector3(0, 0, 1);
        }

        break;
      case 3: // Lifestyle
        canTargetPosition = new THREE.Vector3(0, 5, 4); // Move to the right
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0.3, 0);

        canLimitedTargetPosition = new THREE.Vector3(-20, 0, 0); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0, 0);
        break;
      case 4: // Call to Action
        // Animate the can down and away to put focus on the CTA text
        canTargetPosition = new THREE.Vector3(2.8, 5, 1.5); 
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0, 0);

        canLimitedTargetPosition = new THREE.Vector3(-0.1, 0, 3); 
        canLimitedTargetScale = new THREE.Vector3(1.1, 1.1, 1.1);
        canLimitedTargetRotation = new THREE.Vector3(0, 0.2, 0);

        if (isMobile) {
          canLimitedTargetPosition = new THREE.Vector3(-0.1, 0, 1);
        }
        break;
      default: // Fallback to the first section's state
        canTargetPosition = new THREE.Vector3(2.8, 5, 1.5); 
        canTargetScale = new THREE.Vector3(1.2, 1.2, 1.2);
        canTargetRotation = new THREE.Vector3(0, 0, 0);

        canLimitedTargetPosition = new THREE.Vector3(-20, 0, 3); 
        canLimitedTargetScale = new THREE.Vector3(0, 0, 0);
        canLimitedTargetRotation = new THREE.Vector3(0, 0.2, 0);
    }

    gsap.to(canGroupRef.current.position, { ...canTargetPosition, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canGroupRef.current.scale, { ...canTargetScale, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canGroupRef.current.rotation, { ...canTargetRotation, duration: 1.5, ease: 'power3.inOut' });

    gsap.to(canLimitedGroupRef.current.position, { ...canLimitedTargetPosition, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canLimitedGroupRef.current.scale, { ...canLimitedTargetScale, duration: 1.5, ease: 'power3.inOut' });
    gsap.to(canLimitedGroupRef.current.rotation, { ...canLimitedTargetRotation, duration: 1.5, ease: 'power3.inOut' });
  }, [section, isMobile]);

  function CameraRig({ section }: { section: number }) {
    useFrame((state) => {
      const { pointer } = state;
      const targetY = section === 4 ? 0.5 : pointer.y * 0.5;

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

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        ref={logoRef}
        url="/logos/folia-logo.png" // The path to your image in the /public folder
        scale={[0.1, 0.1]} // The overall size of the image in 3D units
        position={[0.7, 0.75, -2]} // Position it anywhere in your scene
        transparent // Set this to true if your image is a PNG with transparency
        opacity={0}
      />

      {}

      <Text
        ref={titleTextRef}
        font="/fonts/Poppins-Bold.ttf"
        fontSize={isMobile ? 1.1 : 4}
        color="#272d56"
        material-toneMapped={false}
        material-opacity={0} 
        position={[0, 0, -5]}
      >
        {[2, 3].includes(section) ? 'FLAVORS' : 'FOLIA'}
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
        {(section == 4 || section == 3 || section == 5) && (
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

      <Stats />
    </>
  );
};

export default function Home() {
  const [section, setSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFlavorId, setActiveFlavorId] = useState(flavors[0].id);

  const mainRef = useRef<HTMLDivElement>(null);

  const activeFlavor = flavors.find(f => f.id === activeFlavorId) || flavors[0];

  const currentBackgroundColor = [2, 3, 4, 5, 6].includes(section) ? activeFlavor.backgroundColor : sectionColors[section];
  const currentTextColor = activeFlavor.textColor;

  const { width } = useWindowSize();
  const isMobile = (width || 1920) < 768;
  console.log('width', width)

  useEffect(() => {
    if (!mainRef.current) return;

    const handleWheel = (event: WheelEvent) => {
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

  const changeSection = (newSection: number) => {
    if (isAnimating || newSection === section) return;
    if (newSection < 0 || newSection >= TOTAL_SECTIONS) return; // Prevent out-of-bounds
    
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
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      <AnimatePresence mode="wait">
        <motion.div key={section} className="ui-container">

          {section === 1 && (
            <ContinueButton 
              key="continue-btn" 
              onClick={() => changeSection(2)}
            />
          )}

          {section === 2 && <ConfiguratorUI isMobile={isMobile} key="config" activeFlavor={activeFlavor} onFlavorChange={setActiveFlavorId} flavors={flavors} textColor={currentTextColor} />}
          {section === NEW_SECTION_INDEX && <OurProcessUI isMobile={isMobile} key="process" />}
          {section === 4 && <LimitedEditionUI isMobile={isMobile} key="limited" />}
          {section === 5 && <CallToActionUI isMobile={isMobile} />}
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
