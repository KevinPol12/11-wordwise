import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";
import AppNav from "../Components/AppNav";

export default function Homepage() {
  return (
    <div>
      {/*We could have added added this PageNav in the App at the routes level - 
      but we are adding it here to each of the pages*/}
      <PageNav />
      <AppNav />
      <h1 className="test">WorldWise</h1>
      <Link to={"./app"}>Go to the App</Link>
    </div>
  );
}
