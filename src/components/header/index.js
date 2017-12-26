import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Keep a Budget</h1>
				<nav>
					<Link activeClassName={style.active} href="/">View</Link>
					<Link activeClassName={style.active} href="/budgets">List</Link>
				</nav>
			</header>
		);
	}
}
