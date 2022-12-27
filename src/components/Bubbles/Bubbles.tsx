import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane, useCompoundBody, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import css from './Bubbles.module.scss';
import { useLocation } from 'wouter';
import isMobile from 'is-mobile';

const bubbleMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
    color: '#fff',
    emissive: '#fff',
});

const capMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    color: '#3295a8',
    emissive: '#3295a8',
    envMapIntensity: 1,
});

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const bubbles = [...Array(30)].map(() => ({
    args: [0.6, 0.6, 0.8, 0.8, 1.5][Math.floor(Math.random() * 5)],
    mass: 3,
    angularDamping: 0.1,
    linearDamping: 0.95,
}));

function Bubble({ vec = new THREE.Vector3(), ...props }) {
    const [ref, api] = useCompoundBody(() => ({
        ...props,
        shapes: [
            {
                type: 'Sphere',
                position: [0, Math.random() * 1 - 0.5, 1.2 * props.args],
                args: new THREE.Vector3().setScalar(props.args * 0.1).toArray(),
            },
            { type: 'Sphere', args: [props.args][Math.floor(Math.random() * 5)] },
        ],
    }));

    useEffect(
        () =>
            api.position.subscribe((p) =>
                api.applyForce(
                    vec
                        .set(...p)
                        .normalize()
                        .multiplyScalar(-props.args * 35)
                        .toArray(),
                    [0, 0, 0],
                ),
            ),
        [api],
    );

    return (
        // @ts-ignore - group ref is not playing nice with typescript
        <group ref={ref} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                scale={props.args}
                geometry={sphereGeometry}
                material={bubbleMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                position={[0, 0, 1.3 * props.args]}
                scale={0.2 * props.args}
                geometry={sphereGeometry}
                material={capMaterial}
            />
        </group>
    );
}

function Collisions() {
    const viewport = useThree((state) => state.viewport);
    usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }));
    usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }));
    usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }));
    usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }));
    const [, api] = useSphere(() => ({ type: 'Kinematic', args: [2] }));

    return useFrame((state) =>
        api.position.set(
            (state.mouse.x * viewport.width) / 2,
            (state.mouse.y * viewport.height) / 2,
            2.5,
        ),
    );
}

export default () => {
    const [location] = useLocation();

    useEffect(() => {
        console.log();
    }, [location]);

    return (
        <div className={css.container}>
            <Canvas
                shadows
                dpr={1.5}
                gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
                camera={{ position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
                onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
                <ambientLight intensity={0.75} />
                <spotLight
                    position={[20, 20, 25]}
                    penumbra={1}
                    angle={0.2}
                    color='white'
                    castShadow
                    shadow-mapSize={[512, 512]}
                />
                <directionalLight position={[0, -5, -4]} intensity={8} />
                <directionalLight position={[0, 5, -0]} intensity={34} color='blue' />

                <Physics gravity={[0, 0, 0]} iterations={10} broadphase='SAP'>
                    {(location === '/' || !isMobile()) && <Collisions />}
                    {bubbles.map((props, i) => (
                        <Bubble key={i} {...props} />
                    ))}
                </Physics>
                <EffectComposer multisampling={0}>
                    <SSAO samples={5} radius={10} luminanceInfluence={0.7} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};
