import { useEffect, useRef } from "react";
import World from './World';

function Three() {
    const refContainer = useRef(null);
    useEffect(() => {
        var world = new World()
        var renderer = world.renderer

        refContainer.current && refContainer.current.appendChild(renderer.domElement);

        world.init().then(() => {
            world.start();
        }).catch((err) => {
            console.error(err)
        })
    }, []);
    return (
        <div ref={refContainer}></div>

    );
}

export default Three