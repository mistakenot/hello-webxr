import {DebugHelper, BoundingBox} from '../components/index.js';
import {System, SystemStateComponent, Not} from '../vendor/ecsy.module.js';
import * as THREE from 'three';

THREE.BoxHelper.prototype.setFromMinMax = function(min, max) {
	var position = this.geometry.attributes.position;
	var array = position.array;

	array[ 0 ] = max.x; array[ 1 ] = max.y; array[ 2 ] = max.z;
	array[ 3 ] = min.x; array[ 4 ] = max.y; array[ 5 ] = max.z;
	array[ 6 ] = min.x; array[ 7 ] = min.y; array[ 8 ] = max.z;
	array[ 9 ] = max.x; array[ 10 ] = min.y; array[ 11 ] = max.z;
	array[ 12 ] = max.x; array[ 13 ] = max.y; array[ 14 ] = min.z;
	array[ 15 ] = min.x; array[ 16 ] = max.y; array[ 17 ] = min.z;
	array[ 18 ] = min.x; array[ 19 ] = min.y; array[ 20 ] = min.z;
	array[ 21 ] = max.x; array[ 22 ] = min.y; array[ 23 ] = min.z;

	position.needsUpdate = true;

	this.geometry.computeBoundingSphere();
}

class DebugHelperMesh extends SystemStateComponent {
  constructor() {
    super();
    this.boxHelper = new THREE.BoxHelper();
  }
}

export class DebugHelperSystem extends System {
  execute(delta, time) {
    var added = this.queries.added.results;
    for (let i = 0; i < added.length; i++) {
      var entity = added[i];
      var boundingBox = entity.getComponent(BoundingBox);
      entity.addComponent(DebugHelperMesh);
      let debugMesh = entity.getMutableComponent(DebugHelperMesh);
      debugMesh.boxHelper.setFromMinMax(boundingBox.min, boundingBox.max);
      window.context.scene.add(debugMesh.boxHelper);
    }
  }
}

DebugHelperSystem.queries = {
  added: {
    components: [DebugHelper, Not(DebugHelperMesh)],
  },
  removed: {
    components: [Not(DebugHelper), DebugHelperMesh]
  }
}
