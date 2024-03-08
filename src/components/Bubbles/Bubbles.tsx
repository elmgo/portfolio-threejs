import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
	Physics,
	usePlane,
	useCompoundBody,
	useSphere,
} from '@react-three/cannon';
import css from './Bubbles.module.scss';
import { useLocation } from 'wouter';
import isMobile from 'is-mobile';
// import { EffectComposer, SSAO } from '@react-three/postprocessing';

const bubbleMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial(
	{
		color: '#fff',
		emissive: '#fff1c8',
		// transparent: true,
	},
);

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
	1,
	28,
	28,
);
const bubbles = [...Array(35)].map(() => ({
	args: [0.6, 0.6, 0.8, 0.8, 1.5][Math.floor(Math.random() * 5)],
	mass: 3,
	angularDamping: 0.1,
	linearDamping: 0.95,
}));

function gaussRandom(center: number, spread: number) {
	return center + (Math.random() * 2 - 1) * spread;
}

function Bubble({ vec = new THREE.Vector3(), ...props }) {
	const centerBias: number = 0.1;
	const spread: number = 1;
	const [ref, api] = useCompoundBody(() => ({
		...props,
		position: [
			gaussRandom(centerBias, spread), // Random position along x-axis
			gaussRandom(centerBias, spread), // Random position along y-axis
			gaussRandom(centerBias, spread), // Random position along z-axis
		],
		shapes: [
			{
				type: 'Sphere',
				args: [props.args][Math.floor(Math.random() * 5)],
			},
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
				scale={props.args}
				geometry={sphereGeometry}
				material={bubbleMaterial}
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
	const [, api] = useSphere(() => ({ type: 'Dynamic', args: [2] }));

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

	return (
		<div className={css.container}>
			<Canvas
				shadows
				dpr={1.5}
				gl={{
					alpha: true,
					stencil: false,
					depth: false,
					antialias: false,
				}}
				camera={{ position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
				onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
				{/* <ambientLight intensity={0.5} /> */}
				<spotLight
					position={[20, 20, 25]}
					penumbra={2}
					angle={0.4}
					castShadow
					shadow-mapSize={[512, 512]}
				/>
				<directionalLight
					position={[0, -5, -4]}
					intensity={8}
					color='#fff'
				/>
				{!isMobile() && (
					<>
						<directionalLight
							position={[0, 5, -0]}
							intensity={34}
							color='blue'
						/>
						{/* <EffectComposer multisampling={0}> */}
						{/* <SSAO samples={0} radius={0} luminanceInfluence={0} /> */}
						{/* </EffectComposer> */}
					</>
				)}
				<Physics gravity={[0, 0, 0]} iterations={20} broadphase='SAP'>
					{(location === '/' || !isMobile()) && <Collisions />}
					{bubbles.map((props, i) => (
						<Bubble key={i} {...props} />
					))}
				</Physics>
			</Canvas>
		</div>
	);
};
