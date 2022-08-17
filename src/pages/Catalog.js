import { useState, useEffect } from 'react';
import ProductCard from './../components/ProductCard';
import { Row, Container} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default function Catalog() {

	const [productCollection, setProductCollection] = useState([]);
	// console.log(productCollection)
	// console.log("Hello")

	useEffect(() => {
		fetch('https://limitless-brushlands-90925.herokuapp.com/products/all-active').then(res => res.json()).then(productData => {	
			// console.log(productData)		
			setProductCollection(productData.map(products => {
				return(
					<ProductCard key={products._id}	productProp={products} />
				)
			}));
		});
	},[]);
	return(
		<>
			<div>
				<Helmet>
					<title>Puppy Paws | Catalog</title>
				</Helmet>
			</div>
			<Container>
				<Row>					
					{productCollection}
				</Row>
			</Container>
		</>
	);
};