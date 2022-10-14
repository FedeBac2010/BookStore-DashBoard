import React, { Component } from 'react';
import Genre  from './Genre';

class GenresInDb extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categories: []
        }
    }

    apiCall(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.apiCall("/api/products", this.categories);
    }

    categories = (data) => {
        this.setState({
            categories: data.meta.categoryNames,
            totalCategories: data.meta.countByCategories
        })
    }

   
    render() { 
        return ( 
            <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categorias</h6>
                        </div>
                        <div className="card-body colorFondo">
                            <div className="row">
                                {
                                    this.state.categories.map((category,index)=>{
                                        return  <Genre  category={category}  key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
         );
    }
}

export default GenresInDb;