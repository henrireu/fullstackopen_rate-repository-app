import { Link } from "react-router-native";
import Text from "./Text"


const AppBarTab = ({ text, link }) => {
    return (
        <Link to={link}>
          <Text color="white" fontWeight="bold">{text}</Text>
        </Link>
    )
}
 
export default AppBarTab