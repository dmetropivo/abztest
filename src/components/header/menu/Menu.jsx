import { Link } from "react-scroll";
import './Menu.sass'

const Menu = ({items})=>{
    return(
        <nav>
            <ul id="menu-list">
                {items.map(item =>
                <li key={`item-${item.value}`}>
                    {/* <a href={`${item.href}`}> */}
                        <Link
                        activeClass="active-link"
                        to={item.href}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={50}>
                            <button className="button">{item.value}</button>
                        </Link>
                    {/* </a> */}
                </li>
                )}
            </ul>
        </nav>
    )
}
export default Menu