import { useState } from 'react'
import './App.css';

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Text = ({text}) => <p>{text}</p>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = all !== 0 ? (good - bad) / (good + neutral + bad) : 0
    const positive = good !== 0 ? good / all * 100 : 0

    return (
        <div>
            <Header text={"give feedback!"} />

            <Button onClick={() => setGood(good + 1)} text={"good"} />
            <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
            <Button onClick={() => setBad(bad + 1)} text={"bad"} />

            <Header text={"statistics"} />
            <Text text={"good " + good} />
            <Text text={"neutral " + neutral} />
            <Text text={"bad " + bad} />
            <Text text={"all " + all} />
            <Text text={"average " + average} />
            <Text text={"positive " + positive + " %"} />


        </div>
    )
}

export default App
