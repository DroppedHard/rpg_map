import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <main>
      <h1>Welcome to the demo of RPG_MAP project.</h1>
      <p>For now I've just declared an example character and tried my best to make him move properly. In this sample demo you move Aj (the boy) around rocky plane with a random toy train drifting around.</p>
      <h3>Controls:</h3>
      <ul>
        <li><b>W</b> - move forward</li>
        <li><b>A</b> - turn left</li>
        <li><b>S</b> - turn around</li>
        <li><b>D</b> - turn right</li>
      </ul>
      <Link href="/scene">Check it out!</Link>
      <p>Project made using React + Next.js with Three.js (without React's Drei usage).</p>
    </main>
    </>
  )
}
