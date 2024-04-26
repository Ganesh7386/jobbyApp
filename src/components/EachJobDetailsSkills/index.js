import './index.css'

function Skill(props) {
  const {eachJobDetails} = props
  return (
    <li>
      <img
        className="eachSkillImg"
        src={eachJobDetails.imageUrl}
        alt={eachJobDetails.name}
      />
      <p>{eachJobDetails.name}</p>
    </li>
  )
}

export default Skill
