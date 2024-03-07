import { useState } from 'react'
import './App.css';

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({text, value, isPercentage}) => (
    <p>{text} {value} {isPercentage ? " %" : ""}</p>
)

const Statistics = ({stats}) => {
    if (stats[3] === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <StatisticLine text={"good "} value={stats[0]} />
                <StatisticLine text={"neutral "} value={stats[1]} />
                <StatisticLine text={"bad "} value={stats[2]} />
                <StatisticLine text={"all "} value={stats[3]} />
                <StatisticLine text={"average "} value={stats[4]} />
                <StatisticLine text={"positive "} value={stats[5]} isPercentage={true} />
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
