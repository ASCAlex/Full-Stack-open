
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

const Display = ({courses}) => {
    return (
            <>
                {courses.map(course =>
                    <Course key={course.id} course={course} />
                )}
            </>
        )
}

const App = () => {
    const courses = [
        {
            id: 1,
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return <Display courses={courses} />
}

export default App