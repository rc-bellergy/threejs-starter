import './style.css'
import * as THREE from 'three'
import { MeshToonMaterial } from 'three'

/**
 * Reference: https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html
 */

function main () {
  // create canvas and renderer
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas })

  // create camera
  const fov = 40
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 120

  // create scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x999999)

  // create light and add to scene
  const color = 0xFFFFFF
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)

  // Example: create your objects below
  const objects = []
  const spread = 15
  const addObject = (x, y, obj) => {
    obj.position.x = x * spread
    obj.position.y = y * spread
    scene.add(obj)
    objects.push(obj)
  }
  // create random colour mererial
  const createMaterial = () => {
    const material = new THREE.MeshPhysicalMaterial({
      side: THREE.DoubleSide
    })
    const hue = Math.random()
    const saturation = 1
    const luminance = 0.5
    material.color.setHSL(hue, saturation, luminance)
    return material
  }
  const addSolidGeometry = (x, y, geometry) => {
    const mesh = new THREE.Mesh(geometry, createMaterial())
    addObject(x, y, mesh)
  }
  const addEdgesGeometry = (x, y, geometry, thresholdAngle = 1) => {
    const edges = new THREE.EdgesGeometry(geometry, thresholdAngle)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))
    addObject(x, y, line)
  }
  const addWireframeGeometry = (x, y, geometry) => {
    const wireframe = new THREE.WireframeGeometry(geometry)
    const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xffffff }))
    addObject(x, y, line)
  }

  // create the samples
  addSolidGeometry(-3, 2, new THREE.BoxBufferGeometry(7, 7, 7)) // width, height, depth
  addSolidGeometry(-2, 2, new THREE.CircleBufferGeometry(6, 24)) // radius, segments
  addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(6, 24, Math.PI * 0.25, Math.PI * 1.5)) // radius, segments, thetaStart, thetaLength (0-2 * PI)
  addSolidGeometry(0, 2, new THREE.ConeBufferGeometry(6, 5, 20)) // radius, height, radialSegments
  addSolidGeometry(1, 2, new THREE.ConeBufferGeometry(5, 7, 20, 4, false, Math.PI * 1, Math.PI * 1.5)) // radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
  addSolidGeometry(2, 2, new THREE.CylinderBufferGeometry(4, 4, 8, 20)) // radiusTop, radiusBottom, height, radialSegments
  addSolidGeometry(3, 2, new THREE.CylinderBufferGeometry(4, 4, 8, 20, 2, false, Math.PI * 0.25, Math.PI * 1.5)) // radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
  addSolidGeometry(-3, 1, new THREE.DodecahedronBufferGeometry(6)) // radius
  addSolidGeometry(-2, 1, new THREE.DodecahedronBufferGeometry(6, 1)) // radius, detail
  addSolidGeometry(-1, 1, new THREE.IcosahedronBufferGeometry(6)) // radius
  addSolidGeometry(0, 1, new THREE.IcosahedronBufferGeometry(6, 1)) // radius, detail
  addSolidGeometry(1, 1, new THREE.OctahedronBufferGeometry(6)) // radius
  addSolidGeometry(2, 1, new THREE.OctahedronBufferGeometry(6, 1)) // radius, detail
  addSolidGeometry(3, 1, new THREE.PlaneBufferGeometry(9, 9)) // width, height
  addSolidGeometry(-3, 0, new THREE.PlaneBufferGeometry(9, 9, 2, 2)) // width, height, widthSegments, heightSegments
  addSolidGeometry(-2, 0, new THREE.RingBufferGeometry(2, 6, 18)) // innerRadius, outerRadius, thetaSegments
  addSolidGeometry(-1, 0, new THREE.RingBufferGeometry(2, 6, 18, 2, Math.PI * 0.25, Math.PI * 1.5)) // innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength
  addSolidGeometry(0, 0, new THREE.SphereBufferGeometry(6, 12, 8)) // radius, widthSegments, heightSegments
  addSolidGeometry(1, 0, new THREE.SphereBufferGeometry(6, 12, 8, Math.PI * 0.25, Math.PI * 1.5, Math.PI * 0.25, Math.PI * 0.5)) // radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
  addSolidGeometry(2, 0, new THREE.TetrahedronBufferGeometry(7)) // radius
  addSolidGeometry(3, 0, new THREE.TetrahedronBufferGeometry(7, 2)) // radius, detail
  addSolidGeometry(-3, -1, new THREE.TorusBufferGeometry(5, 2, 7, 24)) // radius, tubeRadius, radialSegments, tubularSegments
  addSolidGeometry(-2, -1, new THREE.TorusKnotBufferGeometry(3.5, 1.5, 64, 12, 2, 3)) // radius, tubeRadius, tubularSegments, radialSegments, p, q
  // (EdgesGeometry) https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html#Diagram-EdgesGeometry
  addEdgesGeometry(-1, -1, new THREE.BoxBufferGeometry(7, 7, 7, 1, 1, 1)) // width, height, widthSegments, heightSegments, depthSegments
  addEdgesGeometry(0, -1, new THREE.SphereBufferGeometry(6, 6, 3), 1) // (radius, widthSegments, heightSegments), thresholdAngle
  // (WireframeGeometry) https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html#Diagram-WireframeGeometry
  addWireframeGeometry(1, -1, new THREE.BoxBufferGeometry(7, 7, 7, 2, 2, 2))
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

    // Create you animation update:
    // Example: move 3 cubes
    objects.forEach((obj, i) => {
      const speed = 1 + i * 0.1
      const rot = time * speed
      obj.rotation.x = rot
      obj.rotation.y = rot
    })
    // Example end

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
