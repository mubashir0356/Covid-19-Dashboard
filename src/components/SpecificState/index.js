import {Component} from 'react'

import Header from '../Header'

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
    timelinesApiStatus: apiStatusConstants.initial,
    cardStatus: cardStatusConstants.confirmed,
    stateCovidData: [],
    timeLineData: [],
  }

  componentDidMount() {
    this.setState(
      {stateDetailsApiStatus: apiStatusConstants.inProgress},
      this.getStateDetails,
    )
    this.setState(
      {timelinesApiStatus: apiStatusConstants.inProgress},
      this.getTimelineDetails,
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
      this.setState({
        stateCovidData: updatedData,
        stateDetailsApiStatus: apiStatusConstants.success,
      })
    }
  }

  getTimelineDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData[stateCode].dates
      console.log(updatedData)
      this.setState({
        timeLineData: updatedData,
        timelinesApiStatus: apiStatusConstants.success,
      })
    }
  }

  render() {
    return (
      <>
        <div className="state-specific-container">
          <Header />
          {this.renderStateContent()}
        </div>
      </>
    )
  }
}

export default SpecificState
