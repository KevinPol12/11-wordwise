import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  formatDate(date);

  return (
    <li>
      {/* Using REACT router URL params
      Step 2/3: This list is rendered within /cities path, so the to="" should
      just add to the URL what ever we put in it and trigger the route call prev defined */}
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>({formatDate(date)})</span>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
