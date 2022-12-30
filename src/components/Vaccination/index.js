import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {AiFillHome} from 'react-icons/ai'

import {
  BarChart,
  LineChart,
  Line,
  Bar,
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
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const vaccinationDetails = {
        sites: data.topBlock.sites.total,
        govtSites: data.topBlock.sites.govt,
        pvtSites: data.topBlock.sites.pvt,
        totalDoses: data.topBlock.vaccination.total,
        dose1: data.topBlock.vaccination.tot_dose_1,
        dose2: data.topBlock.vaccination.tot_dose_2,
        byDoseChart: data.vaccinationDoneByTime.map(eachValue => ({
          total: eachValue.count,
          doseOne: eachValue.dose_one,
          doseTwo: eachValue.dose_two,
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

  renderSuccessView = () => {
    const {vaccinationDetails, trend} = this.state
    let chartData = []

    if (trend === 'dose') {
      chartData = vaccinationDetails.byDoseChart
    } else {
      chartData = vaccinationDetails.byAgeChart
    }

    console.log('m', chartData)

    return (
      <div className="vaccination-bg-container">
        <div className="vaccination-container">
          <p className="location">
            <AiFillHome className="icon" /> India
          </p>
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
                    Site Conducting Vaccination
                  </p>
                  <p className="site-main-count">{vaccinationDetails.sites}</p>
                  <div className="site-sub-content-container">
                    <div className="site-sub-content">
                      <p className="site-sub-heading">Government</p>
                      <p className="site-sub-count">
                        {vaccinationDetails.govtSites}
                      </p>
                    </div>
                    <div className="site-sub-content">
                      <p className="site-sub-heading">Private</p>
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
                  <p className="site-main-heading">Total Vaccination Doses</p>
                  <p className="site-main-count">
                    {vaccinationDetails.totalDoses}
                  </p>
                  <div className="site-sub-content-container">
                    <div className="site-sub-content">
                      <p className="site-sub-heading">Dose 1</p>
                      <p className="site-sub-count">
                        {vaccinationDetails.dose1}
                      </p>
                    </div>
                    <div className="site-sub-content">
                      <p className="site-sub-heading">Dose 2</p>
                      <p className="site-sub-count">
                        {vaccinationDetails.dose2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* below is the code for getting line graphs but the required data is nor obtained from response */}
            {/* <div className="vaccination-trends">
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
                    <XAxis dataKey="label" />

                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend />
                    {trend === 'dose' && (
                      <>
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#A226DC"
                        />
                        <Line
                          type="monotone"
                          dataKey="doseOne"
                          stroke="#FCEA4E"
                        />
                        <Line
                          type="monotone"
                          dataKey="doseTwo"
                          stroke="#37C62B"
                        />
                      </>
                    )}
                    {trend === 'age' && (
                      <>
                        <Line
                          type="monotone"
                          dataKey="Between15To17"
                          stroke="#A226DC"
                        />
                        <Line
                          type="monotone"
                          dataKey="Between18To45"
                          stroke="#FCEA4E"
                        />
                        <Line
                          type="monotone"
                          dataKey="Between45To60"
                          stroke="#37C62B"
                        />
                        <Line
                          type="monotone"
                          dataKey="greaterThan60"
                          stroke="#F54394"
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            */}
            <h1 className="trend-heading">Vaccination Trends</h1>
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
                <h1 className="trend-heading">Vaccination By Age</h1>
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
    return (
      <div className="vaccination-route">
        <Header />
        {this.renderApiStatusContent()}
        <div className="footer-container-1">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Vaccination
