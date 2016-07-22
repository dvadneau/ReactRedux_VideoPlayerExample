import React, { Component } from 'react';

/*
Class-based components have state, functional-based components do not.
 */
class SearchBar extends Component {

    constructor(props) {

        super(props);

        this.state = {term: ''};
    }

    render() {

        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        )
    }

    onInputChange(term) {
        this.setState({term});
        this.props.searchTermChangeFn(term);
    }
}

export default SearchBar;
