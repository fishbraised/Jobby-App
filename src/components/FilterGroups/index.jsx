import './index.css';

const FilterGroups = () => {
  return (
    <div className="filter-groups-section">
      <hr className="filter-groups-divider" />
      <h2 className="filter-category-title">Type of Employment</h2>
      <ul className="filter-options employment-types-options">
        <li>
          <input type="checkbox" />
          <p>Full Time</p>
        </li>
        <li>
          <input type="checkbox" />
          <p>Part Time</p>
        </li>
        <li>
          <input type="checkbox" />
          <p>Freelance</p>
        </li>
        <li>
          <input type="checkbox" />
          <p>Internship</p>
        </li>
      </ul>

      <hr className="filter-groups-divider" />
      <h2 className="filter-category-title">Salary Range</h2>
      <ul className="filter-options salary-range-options">
        <li>
          <input type="radio" name="salary" />
          <p>10 LPA and above</p>
        </li>
        <li>
          <input type="radio" name="salary" />
          <p>20 LPA and above</p>
        </li>
        <li>
          <input type="radio" name="salary" />
          <p>30 LPA and above</p>
        </li>
        <li>
          <input type="radio" name="salary" />
          <p>40 LPA and above</p>
        </li>
      </ul>
    </div>
  );
};

export default FilterGroups;
