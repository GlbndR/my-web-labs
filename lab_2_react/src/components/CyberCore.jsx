import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Float, Line, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

// 1. Компонент окремого вузла (Роутер, Сервер, ПК)
function HardwareNode({ position, label, specs, type = 'pc' }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()

  useFrame(() => {
    // Анімація збільшення при наведенні
    const scale = hovered ? 1.2 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    // Легке обертання
    meshRef.current.rotation.y += 0.01
    if (type === 'router') meshRef.current.rotation.z += 0.005
  })

  // Неоново-бірюзовий при наведенні, інакше - технологічний синій
  const color = hovered ? "#00ffcc" : "#3b82f6"
  const emissive = hovered ? "#00ffcc" : "#1e40af"

  return (
    <group position={position}>
      {/* Форма залежить від типу пристрою */}
      {type === 'router' && (
        <Cylinder ref={meshRef} args={[0.6, 0.6, 0.2, 16]} rotation={[Math.PI/2, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={hovered ? 1.5 : 0.8} wireframe={!hovered} />
        </Cylinder>
      )}
      {type === 'server' && (
        <Box ref={meshRef} args={[0.6, 0.8, 0.4]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={hovered ? 1.5 : 0.8} wireframe={!hovered} />
        </Box>
      )}
      {type === 'pc' && (
        <Box ref={meshRef} args={[0.4, 0.4, 0.4]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={hovered ? 1.5 : 0.8} wireframe={!hovered} />
        </Box>
      )}

      {/* Голографічна панель характеристик, що з'являється при наведенні */}
      {hovered && (
        <Html position={[0.6, 0.6, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-slate-900/95 border border-cyan-500/50 p-3 rounded-lg shadow-[0_0_15px_rgba(0,255,204,0.3)] text-left w-56 backdrop-blur-sm pointer-events-none">
            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">{label}</h4>
            <div className="text-slate-300 font-mono text-[10px] space-y-1">
              {specs.map((spec, i) => (
                <p key={i}><span className="text-slate-500">{spec.name}:</span> <span className="text-green-400">{spec.val}</span></p>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// 2. Анімований пакет даних
function Packet({ start, end, speed = 0.5 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * speed) % 1
    ref.current.position.lerpVectors(new THREE.Vector3(...start), new THREE.Vector3(...end), t)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#00ffcc" />
    </mesh>
  )
}

// 3. Збірка інфраструктури
function HardwareNetwork() {
  // Координати вузлів у 3D просторі
  const nodes = {
    core: [0, 0, 0],
    server: [-2.5, 1.5, -1],
    kali: [2.5, 1.5, -1],
    laptop: [-1.5, -1.5, 1.5],
    gaming: [1.5, -1.5, 1.5],
  }

  return (
    <group>
      {/* Основа - стилізація під материнську плату / сітку */}
      <gridHelper args={[12, 24, "#1e40af", "#0f172a"]} position={[0, -2.5, 0]} />

      {/* Мережеві та апаратні вузли */}
      <HardwareNode 
        type="router" position={nodes.core} 
        label="TP-Link Master Gateway" 
        specs={[{name: 'WLAN Config', val: 'Channels Optimized'}, {name: 'Security', val: 'WPA3 / MAC Filter'}, {name: 'Ping', val: '< 1ms (Stable)'}]} 
      />
      <HardwareNode 
        type="server" position={nodes.server} 
        label="Lviv Data Hub" 
        specs={[{name: 'Role', val: 'Web Server / CI-CD'}, {name: 'Deployment', val: 'Vercel / GitHub Actions'}, {name: 'Uptime', val: '99.9%'}]} 
      />
      <HardwareNode 
        type="server" position={nodes.kali} 
        label="SecOps Virtual Machine" 
        specs={[{name: 'OS', val: 'Kali Linux (Active)'}, {name: 'Tools', val: 'Nmap, Wireshark, Nessus'}, {name: 'Lab Status', val: 'Defense Ready'}]} 
      />
      <HardwareNode 
        type="pc" position={nodes.laptop} 
        label="Mobile Terminal (G5)" 
        specs={[{name: 'Hardware', val: 'Dell G5 5587'}, {name: 'Optimization', val: 'Thermal & Power Tuned'}, {name: 'Peripherals', val: 'Ajazz AK820 Pro (Custom)'}]} 
      />
      <HardwareNode 
        type="pc" position={nodes.gaming} 
        label="High-Load Rig" 
        specs={[{name: 'Network QoS', val: 'Priority: DayZ/PUBG'}, {name: 'Performance', val: 'Maximized FPS'}, {name: 'Latency', val: 'Jitter-free'}]} 
      />

      {/* Оптоволоконні з'єднання та трафік */}
      {Object.entries(nodes).map(([key, pos]) => {
        if (key !== 'core') {
          // Рандомізуємо швидкість пакетів для реалістичності
          const speed1 = Math.random() * 0.3 + 0.3;
          const speed2 = Math.random() * 0.3 + 0.3;
          return (
            <group key={key}>
              <Line points={[nodes.core, pos]} color="#3b82f6" lineWidth={1} />
              <Packet start={nodes.core} end={pos} speed={speed1} />
              <Packet start={pos} end={nodes.core} speed={speed2} />
            </group>
          )
        }
        return null
      })}
    </group>
  )
}

// 4. Головний рендер
export default function CyberCore() {
  return (
    <div className="relative h-[550px] w-full rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(30,64,175,0.3)] border border-slate-700 bg-slate-900 cursor-crosshair">
      <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
        {/* Освітлення сцени */}
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 5, 0]} intensity={2.5} color="#00ffcc" />
        <directionalLight position={[5, 3, 5]} intensity={1} color="#3b82f6" />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <HardwareNetwork />
        </Float>
        
        {/* Дозволяємо крутити сцену мишкою */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <p className="text-cyan-400 font-mono text-xs uppercase animate-pulse">Hardware & Network Topology</p>
        <p className="text-slate-500 font-mono text-[10px]">Hover nodes for hardware specs</p>
      </div>
    </div>
  )
}