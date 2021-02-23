import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

function NavbarMenuTabletChild(props) {
  const { main } = props;
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggle = () =>
    setState((newState) => ({
      isOpen: !newState.isOpen,
    }));

  return (
    <li className='navbar__menu--tablet-item'>
      <div className='navbar__menu--tablet-item-wrap'>
        <Link
          to={main.url}
          className='navbar__menu--tablet-link'
          onClick={() => setState((newState) => ({ isOpen: !newState.isOpen }))}
        >
          {main.mainTitle}
        </Link>
        {main.child ? (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`navbar__menu--tablet-collapse ${
              state.isOpen ? 'show' : ''
            }`}
            onClick={toggle}
          />
        ) : null}
      </div>
      {main.child ? (
        <Collapse isOpen={state.isOpen}>
          <ul className='navbar__menu--tablet-child'>
            {main.child.map((child, index) => {
              return (
                <li key={index} className='navbar__menu--tablet-child-item'>
                  <Link
                    to={child.url}
                    className='navbar__menu--tablet-child-item__link'
                    onClick={() =>
                      setState((newState) => ({ isOpen: !newState.isOpen }))
                    }
                  >
                    <span>{child.childTitle}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Collapse>
      ) : null}
    </li>
  );
}

export default NavbarMenuTabletChild;
