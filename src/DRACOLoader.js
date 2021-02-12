// Sample of loading glb objects

import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Reference: https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
 */

function main () {
  // create canvas and renderer
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas })

  // create camera
  const fov = 75
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 5

  // create scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)
  scene.environment = new THREE.CubeTextureLoader()
    .setPath('models/env/')
    .load([
      'pos-x.png',
      'neg-x.png',
      'pos-y.png',
      'neg-y.png',
      'pos-z.png',
      'neg-z.png'
    ])

  // create light and add to scene
  const color = 0xffffff
  const intensity = 3
  const light = new THREE.PointLight(color, intensity)
  light.position.set(0, 0, 0)
  scene.add(light)

  // Example
  let gltfscene = null
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('lib/draco/gltf/')
  dracoLoader.preload()

  const loader = new GLTFLoader().setPath('models/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('ico-more.glb', (gltf) => {
    gltfscene = gltf.scene
    console.log(gltfscene)

    // Apply material
    const objects = gltfscene.children[0].children[0].children
    objects.forEach(obj => {
      if (obj.material) {
        obj.material.emissive = new THREE.Color(0x0000FF)
        obj.material.emissiveIntensity = 0.5
        obj.rotation.x = 0.3
      } else {
        obj.children[0].material.emissive = new THREE.Color(0x99CCBB)
        obj.children[0].material.emissiveIntensity = 0.8
        obj.children[0].rotation.x = 0.3
        obj.children[1].rotation.x = 0.3
      }
    })
    scene.add(gltfscene)
  }, undefined, function (error) {
    console.error(error)
  })
  // Example end

  // Manage window resize and ratio of canvas
  // Reference: https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
  function resizeRendererToDisplaySize (renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  // start animation
  function render (time) {
    time *= 0.001 // convert time to seconds
    const canvas = renderer.domElement
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()

    // Create you animation update
    if (gltfscene) {
      const rot = time
      gltfscene.rotation.x = rot
      gltfscene.rotation.y = rot / 2
      gltfscene.rotation.z = rot / 3
    }
    // Example end

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
