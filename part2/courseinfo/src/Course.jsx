const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Total of {sum} exercises</b>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>

const Course = ({course: {name, parts}}) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={totalExercises} />
        </div>
    )
}

export default Course