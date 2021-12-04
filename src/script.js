import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import boilerVertexShader from './shaders/vertex.glsl'
import boilerFragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x132020)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 1.5
camera.position.z = 2.5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Sphere
 */

const geometry = new THREE.BoxBufferGeometry(1,1,1)

let shaderMaterial = null

shaderMaterial= new THREE.ShaderMaterial({
    vertexShader:boilerVertexShader,
    fragmentShader:boilerFragmentShader,
    wireframe:true,
    uniforms:{
        uTime:{value:0}
    }


})

const Sphere = new THREE.Mesh(geometry,shaderMaterial)

scene.add(Sphere)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const animateScene = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    //Update shader with time
    shaderMaterial.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call animateScene again on the next frame
    window.requestAnimationFrame(animateScene)
}

animateScene()