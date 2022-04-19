import { useState, useEffect } from 'react';
import { Container, Col, Form, Button,  } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CreateProduct() {

	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [sellingPrice, setSellingPrice] = useState('');
	const [stock, setStock] = useState('');
	const [isFilled, setIsFilled] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const toggleChecked = () => setIsActive(value => !value)
	// console.log(Preview)

	useEffect(() => {
		if (productName !== '' && description !== '' && sellingPrice !== '' && stock !== '') {
			setIsFilled(true);
		} else {
			setIsFilled(false);
		}
	},[productName, description, sellingPrice, stock])

	const createListing = async (submitEvent) => {		
		submitEvent.preventDefault();
		let userCredentials = localStorage.accessToken;		

		const isCreated = await fetch('https://limitless-brushlands-90925.herokuapp.com/products/', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userCredentials}`,
				'Content-Type' : 'application/json'
			},

			body: JSON.stringify({
				productName: productName,
				description: description,
				sellingPrice: sellingPrice,
				stock: stock,
				isActive: isActive
			})
		}).then(result => result.json()).then(itemData => {
			console.log(itemData)
			if (itemData) {
				return true;
			} else {
				return false;
			}

		})

		if (isCreated) {
			setProductName('');
			setDescription('');
			setSellingPrice('');
			setStock('');
			setIsActive(false);

			await Swal.fire({
				icon: "success",
				text: "New product listing is created"
			});

			window.location.href="/manage-product";
		} else {
			await Swal.fire({
				icon: "error",
				text: "Check all fields"
			});
		}		
	};	


	return(
		<>
		<Container>
		<Col className='p-5'>
			<Form onSubmit={e => createListing(e)} >
				<Form.Group>
					<Form.Label>Product Name</Form.Label>
					<Form.Control 
					type="text" 
					required 
					value={productName}
					onChange={event => setProductName(event.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control 
					type="text" 
					required
					value={description}
					onChange={e => setDescription(e.target.value)} 
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Price</Form.Label>
					<Form.Control 
					type="number" 
					required
					value={sellingPrice}
					onChange={e => setSellingPrice(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Stock</Form.Label>
					<Form.Control 
					type="number" 
					required
					value={stock}
					onChange={e => setStock(e.target.value)} 
					/>
				</Form.Group>



				<div className="mb-4">
					<input 
					type="checkbox" 
					checked={isActive} 					
					onChange={toggleChecked} /> Display product as Active
				</div>

				{
					isFilled ?
						<Button className="createBtn" type="submit">Create Product</Button>	
					:
						<Button className="createBtn" disabled>Create Product</Button>	
				}
					
				
			</Form>
			

		</Col>			
		</Container>
		</>
	)
}