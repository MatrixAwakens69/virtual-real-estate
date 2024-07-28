import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

function ThreeDTour({ modelPath }) {
  const mountRef = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.15;
    // controls.screenSpacePanning = false;

    const controls = new FirstPersonControls(camera, renderer.domElement);
    controls.lookSpeed = 0.1;
    controls.movementSpeed = 0.3;
    controls.noFly = true;
    controls.lookVertical = true;
    controls.activeLook = false;

    const enableLook = (event) => {
      controls.activeLook = true;
      initialMousePosition.current = { x: event.clientX, y: event.clientY };
      renderer.domElement.style.cursor = "grabbing";
    };
    const disableLook = () => {
      controls.activeLook = false;
      renderer.domElement.style.cursor = "default";
    };

    const handleMouseMove = (event) => {
      if (controls.activeLook) {
        const deltaX = event.clientX - initialMousePosition.current.x;
        const deltaY = event.clientY - initialMousePosition.current.y;
        console.log(deltaX, deltaY);
        const rotationX = deltaX * 0.002;
        const rotationY = deltaY * 0.002;
        camera.rotation.y -= rotationX;
        camera.rotation.x -= rotationY;
        initialMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    renderer.domElement.addEventListener("mousedown", (event) => {
      if (event.button === 0) enableLook(event);
    });

    renderer.domElement.addEventListener("mouseup", (event) => {
      if (event.button === 0) disableLook();
    });

    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      scene.add(gltf.scene);
      renderer.render(scene, camera);
    });

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      //   controls.update();
      controls.update(0.1);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener("mousedown", enableLook);
      renderer.domElement.removeEventListener("mouseup", disableLook);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [modelPath]);

  return <div ref={mountRef}></div>;
}

export default ThreeDTour;
