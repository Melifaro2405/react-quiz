import React, {Component, Fragment} from 'react';
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map(({to, label, exact}, index) => {
      return (
        <li key={index}>
          <NavLink
            to={to}
            exact={exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const {isOpen, onClose, isAuth} = this.props;
    const cls = [classes.Drawer]

    if (!isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Список', exact: true},
    ];

    if (isAuth) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        {isOpen && <Backdrop onClick={onClose} />}
      </Fragment>
    )
  }
};

export default Drawer;
