import * as THREE from 'three';

import { useEffect, useRef } from "react";
import World from './World';

function Three() {
    const config = {
        width:800,
        height:450,
        ratio:16/9,
    }

    const refContainer = useRef(null);
    useEffect(() => {
        var world = new World()
        var renderer = world.renderer

        refContainer.current && refContainer.current.appendChild(renderer.domElement);

        world.initializeScene();
        
        world.startAnimation();
    }, []);
    return (
        <div ref={refContainer}></div>

    );
}

export default Three