import { useState } from 'react'
import './App.css';

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Text = ({text}) => <p>{text}</p>

const Statistics = ({stats}) => {
    if (stats[3] === 0) {
        return (
            <div>
                <Header text={"statistics"} />
                <Text text={"No feedback given"} />
            </div>
        )
    } else {
        return (
            <div>
                <Header text={"statistics"} />
                <Text text={"good " + stats[0]} />
                <Text text={"neutral " + stats[1]} />
                <Text text={"bad " + stats[2]} />
                <Text text={"all " + stats[3]} />
                <Text text={"average " + stats[4]} />
                <Text text={"positive " + stats[5] + " %"} />
            </div>
        )
    }
}

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

            <Statistics stats={[good, neutral, bad, all, average, positive]} />
        </div>
    )
}

export default App
