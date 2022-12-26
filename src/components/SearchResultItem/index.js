import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchResultItem = props => {
  const {stateName, stateCode, isActive, onChangeActiveStateId} = props

  const activeStateClassName = isActive ? 'active-state' : ''

  const changeActiveStateId = () => {
    onChangeActiveStateId(stateCode)
  }

  return (
    <li>
      <Link
        to={`/state/${stateCode}`}
        className="link-search"
        onClick={changeActiveStateId}
      >
        <div className={`search-result-item ${activeStateClassName}`}>
          <p className="search-result-item-name">{stateName}</p>
          <div type="button" className="state-code-container">
            <p className="state-code">{stateCode}</p>
            <BiChevronRightSquare className="state-code-icon" />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SearchResultItem
