import Game from "../../src/tictactoe.js";

export const metadata = {
  title: 'React Tic Tac Toe game',
  description: 'React Tic Tac Toe game',
}

export default function Home() {
  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <p>Example exercise from the <a href="https://react.dev/learn/tutorial-tic-tac-toe">official React Getting Started site</a>.</p>
      <Game />
    </main>
  )
}
