/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import Loader from 'react-loader-spinner'

import './index.css'

const cardStatusConstants = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class Charts extends Component {
  state = {
    chartData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTimeLineData()
  }

  getTimeLineData = async () => {
    const {stateId} = this.props
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()

      const dateKeys = Object.keys(fetchedData[stateId].dates)

      console.log('TimelineDates:', typeof dateKeys)

      const updatedData = dateKeys.map(eachDate => ({
        date: eachDate,
        confirmed:
          fetchedData[stateId].dates[eachDate].total.confirmed === undefined
            ? 0
            : fetchedData[stateId].dates[eachDate].total.confirmed,
        deceased:
          fetchedData[stateId].dates[eachDate].total.deceased === undefined
            ? 0
            : fetchedData[stateId].dates[eachDate].total.deceased,
        recovered:
          fetchedData[stateId].dates[eachDate].total.recovered === undefined
            ? 0
            : fetchedData[stateId].dates[eachDate].total.recovered,
        active:
          fetchedData[stateId].dates[eachDate].total.confirmed === undefined
            ? 0
            : fetchedData[stateId].dates[eachDate].total.confirmed -
              ((fetchedData[stateId].dates[eachDate].total.deceased ===
              undefined
                ? 0
                : fetchedData[stateId].dates[eachDate].total.deceased) +
                (fetchedData[stateId].dates[eachDate].total.recovered ===
                undefined
                  ? 0
                  : fetchedData[stateId].dates[eachDate].total.recovered)),
        tested: fetchedData[stateId].dates[eachDate].total.tested,
      }))

      console.log('i', updatedData)
      this.setState({
        isLoading: false,
        chartData: updatedData,
      })
    }
  }

  renderBarChart = () => {
    const {cardStatus} = this.props
    const {chartData} = this.state
    const barChartType = cardStatus.toLowerCase()
    console.log(barChartType)

    let barChartColor = '#9A0E31'

    switch (cardStatus) {
      case cardStatusConstants.active:
        barChartColor = '#0A4FA0'
        break
      case cardStatusConstants.recovered:
        barChartColor = '#216837'
        break
      case cardStatusConstants.deceased:
        barChartColor = '#474C57'
        break
      default:
        barChartColor = '#9A0E31'
        break
    }

    const tenDaysData = chartData.slice(Math.max(chartData.length - 10, 0))
    console.log('m', tenDaysData)

    return (
      <div className="chart-container">
        <BarChart width={900} height={300} data={tenDaysData} barSize={35}>
          <XAxis
            dataKey="date"
            stroke={`${barChartColor}`}
            tickLine={0}
            axisLine={false}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            fontSize={10}
          />

          <Legend />
          <Bar
            dataKey={`${barChartType}`}
            fill={`${barChartColor}`}
            label={{position: 'top', fill: barChartColor}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  renderLineChart = (graphType, graphColor) => {
    const {chartData} = this.state

    const DataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    return (
      <div>
        <LineChart
          width={1000}
          height={250}
          data={chartData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            tickFormatter={DataFormatter}
            dataKey="date"
            interval="preserveEnd"
            fontSize={11}
            tick={{fill: graphColor, strokeWidth: 1, stroke: graphColor}}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          />
          <YAxis fontSize={14} tick={{fill: graphColor, strokeWidth: 1}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={graphType} stroke={graphColor} />
        </LineChart>
      </div>
    )
  }

  renderCharts = () => (
    <div className="charts-container">
      <div className="bar-chart-container">{this.renderBarChart()}</div>
      <h1 className="charts-title">Spread Trends</h1>
      <div className="line-chart-container confirm-bg">
        {this.renderLineChart('confirmed', '#FF073A')}
      </div>
      <div className="line-chart-container active-bg">
        {this.renderLineChart('active', '#007BFF')}
      </div>
      <div className="line-chart-container recovered-bg">
        {this.renderLineChart('recovered', '#27A243')}
      </div>
      <div className="line-chart-container deceased-bg">
        {this.renderLineChart('deceased', '#6C757D')}
      </div>
      <div className="line-chart-container tested-bg">
        {this.renderLineChart('tested', '#9673B9')}
      </div>
    </div>
  )

  renderTimelineLoader = () => (
    <div className="timeline-loader-container" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#007BFF" width={50} height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <>{isLoading ? this.renderTimelineLoader() : this.renderCharts()}</>
  }
}

export default Charts
