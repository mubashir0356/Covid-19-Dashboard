import './index.css'

const DistrictItem = props => {
  const {districtDetails} = props
  const {distName, value} = districtDetails

  return (
    <li className="district-item">
      <p className="district-item-value">{value}</p>
      <p className="district-item-text">{distName}</p>
    </li>
  )
}

export default DistrictItem
