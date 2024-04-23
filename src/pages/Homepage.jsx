import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";

export default function Homepage() {
  return (
    <div>
      {/*We could have added added this PageNav in the App at the routes level - 
      but we are adding it here to each of the pages*/}
      <PageNav />
      <h1>WorldWise</h1>
      <Link to="/product">Product</Link>
    </div>
  );
}
