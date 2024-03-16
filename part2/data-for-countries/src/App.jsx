import {useEffect, useState} from 'react'
import countriesService from './services/countries.js'


const Filter = ( {newFilter, handleFilterChange} ) => {
    return (
        <>
            find countries <input value={newFilter} onChange={handleFilterChange}></input>
        </>
    )
}

const Country = ( {country} ) => {
    return (
        <>{country.name.common}<br/></>
    )
}

const Language = ( {language }) => {
    return (
        <li>{language}</li>
    )
}

const Countries = ( { countries, newFilter } ) => {
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
        console.log("capital", country.capital)
        console.log("languages:", country.languages)
        return (
            <div>
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
            </div>
        )
    }
    return (
        <p>
            {countries.filter(
                c => c.name.common.toLowerCase().includes(newFilter.toLowerCase().trim())
            ).map(country =>
                <Country key={country.name.common} country={country} />
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

    return (
        <div>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <Countries countries={countries} newFilter={newFilter} />
        </div>
    )
}

export default App
