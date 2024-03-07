import { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Stats = ({text, count}) => (
    <p>
        {text[0]} {count[0]} <br/>
        {text[1]} {count[1]} <br/>
        {text[2]} {count[2]}
    </p>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text={"give feedback!"} />

            <Button onClick={() => setGood(good + 1)} text={"good"} />
            <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
            <Button onClick={() => setBad(bad + 1)} text={"bad"} />

            <Header text={"statistics"} />
            <Stats text={["good", "neutral", "bad"]} count={[good, neutral, bad]} />


        </div>
    )
}

export default App
