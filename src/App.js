import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
	constructor(){
		//To get the context
		super();
		this.state = {
			txt: 'This is the state txt',
			cat: 0,
			a: '',
			currentEvent: '---',
			val: 0
		}
		this.updateState = this.updateState.bind(this);
		this.updateVal = this.updateVal.bind(this);
	}

	updateTxt(e){
		this.setState({txt: e.target.value});
	}

	updateA(e){
		this.setState({
			a: this.refs.a.value,
			b: this.refs.b.value,
			c: this.c.refs.input.value
		});
	}

	updateState( e ){
		this.setState({currentEvent: e.type})
	}

	updateVal(){
		this.setState({
			val: this.state.val + 1
		});
	}

	componentWillMount(){
		console.log('Component Will Mount');
	}

	componentDidMount(){
		console.log('Component Did Mount');
	}

	componentWillUnmount(){
		console.log('Component Will Unmount');
	}

	render(){
		let txt = this.props.txt;
		return (
		<div>
			<hr />
				<input type="text" onChange={this.updateTxt.bind(this)} />
				<h1>{txt} <b>Bold</b></h1> 
			

			<hr />
				<h1>{this.state.txt} - {this.state.cat}</h1>
			
				<Widget updateTxt={this.updateTxt.bind(this)} />
				<Widget updateTxt={this.updateTxt.bind(this)} />
				<Widget updateTxt={this.updateTxt.bind(this)} />
			
			
			<hr />
				<button>I <Heart />React</button>
				<Button text="The text"/>
			

			<hr />
				<h1>Validation</h1>
				<Title text="Don`t be too short or empty"/>
			

			<hr />
				<h1>Event Detection</h1>
				<textarea 
					onKeyPress={this.updateState}
					onCopy={this.updateState}
					onCut={this.updateState}
					onPaste={this.updateState}
					onFocus={this.updateState}
					onBlur={this.updateState}
					onDoubleClick={this.updateState}
					onTouchStart={this.updateState}
					onTouchMove={this.updateState}
					onTouchEnd={this.updateState}
					cols="30"
					rows="10"
				/>
				<h1>{this.state.currentEvent}</h1>
			

			<hr />
				<input 
					ref="a"
					type="text"
					onChange={this.updateA.bind(this)}
				/>{this.state.a}
			<hr />
				<input 
					ref="b"
					type="text" 
					onChange={this.updateA.bind(this)}
				/>{this.state.b}	
			<hr />
				<Input 
					ref={ component => this.c = component}
					update={this.updateA.bind(this)}
				/>{this.state.c}							
			
			<hr />	
				<button onClick={this.updateVal}>{this.state.val}</button>

		</div>
		)
  	}
}

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
	txt: "This is the default txt"
}

//Create Widget function
const Widget = (props) => 
	<input type="text" onChange={props.updateTxt} />

//Create Button function, input propts, return 
const Button = (props) => <button>{props.children}</button>

//Create a new class Heart
class Heart extends React.Component{
	render(){
		return <span>&hearts;</span>
	}
}

//Create a validation function Title
const Title = (props) => <h1>Text Validation: {props.text}</h1>

Title.propTypes = {
	text(props, propName, component){
		if(!(propName in props)){
			return new Error('Missing ' + propName)
		}
		if(props[propName].length < 6){
			return new Error(propName + ' was too short')
		}
	}
}

//
class Input extends React.Component{
	render(){
		return <div><input ref="input" type="text" onChange={this.props.updateA} /></div>
	}
}

//
class Wrapper extends React.Component{
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'))
	}

	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	
	render(){
		return(
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>UnMount</button>
				<div id="a"></div>
			</div>
		)
	}
}


//const App = () => <h1>Hello stateless</h1>

//export default App
//Wrapper will render App
export default Wrapper