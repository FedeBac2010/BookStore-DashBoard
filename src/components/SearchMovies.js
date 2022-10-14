import {useState, useEffect, useRef} from 'react';

import noPoster from '../assets/images/404.jpg';

function SearchMovies(){

	const inputRef= useRef(null)
	const [keyword , setKeyword]= useState('Harry')
	// Credenciales de API
	const url = `http://www.omdbapi.com/?s=${keyword}&apikey=`;
	const apiKey = '63870817'; // Intenta poner cualquier cosa antes para probar


	const[movies, setMovies]= useState([]);
	const [error, setError]= useState("")

	useEffect(()=>{
		fetch(url + apiKey)
			.then((res)=> res.json())
			.then((movie)=>setMovies(movie.Search))
			.catch((err)=>console.log(err))
	}, [keyword] )

	const submitHandler= (e) => {
		e.preventDefault();
		if(inputRef.current.value == ''){
			setMovies([])
			setError ('Tienes que colocar el nombre de lo que quieras buscar')
		}else{
			setKeyword(inputRef.current.value);
		}
	}

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={submitHandler}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" ref={inputRef}/>
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length >= 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster ? movie.Poster : noPoster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length== 0  &&( 
					<div className="alert alert-warning text-center">
						No se encontraron películas
						</div>
						)}
						{
							error && (
								<h3>{error}</h3>
							)
						}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
