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
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/andaman_mhysom.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672412401/AP_w1oc4e.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/arunachal_pradesh_bw8ho9.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/Assam_a4blbs.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/bihar_kybwc3.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/chandigarh_zr4fuo.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/chattisgarh_soz1ch.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/daman_and_diu_d0pdbs.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Delhi_n0z8q6.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410254/goa_uygnvl.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Gujrat_dxrbap.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/Haryana_c3jwlp.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/HP_kjbckm.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/JK_cokxfa.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/jharkand_rmbukv.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/kerala_u6rtqe.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/Ladakh_spcndt.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410530/lakshadweep_bafokl.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/maharashtra_fcq8aw.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/MP_fa9prz.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/manipur_lxindr.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/meghalaya_ygne3l.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410255/mizoram_zotja6.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/nagaland_lip8mi.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410531/poducherry_xe0rp9.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/punjab_qra2ul.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/rajastan_cd1owi.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/Sikkim_ohg4ty.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410256/tamilnadu_lfd9fm.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/telangana_bv5bke.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/tripura_um8629.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/up_nfmlxh.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/uttrahkhand_tr0yku.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    imageUrl:
      'https://res.cloudinary.com/dkxj0xjra/image/upload/v1672410257/west_bengal_c2jo9z.png',
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
        stateImgUrl: statesList.find(
          eachState => eachState.state_code === stateCode,
        ).imageUrl,
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
      stateImgUrl,
      population,
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
      <div
        className="specific-state-card-bg-container"
        testid="lineChartsContainer"
      >
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
        <div className="map-container">
          <img src={stateImgUrl} alt={stateName} className="map-image" />
          <div className="ncp-report-container">
            <p className="ncp-report-title">NCP report</p>
            <div className="ncp-content-container">
              <div className="ncp-sub-container">
                <p className="ncp-heading">Population</p>
                <p className="ncp-count">{population}</p>
              </div>
              <div className="ncp-sub-container">
                <p className="ncp-heading">Tested</p>
                <p className="ncp-count">{tested}</p>
              </div>
            </div>
          </div>
        </div>
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
