/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import FaqItem from '../FaqItem'

import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class About extends Component {
  state = {apiStatus: apiStatusConstants.initial, faqList: []}

  componentDidMount() {
    this.getAboutContent()
  }

  getAboutContent = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const {faq} = fetchedData
      console.log(fetchedData)
      this.setState({apiStatus: apiStatusConstants.success, faqList: faq})
    }
  }

  renderAboutRouteContent = () => {
    const {faqList} = this.state
    console.log('faq', faqList)

    return (
      <div className="about-content-bg-container">
        <div className="about-content-container">
          <h1 className="about-heading">About</h1>
          <p className="about-last-updated ">Last update on march 28th 2021.</p>
          <p className="distribution-text">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul className="faq-list" testid="faqsUnorderedList">
            {faqList.map(eachFaq => (
              <FaqItem key={eachFaq.qno} faqItem={eachFaq} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderAboutRouteLoader = () => (
    <div className="state-loader-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#007BFF" width={50} height={50} />
    </div>
  )

  renderApiStatusContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutRouteContent()
      default:
        return this.renderAboutRouteLoader()
    }
  }

  render() {
    return (
      <div className="about-route">
        <Header />
        {this.renderApiStatusContent()}
        <div className="footer-container-1">
          <Footer />
        </div>
      </div>
    )
  }
}

export default About
