import {Col, Container, Row} from 'react-bootstrap'
import './Header.sass'
import logo from '../../assets/Logo.svg'
import Menu from './menu/Menu'


const Header = () => {
    const items =[
        {value:"Users", href: 'users'},
        {value:"Sign up", href: 'sign-up'}
    ]
    return(   
        <Container  fluid className='p-0 header-container' >
        <div className='main-container'>
            <Row className='m-0'>
                <Col className='p-0'>
                 <a  href='/'><img src={logo} width="104px" className='header-logo' alt='abztest'></img></a>
                </Col>
                <Col className='p-0'>
                     <Menu items={items} />
                </Col>
            </Row>
        </div>
        </Container>
        
    )
}
export default Header;