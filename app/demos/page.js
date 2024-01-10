import Link from "next/link";
import Game from "../src/tictactoe";

export const metadata = {
  title: 'John Fujiwara - Team-Focused Principal Developer',
  description: 'Team-Focused Principal Developer, C#, ASP.NET, Next.js, React, .NET7 WebAPI, Javascript, CSS, SQL',
}

export default function Home() {
  return (
    <main>
      <h1>Demos</h1>
      <ul>
        <li><Link href="/demos/tictactoe">React Tic Tac Toe game</Link></li>
      </ul>
    </main>
  )
}
