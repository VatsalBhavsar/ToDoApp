import React from 'react';
import ReactDOM from 'react-dom';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchBar extends React.Component{
  render(){
    return(
      <div>
          <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.props.onValueChange} />
          <br/>
          <label>
            <input type="checkbox" onChange={this.props.onStockFilterChange} />
            Only show products in stock.
          </label>
      </div>
    )
  }
}

class ProductTable extends React.Component{
  render(){
    const rows = []
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly
    let lastCategory = null
    this.props.products.forEach((product) => {
      if(product.name.indexOf(filterText) === -1){
        return
      }
      if(inStockOnly && !product.stocked){
        return
      }
      if(product.category !== lastCategory){
        rows.push(
          <ProductCategoryRow 
            category={product.category} 
            key = {product.category}
          />
        )
        lastCategory = product.category
      }
      rows.push(
        <ProductRow 
          product={product} 
          key = {product.name}
        />
      )
    })

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class ProductCategoryRow extends React.Component{
  render(){
    return(
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
}

class ProductRow extends React.Component{
  render(){
    return(
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
}

class FilterAbleProductTable extends React.Component{

  constructor(props){
    super(props)
    this.state = {
        filterText : '',
        inStockOnly : false
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleStockFilterChange = this.handleStockFilterChange.bind(this)
  }

  handleFilterChange(e){
    this.setState({
      filterText: e.target.value
    })
  }

  handleStockFilterChange(e){
    this.setState({
      inStockOnly: !this.state.inStockOnly
    })
  }

  render(){
    return(
      <div>
        <SearchBar 
          filterText={this.state.filterText}  
          inStockOnly={this.state.inStockOnly}
          onValueChange={this.handleFilterChange}
          onStockFilterChange={this.handleStockFilterChange}
        />
        <ProductTable 
          products={this.props.products} 
          filterText={this.state.filterText}  
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <FilterAbleProductTable products={PRODUCTS} />, 
  document.getElementById('root')
)