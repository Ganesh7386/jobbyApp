import {useState} from 'react'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

function Render() {
  const [checkedTypes, setCheckedTypes] = useState([false, false, false, false])

  const handleCheckingTypesOfEmployemnt = index => {
    const copy = checkedTypes
    copy[index] = !copy[index]
    setCheckedTypes(copy)
    console.log(checkedTypes)
  }

  return (
    <div style={{height: '100px', width: '100px', backgroundColor: 'pink'}}>
      <ul>
        {employmentTypesList.map((eachObj, index) => (
          <li>
            <input
              type="checkbox"
              onChange={() => {
                handleCheckingTypesOfEmployemnt(index)
              }}
            />
            <label htmlFor={eachObj.employmentTypeId}>{eachObj.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Render
