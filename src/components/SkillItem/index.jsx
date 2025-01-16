import "./index.css";

const SkillItem = (props) => {
  const { skillsInfo } = props;
  const { imageUrl, name } = skillsInfo;

  return (
    <div className="skill-item">
      <img className="skill-image" src={imageUrl} alt="skill-image" />
      <p className="skill-name">{name}</p>
    </div>
  );
};

export default SkillItem;
