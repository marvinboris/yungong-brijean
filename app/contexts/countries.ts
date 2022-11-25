import { createContext, useContext } from 'react'

import CountryType from '../types/country'

type Type = CountryType[] | null

const CountriesContext = createContext<{ countries: Type, setCountries: (countries: Type) => void }>({ countries: null, setCountries: (countries: Type) => { } })

export const useCountriesContext = () => useContext(CountriesContext);

export default CountriesContext