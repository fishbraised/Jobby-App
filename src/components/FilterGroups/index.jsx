import "./index.css";

const employmentTypes = [
  {
    id: "FULLTIME",
    text: "Full Time",
  },

  {
    id: "PARTTIME",
    text: "Part Time",
  },

  {
    id: "FREELANCE",
    text: "Freelance",
  },

  {
    id: "INTERNSHIP",
    text: "Internship",
  },
];

const salaryRanges = [
  {
    id: "1000000",
    text: "10 LPA and above",
  },

  {
    id: "2000000",
    text: "20 LPA and above",
  },

  {
    id: "3000000",
    text: "30 LPA and above",
  },

  {
    id: "4000000",
    text: "40 LPA and above",
  },
];

const FilterGroups = (props) => {
  const { addEmploymentType, removeEmploymentType, updateSalaryRange } = props;

  const onClickEmploymentType = (event) => {
    event.target.checked
      ? addEmploymentType(event.target.id)
      : removeEmploymentType(event.target.id);
  };

  const onClickSalaryRange = (event) => {
    updateSalaryRange(event.target.id);
  };

  return (
    <form className="filter-groups-form">
      <hr className="filter-groups-divider" />
      <h2 className="filter-category-title">Type of Employment</h2>
      <ul className="filter-options employment-types-options">
        {employmentTypes.map((eachObj) => (
          <li key={eachObj.id}>
            <input
              id={eachObj.id}
              onChange={onClickEmploymentType}
              type="checkbox"
            />
            <label htmlFor={eachObj.id}>{eachObj.text}</label>
          </li>
        ))}
      </ul>

      <hr className="filter-groups-divider" />
      <h2 className="filter-category-title">Salary Range</h2>
      <ul className="filter-options salary-range-options">
        {salaryRanges.map((eachObj) => (
          <li key={eachObj.id}>
            <input
              id={eachObj.id}
              onChange={onClickSalaryRange}
              type="radio"
              name="salary"
            />
            <label htmlFor={eachObj.id}>{eachObj.text}</label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default FilterGroups;
