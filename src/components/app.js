import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import BudgetsView from '../routes/budgetsview';
// import Home from 'async!./home';
// import Profile from 'async!./budgetsview';

export default class App extends Component {
  state = {
    budgets: [
      { name: 'Groceries', limit: 500, current: 0 },
      { name: 'Rent', limit: 1200, current: 0 }
    ]
  }
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
  };
  
	componentDidMount() {
    console.log('add listener');
    document.addEventListener('add-budget', e => {
      console.log('budget event', e.detail.budget);
      let newbudgets = this.state.budgets;
      newbudgets.push(e.detail.budget);
      this.setState({budgets: newbudgets});
    })
	}

	render({  }, { budgets }) {
    console.log('budgets', budgets);
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" budgets={budgets} />
					<BudgetsView path="/budgets/" budgets={budgets}/>
					<BudgetsView path="/budgets/:person" />
				</Router>
			</div>
		);
	}
}
