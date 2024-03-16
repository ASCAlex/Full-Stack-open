import {useEffect, useState} from 'react'
import countriesService from './services/countries.js'


const Filter = ( {newFilter, handleFilterChange} ) => {
    return (
        <>
            find countries <input value={newFilter} onChange={handleFilterChange}></input>
        </>
    )
}

const Country = ( {country, handleShowClick} ) => {
    return (
        <>{country.name.common}<button onClick={() => handleShowClick(country.name.common)}>show</button><br/></>
    )
}

const DetailedCountry = ( {country} ) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital} <br/>
                area {country.area}
            </p>
            <h2>languages:</h2>
            <ul>
                {Object.entries(country.languages).map(([code, name]) => (
                    <Language key={code} language={name} />
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
        </>
    )
}

const Language = ( {language }) => {
    return (
        <li>{language}</li>
    )
}

const Countries = ( { countries, newFilter, handleShowClick} ) => {
    const filteredCountries = countries.filter(
        c => c.name.common.toLowerCase().includes(newFilter.toLowerCase().trim())
    )

    if (filteredCountries.length > 10) {
        return (
            <p>
                Too many matches, specify the filter
            </p>
        )
    }
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
            <div>
                <DetailedCountry country={country} />
            </div>
        )
    }
    return (
        <p>
            {countries.filter(
                c => c.name.common.toLowerCase().includes(newFilter.toLowerCase().trim())
            ).map(country =>
                <Country key={country.name.common} country={country} handleShowClick={handleShowClick}/>
            )}
        </p>
    )
}

function App() {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        countriesService.getAll()
            .then(response => {
                setCountries(response)
            })
    }, []);

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleShowClick = (name) => {
        setNewFilter(name)
    }

    return (
        <div>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <Countries countries={countries} newFilter={newFilter} handleShowClick={handleShowClick}/>
        </div>
    )
}

export default App
