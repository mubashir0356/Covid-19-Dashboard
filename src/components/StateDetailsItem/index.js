import {Link} from 'react-router-dom'

import './index.css'

const StateDetailsItem = props => {
  const {stateDetails} = props
  const {
    stateCode,
    name,
    confirmed,
    deceased,
    recovered,
    population,
    active,
  } = stateDetails

  return (
    <li className="state-details-item">
      <Link to={`/state/${stateCode}`} className="state-link-item">
        <p className="state-name-row-title">{name}</p>
      </Link>
      <div className="other-details-container">
        <p className="other-state-details-text red-text">{confirmed}</p>
        <p className="other-state-details-text blue-text">{active}</p>
        <p className="other-state-details-text blue-text">{recovered}</p>
        <p className="other-state-details-text ash-text">{deceased}</p>
        <p className="other-state-details-text grey-text">{population}</p>
      </div>
    </li>
  )
}

export default StateDetailsItem
