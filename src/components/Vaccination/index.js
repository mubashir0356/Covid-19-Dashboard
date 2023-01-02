import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {AiFillHome} from 'react-icons/ai'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
}

class Vaccination extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationDetails: {},
    trend: 'dose',
    selectedStateId: 1,
    statesList: [],
    districtsList: [],
  }

  componentDidMount() {
    this.getVaccinationDetails()
    this.getStatesAndDistricts()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {selectedStateId} = this.state
    const stateId = selectedStateId.toString()
    const url = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const specificState = data.getBeneficiariesGroupBy.filter(
        each => each.state_id === stateId,
      )[0]
      console.log('asdf', specificState)
      const vaccinationDetails = {
        sites: data.topBlock.sites.total,
        govtSites: data.topBlock.sites.govt,
        pvtSites: data.topBlock.sites.pvt,
        totalDoses: specificState.total,
        dose1: specificState.partial_vaccinated,
        dose2: specificState.totally_vaccinated,
        precautionaryDose: specificState.precaution_dose,
        byDoseChart: data.vaccinationDoneByTime.map(eachValue => ({
          total: eachValue.count,
          doseOne: eachValue.dose_pd,
          doseTwo: eachValue.dose_two,
          precautionaryDose: eachValue.dose_one,
          label: eachValue.label,
        })),
        byAgeChart: data.vaccinationDoneByTimeAgeWise.map(eachValue => ({
          label: eachValue.label,
          Between15To17: eachValue.vac_15_17,
          Between18To45: eachValue.vac_18_45,
          Between45To60: eachValue.vac_45_60,
          greaterThan60: eachValue.vac_60_above,
        })),
        byGender: [
          {
            count: data.topBlock.vaccination.male,
            category: 'male',
          },
          {
            count: data.topBlock.vaccination.female,
            category: 'female',
          },
          {
            count: data.topBlock.vaccination.others,
            category: 'others',
          },
        ],
        byVaccine: [
          {
            count: data.topBlock.vaccination.covishield,
            category: 'covishield',
          },
          {
            count: data.topBlock.vaccination.covaxin,
            category: 'covaxin',
          },
          {
            count: data.topBlock.vaccination.sputnik,
            category: 'sputnik',
          },
        ],
        byAge: [
          {
            count: data.vaccinationByAge.vac_18_45,
            category: '18-45',
          },
          {
            count: data.vaccinationByAge.vac_45_60,
            category: '45-60',
          },
          {
            count: data.vaccinationByAge.above_60,
            category: 'above 60',
          },
        ],
      }
      this.setState({apiStatus: apiStatusConstants.success, vaccinationDetails})
    }
  }

  changeTrend = value => {
    this.setState({trend: value})
  }

  getStatesAndDistricts = async () => {
    const {selectedStateId} = this.state
    const statesUrl = 'https://apis.ccbp.in/covid19-state-ids'
    const response = await fetch(statesUrl)

    if (response.ok) {
      const data = await response.json()
      const {states} = data
      const districtsUrl = `https://apis.ccbp.in/covid19-districts-data/${selectedStateId}`
      const response2 = await fetch(districtsUrl)
      if (response2.ok) {
        const fetchedDistData = await response2.json()
        const {districts} = fetchedDistData
        console.log('mmm', districts)
        this.setState({statesList: states, districtsList: districts})
      }
    }
  }

  onChangeState = event => {
    this.setState(
      {selectedStateId: parseInt(event.target.value)},
      this.getStatesAndDistricts,
    )
  }

  onChangeDistrict = event => {
    this.setState(
      {selectedDistrictId: parseInt(event.target.value)},
      this.getVaccinationDetails,
    )
  }

  renderSuccessView = () => {
    const {vaccinationDetails, trend} = this.state
    let chartData = []

    if (trend === 'dose') {
      chartData = vaccinationDetails.byDoseChart
    } else {
      chartData = vaccinationDetails.byAgeChart
    }

    return (
      <div className="vaccination-content-container">
        <div className="site-and-vaccination-details-container">
          <div className="site-container">
            <img
              src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672427563/Covid%20Dashboard/count_umabmy.png"
              alt="site"
              className="site-image"
            />
            <div className="site-main-content">
              <p className="site-main-heading">
                Sites Conducting Vaccination in the Country
              </p>
              <p className="site-main-count">{vaccinationDetails.sites}</p>
              <div className="site-sub-content-container">
                <div className="site-sub-content">
                  <p className="site-sub-heading">Government Sites</p>
                  <p className="site-sub-count">
                    {vaccinationDetails.govtSites}
                  </p>
                </div>
                <div className="site-sub-content">
                  <p className="site-sub-heading">Private Sites</p>
                  <p className="site-sub-count">
                    {vaccinationDetails.pvtSites}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="site-container">
            <img
              src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672427563/Covid%20Dashboard/sites_vbmpuy.png"
              alt="dose"
              className="site-image"
            />
            <div className="site-main-content">
              <p className="site-main-heading">
                Total Vaccination Doses in the State
              </p>
              <p className="site-main-count">{vaccinationDetails.totalDoses}</p>
              <div className="site-sub-content-container">
                <div className="site-sub-content">
                  <p className="site-sub-heading">Dose 1</p>
                  <p className="site-sub-count">{vaccinationDetails.dose1}</p>
                </div>
                <div className="site-sub-content">
                  <p className="site-sub-heading">Dose 2</p>
                  <p className="site-sub-count">{vaccinationDetails.dose2}</p>
                </div>
                <div className="site-sub-content">
                  <p className="site-sub-heading">Precautionary Dose </p>
                  <p className="site-sub-count">
                    {vaccinationDetails.precautionaryDose}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* below is the code for getting line graphs but the required data is nor obtained from response */}
        <div className="vaccination-trends">
          <h1 className="trend-heading">Vaccination Trends</h1>
          <div className="buttons-container">
            <button
              type="button"
              className={
                trend === 'dose'
                  ? 'vaccine-button highlight-button'
                  : 'vaccine-button'
              }
              onClick={() => this.changeTrend('dose')}
            >
              By Doses
            </button>
            <button
              type="button"
              className={
                trend === 'age'
                  ? 'vaccine-button highlight-button'
                  : 'vaccine-button'
              }
              onClick={() => this.changeTrend('age')}
            >
              By Age
            </button>
          </div>
          <div className="line-chart-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={300} data={chartData}>
                <XAxis dataKey="label" fontSize="12px" />
                <YAxis fontSize="12px" />
                <Tooltip cursor={{fill: '#FFEBE5'}} />
                <Legend iconSize="10px" fontSize="12px" />
                {trend === 'dose' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#A226DC"
                      strokeWidth={2}
                      dot={{
                        fill: '#A226DC',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="doseOne"
                      stroke="#FCEA4E"
                      strokeWidth={2}
                      dot={{
                        fill: '#FCEA4E',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="doseTwo"
                      stroke="#37C62B"
                      strokeWidth={2}
                      dot={{
                        fill: '#37C62B',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="precautionaryDose"
                      stroke="#F54394"
                      strokeWidth={2}
                      dot={{
                        fill: '#F54394',
                      }}
                    />
                  </>
                )}
                {trend === 'age' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="Between15To17"
                      stroke="#A226DC"
                      strokeWidth={2}
                      dot={{
                        fill: '#A226DC',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Between18To45"
                      stroke="#FCEA4E"
                      strokeWidth={2}
                      dot={{
                        fill: '#FCEA4E',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Between45To60"
                      stroke="#37C62B"
                      strokeWidth={2}
                      dot={{
                        fill: '#37C62B',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="greaterThan60"
                      stroke="#F54394"
                      strokeWidth={2}
                      dot={{
                        fill: '#F54394',
                      }}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="line-chart-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={800} height={300} data={chartData.slice(4)}>
                <XAxis dataKey="label" fontSize="6px" />
                <YAxis fontSize="6px" />
                <Tooltip cursor={{fill: '#FFEBE5'}} />
                <Legend iconSize="10px" fontSize="6px" />
                {trend === 'dose' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#A226DC"
                      strokeWidth={2}
                      dot={{
                        fill: '#A226DC',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="doseOne"
                      stroke="#FCEA4E"
                      strokeWidth={2}
                      dot={{
                        fill: '#FCEA4E',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="doseTwo"
                      stroke="#37C62B"
                      strokeWidth={2}
                      dot={{
                        fill: '#37C62B',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="precautionaryDose"
                      stroke="#F54394"
                      strokeWidth={2}
                      dot={{
                        fill: '#F54394',
                      }}
                    />
                  </>
                )}
                {trend === 'age' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="Between15To17"
                      fill="#A226DC"
                    />
                    <Line
                      type="monotone"
                      dataKey="Between18To45"
                      fill="#FCEA4E"
                    />
                    <Line
                      type="monotone"
                      dataKey="Between45To60"
                      fill="#37C62B"
                    />
                    <Line
                      type="monotone"
                      dataKey="greaterThan60"
                      fill="#F54394"
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* below is the code for getting pie charts */}
        <div className="bottom-container">
          <div className="vaccination-category">
            <h1 className="trend-heading">Vaccination Category</h1>
            <div className="category-pie-charts">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="40%"
                    data={vaccinationDetails.byGender}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="count"
                  >
                    <Cell name="Male" fill="#F54394" />
                    <Cell name="Female" fill="#5A8DEE" />
                    <Cell name="Others" fill="#FF9800" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="8px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="category-pie-charts">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="40%"
                    data={vaccinationDetails.byVaccine}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="count"
                  >
                    <Cell name="Covishiled" fill="#007CC3" />
                    <Cell name="Covaxin" fill="#7AC142" />
                    <Cell name="Sputnik V" fill="#FF9800" />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize="8px"
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="vaccination-by-age">
            <h1 className="trend-heading heading-1">Vaccination By Age</h1>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={vaccinationDetails.byAge}
                  startAngle={360}
                  endAngle={0}
                  innerRadius="0%"
                  outerRadius="95%"
                  dataKey="count"
                  fontSize="12px"
                >
                  <Cell name="18-44" fill="#007CC3" />
                  <Cell name="45-60" fill="#7AC142" />
                  <Cell name="Above 60" fill="#FF9800" />
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize="8px"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  fontSize="8px"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  renderVaccinationLoader = () => (
    <div className="state-loader-container">
      <Loader type="TailSpin" color="#007BFF" width={50} height={50} />
    </div>
  )

  renderApiStatusContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return this.renderVaccinationLoader()
    }
  }

  render() {
    const {statesList, districtsList} = this.state

    return (
      <div className="vaccination-route">
        <Header />
        <div className="vaccination-bg-container">
          <div className="vaccination-container">
            <p className="location">
              <AiFillHome className="icon" /> India
            </p>
            <div className="select-options-container">
              <select
                className="select-container"
                onChange={this.onChangeState}
              >
                {statesList.map(eachState => (
                  <option value={eachState.state_id} className="option-text">
                    {eachState.state_name}
                  </option>
                ))}
              </select>
              <select
                className="select-container"
                onChange={this.onChangeDistrict}
              >
                {districtsList.map(each => (
                  <option value={each.district_id} className="option-text">
                    {each.district_name}
                  </option>
                ))}
              </select>
            </div>
            {this.renderApiStatusContent()}
          </div>
          <div className="footer-container-1">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Vaccination
