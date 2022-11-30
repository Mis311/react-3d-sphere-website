import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';
import { useRef, useState } from 'react';
import { config, useSpring, animated } from '@react-spring/three';


function Box(props){
  const ref= useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const {scale} = useSpring({
    scale: clicked? 2 :1,
    config: config.wobbly
  })
  useFrame(()=>{
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  })

  return(
    <animated.mesh {...props} ref={ref} scale={scale} onClick={()=>setClicked(!clicked)}  onPointerOver={()=>setHovered(true)} onPointerOut={()=>setHovered(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered? "hotpink":"orange"} />
    </animated.mesh>
  );
}


function App() {
  return (
    <>    <div id="canvas-container">
        <Canvas>
          <mesh>
            <Box position={[-1.6, 0,0]} />
            <Box position={[1.6, 0,0]}/>
            <ambientLight intensity={1}></ambientLight>
            <spotLight position={[10,10,10]} angle={0.15} penumbra={1}></spotLight>
            <pointLight position={[-10,-10,-10]}></pointLight>
          </mesh>
        </Canvas>
      </div>
      <h1>Three JS Fiber</h1>
      <a href='#'>Check Details</a>
    </>

  );
}

export default App;
