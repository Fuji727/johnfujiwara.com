import Game from "../src/app";

export const metadata = {
  title: 'John Fujiwara - Team-Focused Principal Developer',
  description: 'Team-Focused Principal Developer, C#, ASP.NET, Next.js, React, .NET7 WebAPI, Javascript, CSS, SQL',
}

export default function Home() {
  return (
    <main>
      <h1>Demos</h1>
      <Game />
    </main>
  )
}
