/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import DistrictItem from '../DistrictItem'

import Charts from '../Charts'

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
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const cardStatusConstants = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class SpecificState extends Component {
  state = {
    stateDetailsApiStatus: apiStatusConstants.initial,
    cardStatus: cardStatusConstants.confirmed,
    stateCovidData: [],
  }

  componentDidMount() {
    this.setState(
      {stateDetailsApiStatus: apiStatusConstants.inProgress},
      this.getStateDetails,
    )
  }

  getStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        confirmed: fetchedData[stateCode].total.confirmed,
        deceased: fetchedData[stateCode].total.deceased,
        recovered: fetchedData[stateCode].total.recovered,
        active:
          fetchedData[stateCode].total.confirmed -
          (fetchedData[stateCode].total.recovered +
            fetchedData[stateCode].total.deceased),
        tested: fetchedData[stateCode].total.tested,
        population: fetchedData[stateCode].meta.population,
        lastUpdated: fetchedData[stateCode].meta.last_updated,
        id: stateCode,
        stateName: statesList.find(
          eachState => eachState.state_code === stateCode,
        ).state_name,
        districts: fetchedData[stateCode].districts,
      }
      console.log('districts:', updatedData.districts)
      this.setState({
        stateCovidData: updatedData,
        stateDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({stateDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  getLastUpdatedDate = () => {
    const {stateCovidData} = this.state
    const {lastUpdated} = stateCovidData

    const lastUpdatedDateObj = new Date(lastUpdated)
    console.log(lastUpdatedDateObj)
    const lastUpdatedYear = lastUpdatedDateObj.getFullYear()
    const lastUpdatedMonth = lastUpdatedDateObj
      .toLocaleString('default', {
        month: 'long',
      })
      .toLowerCase()
    const lastUpdatedDate = lastUpdatedDateObj.getDate()
    let subScript
    if (lastUpdatedDate === 1) {
      subScript = 'st'
    } else if (lastUpdatedDate === 2) {
      subScript = 'nd'
    } else if (lastUpdatedDate === 3) {
      subScript = 'rd'
    } else {
      subScript = 'th'
    }
    console.log(typeof lastUpdatedDate)

    const formattedDate = `${lastUpdatedMonth} ${lastUpdatedDate}${subScript} ${lastUpdatedYear}`
    console.log(formattedDate)
    return formattedDate
  }

  onStatCardClick = cardState => {
    this.setState({cardStatus: cardState})
  }

  obtainDescendingOrder = unSortedDistricts => {
    const sortedDistricts = unSortedDistricts.sort((a, b) => {
      const firstDist = a.value
      const secondDist = b.value
      if (firstDist < secondDist) {
        return 1
      }
      if (firstDist > secondDist) {
        return -1
      }
      return 0
    })

    return sortedDistricts
  }

  getDistrictsBasedOnCardStatus = () => {
    const {stateCovidData, cardStatus} = this.state
    const {districts} = stateCovidData
    const updatedDistricts = []
    const allDistrictKeyNames = Object.keys(districts)
    switch (cardStatus) {
      case cardStatusConstants.confirmed:
        allDistrictKeyNames.forEach(eachDist => {
          updatedDistricts.push({
            distName: eachDist,
            value:
              districts[eachDist].total.confirmed === undefined
                ? 0
                : districts[eachDist].total.confirmed,
          })
        })

        return this.obtainDescendingOrder(updatedDistricts)

      case cardStatusConstants.deceased:
        allDistrictKeyNames.forEach(eachDist => {
          updatedDistricts.push({
            distName: eachDist,
            value:
              districts[eachDist].total.deceased === undefined
                ? 0
                : districts[eachDist].total.deceased,
          })
        })

        return this.obtainDescendingOrder(updatedDistricts)

      case cardStatusConstants.recovered:
        allDistrictKeyNames.forEach(eachDist => {
          updatedDistricts.push({
            distName: eachDist,
            value:
              districts[eachDist].total.recovered === undefined
                ? 0
                : districts[eachDist].total.recovered,
          })
        })

        return this.obtainDescendingOrder(updatedDistricts)

      default:
        allDistrictKeyNames.forEach(eachDist => {
          updatedDistricts.push({
            distName: eachDist,
            value:
              districts[eachDist].total.confirmed === undefined
                ? 0
                : districts[eachDist].total.confirmed -
                  ((districts[eachDist].total.recovered === undefined
                    ? 0
                    : districts[eachDist].total.recovered) +
                    (districts[eachDist].total.deceased === undefined
                      ? 0
                      : districts[eachDist].total.deceased)),
          })
        })

        return this.obtainDescendingOrder(updatedDistricts)
    }
  }

  renderStateLoader = () => (
    <div className="state-loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007BFF" width={50} height={50} />
    </div>
  )

  renderStateDetails = () => {
    const {stateCovidData, cardStatus} = this.state
    const {
      stateName,
      tested,
      confirmed,
      deceased,
      recovered,
      active,
      id,
    } = stateCovidData

    const lastUpdatedDate = this.getLastUpdatedDate()

    const confirmedCardClassName =
      cardStatus === cardStatusConstants.confirmed
        ? 'stat-card-item confirmed-card'
        : 'stat-card-item'
    const activeCardClassName =
      cardStatus === cardStatusConstants.active
        ? 'stat-card-item active-card'
        : 'stat-card-item'
    const recoveredCardClassName =
      cardStatus === cardStatusConstants.recovered
        ? 'stat-card-item recovered-card'
        : 'stat-card-item'
    const deceasedCardClassName =
      cardStatus === cardStatusConstants.deceased
        ? 'stat-card-item deceased-card'
        : 'stat-card-item'

    let topDistrictsHeadingClassName

    switch (cardStatus) {
      case cardStatusConstants.confirmed:
        topDistrictsHeadingClassName = 'confirm-heading'
        break
      case cardStatusConstants.active:
        topDistrictsHeadingClassName = 'active-heading'
        break
      case cardStatusConstants.recovered:
        topDistrictsHeadingClassName = 'recovered-heading'
        break
      default:
        topDistrictsHeadingClassName = 'deceased-heading'
        break
    }

    const districtsList = this.getDistrictsBasedOnCardStatus()

    return (
      <div className="specific-state-card-bg-container">
        <div className="state-details-container">
          <div className="state-name-container">
            <h1 className="state-name-heading">{stateName}</h1>
          </div>
          <div className="tested-count-container">
            <p className="tested-title">Tested</p>
            <p className="tested-count">{tested}</p>
          </div>
        </div>
        <p className="last-update-date-text">{`Last update on ${lastUpdatedDate}.`}</p>
        <ul className="state-wide-stats-container">
          <li className={confirmedCardClassName}>
            <button
              type="button"
              testid="stateSpecificConfirmedCasesContainer"
              className="confirmed-card-btn"
              onClick={() =>
                this.onStatCardClick(cardStatusConstants.confirmed)
              }
            >
              <p className="state-stat-card-text">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Confirmed_uqfikx.png"
                className="state-stat-card-image"
                alt="state specific confirmed cases pic"
              />
              <p className="state-stat-card-count">{confirmed}</p>
            </button>
          </li>
          <li className={activeCardClassName}>
            <button
              type="button"
              testid="stateSpecificActiveCasesContainer"
              className="active-card-btn"
              onClick={() => this.onStatCardClick(cardStatusConstants.active)}
            >
              <p className="state-stat-card-text">Active</p>
              <img
                src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Active_cmlwhz.png"
                className="state-stat-card-image"
                alt="state specific active cases pic"
              />
              <p className="state-stat-card-count">{active}</p>
            </button>
          </li>
          <li className={recoveredCardClassName}>
            <button
              type="button"
              testid="stateSpecificRecoveredCasesContainer"
              className="recovered-card-btn"
              onClick={() =>
                this.onStatCardClick(cardStatusConstants.recovered)
              }
            >
              <p className="state-stat-card-text">Recovered</p>
              <img
                src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Recovered_joeqa3.png"
                className="state-stat-card-image"
                alt="state specific recovered cases pic"
              />
              <p className="state-stat-card-count">{recovered}</p>
            </button>
          </li>
          <li className={deceasedCardClassName}>
            <button
              type="button"
              testid="stateSpecificDeceasedCasesContainer"
              className="deceased-card-btn"
              onClick={() => this.onStatCardClick(cardStatusConstants.deceased)}
            >
              <p className="state-stat-card-text">Deceased</p>
              <img
                src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672075627/Covid%20Dashboard/Deceased_l5ypnr.png"
                className="state-stat-card-image"
                alt="state specific deceased cases pic"
              />
              <p className="state-stat-card-count">{deceased}</p>
            </button>
          </li>
        </ul>
        <h1 className={`top-districts-heading ${topDistrictsHeadingClassName}`}>
          Top Districts
        </h1>
        <ul className="top-districts-list" testid="topDistrictsUnorderedList">
          {districtsList.map(eachDist => (
            <DistrictItem key={eachDist.distName} districtDetails={eachDist} />
          ))}
        </ul>
        <div className="graphs-container">
          <Charts cardStatus={cardStatus} stateId={id} />
        </div>
      </div>
    )
  }

  renderStateApiContent = () => {
    const {stateDetailsApiStatus} = this.state
    switch (stateDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderStateDetails()
      default:
        return this.renderStateLoader()
    }
  }

  render() {
    return (
      <>
        <div className="state-specific-container">
          <Header />
          {this.renderStateApiContent()}
          <div className="footer-container-1">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default SpecificState
