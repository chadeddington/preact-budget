import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import BudgetsView from '../routes/budgetsview';
import NewBudget from '../routes/newbudget';
// import Home from 'async!./home';
// import Profile from 'async!./budgetsview';
// import NewBudget from 'async!./newbudget';

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

  handleAddBudget = (e) => {
    let newbudgets = this.state.budgets;
    newbudgets.push(e.detail.budget);
    this.setState({budgets: newbudgets});
  }

  handleBudgetUpdate = (e) => {
    const data = e.detail;
    const current = this.state.budgets[data.budgetIndex].current;
    let newBudgets = [];
    newBudgets = newBudgets.concat(this.state.budgets);
    newBudgets[data.budgetIndex].current = current + parseInt(data.amount);
    this.setState({budgets: newBudgets});
  }
  
	componentDidMount() {
    document.addEventListener('add-budget', this.handleAddBudget.bind(this));
    document.addEventListener('save-budget-update', this.handleBudgetUpdate.bind(this));
	}

	render({  }, { budgets }) {
    console.log('budgets', budgets);
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" budgets={budgets} />
					<BudgetsView path="/budgets/" budgets={budgets}/>
          <NewBudget path="/newbudget" />
				</Router>
			</div>
		);
	}
}
