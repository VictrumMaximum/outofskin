import * as React from "react";
import Quote from "../../../../schemas/QuoteSchema";
const styles = require("./styles.less");

interface EditColumnProps {
	header: string;
	quotes: Quote[],
	handleChange
}

export default class EditColumn extends React.Component<EditColumnProps, {}> {

	handleQuoteChange(index, key, event) {
		const quotes = this.props.quotes;
		quotes[index][key] = event.target.value;
		this.props.handleChange(quotes);
	}

	handleRemoveQuote(index) {
		const quotes = this.props.quotes;
		quotes.splice(index, 1);
		this.props.handleChange(quotes);
	}

	handleAddQuote() {
		const quotes = this.props.quotes;
		quotes.push({
			author: "",
			text: "",
			link: ""
		});
		this.props.handleChange(quotes);
	}

	render() {
		return (
			<div className={styles.editColumn}>
				<h3>{this.props.header}</h3>
				{this.props.quotes.map((quote, index) => {
					return (<div key={index} className={styles.quote}>
						<textarea className={styles.quoteText}
							value={quote.text}
							onChange={this.handleQuoteChange.bind(this, index, "text")}/>
						<br/>
						<input
							className={styles.quoteAuthor}
							value={quote.author}
							onChange={this.handleQuoteChange.bind(this, index, "author")}/>
						<br/>
						<input
							className={styles.quoteLink}
							value={quote.link}
							onChange={this.handleQuoteChange.bind(this, index, "link")}/>
						<br/>
						<button onClick={this.handleRemoveQuote.bind(this, index)}>Remove</button>
					</div>);
				})}
				<button onClick={this.handleAddQuote.bind(this)}>Add</button>
			</div>
		);
	}
}
