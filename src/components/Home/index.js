/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'

import SearchResultItem from '../SearchResultItem'

import StateDetailsItem from '../StateDetailsItem'

import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    countryWideList: [],
    filteredStateList: [],
    activeStateId: null,
  }

  componentDidMount() {
    this.getCovid19Stats()
  }

  convertObjectsDataIntoList = fetchedData => {
    const resultList = []

    // obtaining keys from fetched object

    statesList.forEach(eachStateObject => {
      if (fetchedData[eachStateObject.state_code] !== undefined) {
        const {total} = fetchedData[eachStateObject.state_code]

        // if the state's covid data is available we will store it or we will store 0

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = fetchedData[eachStateObject.state_code].meta
          .population
          ? fetchedData[eachStateObject.state_code].meta.population
          : 0

        const stateName = eachStateObject.state_name

        resultList.push({
          stateCode: eachStateObject.state_code,
          name: stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })

    return resultList
  }

  getCovid19Stats = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.convertObjectsDataIntoList(fetchedData)

      this.setState({
        countryWideList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  sortInAscendingOrder = () => {
    const {countryWideList} = this.state
    const sortedCountryWideList = countryWideList.sort((a, b) => {
      const firstCountryName = a.name.toLowerCase()
      const secondCountryName = b.name.toLowerCase()

      if (firstCountryName > secondCountryName) {
        return 1
      }
      if (firstCountryName < secondCountryName) {
        return -1
      }
      return 0
    })

    this.setState({countryWideList: sortedCountryWideList})
  }

  sortInDescendingOrder = () => {
    const {countryWideList} = this.state
    const sortedCountryWideList = countryWideList.sort((a, b) => {
      const firstCountryName = a.name.toLowerCase()
      const secondCountryName = b.name.toLowerCase()

      if (firstCountryName < secondCountryName) {
        return 1
      }
      if (firstCountryName > secondCountryName) {
        return -1
      }
      return 0
    })

    this.setState({countryWideList: sortedCountryWideList})
  }

  renderStateWiseCovidDataTable = () => {
    const {countryWideList} = this.state

    return (
      <div className="all-states-data-table" testid="stateWiseCovidDataTable">
        <div className="all-states-data-table-header">
          <div className="state-and-ut-title-container">
            <p className="state-and-ut-title">States/UT</p>
            <button
              type="button"
              className="sort-btn"
              onClick={this.sortInAscendingOrder}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc className="sort-icon" />
            </button>
            <button
              type="button"
              className="sort-btn"
              onClick={this.sortInDescendingOrder}
              testid="descendingSort"
            >
              <FcGenericSortingDesc className="sort-icon" />
            </button>
          </div>
          <div className="other-titles-container">
            <p className="other-header-title">Confirmed</p>
            <p className="other-header-title">Active</p>
            <p className="other-header-title">Recovered</p>
            <p className="other-header-title">Deceased</p>
            <p className="other-header-title">Population</p>
          </div>
        </div>
        <ul className="all-states-data-list">
          {countryWideList.map(eachState => (
            <StateDetailsItem
              key={eachState.stateCode}
              stateDetails={eachState}
            />
          ))}
        </ul>
      </div>
    )
  }

  onChangeSearchInput = event => {
    const newSearch = event.target.value
    const updatedSearchList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(newSearch.toLowerCase()),
    )
    this.setState({
      searchInput: newSearch,
      filteredStateList: updatedSearchList,
    })
  }

  onChangeActiveStateId = activeStateId => {
    this.setState({activeStateId})
  }

  renderCountryWideStats = () => {
    const {countryWideList} = this.state

    const countryWideConfirmedArray = countryWideList.map(
      eachState => eachState.confirmed,
    )
    const countryWideActiveArray = countryWideList.map(
      eachState => eachState.active,
    )
    const countryWideRecoveredArray = countryWideList.map(
      eachState => eachState.recovered,
    )
    const countryWideDeceasedArray = countryWideList.map(
      eachState => eachState.deceased,
    )
    const totalConfirmedCases = countryWideConfirmedArray.reduce(
      (a, b) => a + b,
      0,
    )
    const totalActiveCases = countryWideActiveArray.reduce((a, b) => a + b, 0)
    const totalRecoveredCases = countryWideRecoveredArray.reduce(
      (a, b) => a + b,
      0,
    )
    const totalDeceasedCases = countryWideDeceasedArray.reduce(
      (a, b) => a + b,
      0,
    )

    return (
      <div className="countrywide-stats-container">
        <div
          className="countrywide-stat-card red-country-card"
          testid="countryWideConfirmedCases"
        >
          <p className="countrywide-stat-card-title">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Confirmed_uqfikx.png"
            className="countrywide-stat-card-image"
            alt="country wide confirmed cases pic"
          />
          <p className="countrywide-stat-card-count">{totalConfirmedCases}</p>
        </div>
        <div
          className="countrywide-stat-card blue-country-card"
          testid="countryWideActiveCases"
        >
          <p className="countrywide-stat-card-title">Active</p>
          <img
            src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Active_cmlwhz.png"
            className="countrywide-stat-card-image"
            alt="country wide active cases pic"
          />
          <p className="countrywide-stat-card-count">{totalActiveCases}</p>
        </div>
        <div
          className="countrywide-stat-card green-country-card"
          testid="countryWideRecoveredCases"
        >
          <p className="countrywide-stat-card-title">Recovered</p>
          <img
            src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Recovered_joeqa3.png"
            className="countrywide-stat-card-image"
            alt="country wide recovered cases pic"
          />
          <p className="countrywide-stat-card-count">{totalRecoveredCases}</p>
        </div>
        <div
          className="countrywide-stat-card ash-country-card"
          testid="countryWideDeceasedCases"
        >
          <p className="countrywide-stat-card-title">Deceased</p>
          <img
            src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Deceased_l5ypnr.png"
            className="countrywide-stat-card-image"
            alt="country wide deceased cases pic"
          />
          <p className="countrywide-stat-card-count">{totalDeceasedCases}</p>
        </div>
      </div>
    )
  }

  renderSearchResultsUnorderedList = () => {
    const {filteredStateList, activeStateId} = this.state

    return (
      <ul className="search-results-list" testid="searchResultsUnorderedList">
        {filteredStateList.map(eachState => (
          <SearchResultItem
            key={eachState.state_code}
            stateName={eachState.state_name}
            stateCode={eachState.state_code}
            isActive={activeStateId === eachState.state_code}
            onChangeActiveStateId={this.onChangeActiveStateId}
          />
        ))}
      </ul>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <div className="search-bar-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Enter the State"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>
        {searchInput.length > 0 && this.renderSearchResultsUnorderedList()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#007BFF" width={50} height={50} />
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderCountryWideStats()}
      {this.renderStateWiseCovidDataTable()}
    </>
  )

  renderPageBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="app-bg-container">
          {this.renderSearchContainer()}
          {this.renderPageBasedOnApiStatus()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
