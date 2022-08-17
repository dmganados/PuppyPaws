import { Navbar, Container, Dropdown } from 'react-bootstrap';

export default function UserNavBar() {
	
	return(
		<Navbar className="userNav">
			<Container className="userContainer">
				<Dropdown className="navigationUser">
					<Dropdown.Toggle variant="none" className="userDropdown">
						<svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill personNav" viewBox="0 0 16 16">
						  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
						</svg>
					</Dropdown.Toggle>	

					<Dropdown.Menu>
						<Dropdown.Item href="/login" >Login</Dropdown.Item>
						<Dropdown.Item href="/profile" >Profile</Dropdown.Item>
					</Dropdown.Menu>					
				</Dropdown>
			
									
					{/*<Nav.Link href="/login" className="nav-link d-block d-sm-inline d-md-block d-lg-inline ">Login</Nav.Link>	
					<Nav.Link href="/profile" className="nav-link d-block d-sm-inline d-md-block d-lg-inline ">Profile</Nav.Link>		*/}	
				
			</Container>
		</Navbar>
	)
}



