import { Container} from "react-bootstrap"
import { Link } from "react-scroll";
import './Banner.sass'

const Banner = () => {
    return(
        <Container fluid className="p-0 main-bg-color">
            <div className="banner-container">
                <div className="banner-content">
                <h1 className="h1-custom">Test assignment for front-end developer</h1>
                <p className="p1-custom">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <Link
                        activeClass="active-link"
                        to={'sign-up'}
                        smooth={true}
                        offset={-70}
                        duration={50}>
                            <button className="button">Sign up</button>
                        </Link>
                </div>
            </div>
        </Container>
    )
}
export default Banner