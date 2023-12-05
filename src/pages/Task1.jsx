import React from "react";

class Task extends React.Component {
    constructor (props) {
        super(props);
        this.state = {items: [], text: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render () {
        return (
            <div>
                <div>Write position</div>
                <List items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.text} />
                    <button >Submit </button>

                </form>
            </div>
        )
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
        }
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }

   
} 

class List extends React.Component {
    render() {
        console.log(this.state);
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>

        );
    }
}

class ProductCategoryRow extends React.Component {
   render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan={2}>
                    {category}
                </th>
            </tr>
        );
   } 
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render () {
        let filterText = this.props.filterText;
        let inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;
        // console.log(products);

        this.props.products.forEach((product) => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

class SearcherBar extends React.Component {
    constructor (props) {
        super(props);
        this.handlerFilterTextChange = this.handlerFilterTextChange.bind(this);
        this.handlerInStockOnlyChage = this.handlerInStockOnlyChage.bind(this);
    }

    handlerFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }
    handlerInStockOnlyChage(e) {
        this.props.onInStockOnlyChange(e.target.checked);
    }
    render() {

        return (
            <form>
                    <input 
                        type="text" 
                        placeholder="Search..."
                        value={this.props.filterText}
                        onChange={this.handlerFilterTextChange}/>
                    <br /> 
                    <input 
                        type="checkbox" 
                        checked={this.props.inStockOnly}
                        onChange={this.handlerInStockOnlyChage}
                    /> 
                        {/* {' '} */}
                        Only show products in stock
            </form> 

);
}
}

class FiltrableProductTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {filterText: "", inStockOnly: false};
        this.handlerFilterTextChange = this.handlerFilterTextChange.bind(this);
        this.handlerInStockOnlyChage = this.handlerInStockOnlyChage.bind(this);
    }
    handlerFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }
    handlerInStockOnlyChage(inStockOnly) {
        this.setState({
            inStockOnly:inStockOnly
        });
    }

    render() {
        return (
            <div>
                <SearcherBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handlerFilterTextChange}
                    onInStockOnlyChange={this.handlerInStockOnlyChage}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];

  function ListItem({ item }) {
    return (
      <React.Fragment>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </React.Fragment>
    );
  }
  
  function Glossary(props) {
    return (
        <div>
            <dl>
                {props.items.map(item => (
                <ListItem item={item} key={item.id} />
                ))}
            </dl>
         <input type="text" title="hh"/> dsds
        </div>
    );
  }
  let items = [{
    term: "pupa",
    description: "pupapupa",
    id: "pupa1",
  }];
 
  export function AllTask() {
    return (
        <React.StrictMode>
            <Task />
            <FiltrableProductTable
             products={PRODUCTS} />
             <Glossary items={items}/>
        </React.StrictMode>
    );
  }
// export class Checklist extends React.Component {
//     render() {
//         return (
//             <input type="text" />
//         )
//     }
// }