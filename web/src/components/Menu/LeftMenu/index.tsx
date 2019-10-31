import React from 'react';
import './style.css';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import Translate from '../../../Translations/translate';
import { Link } from 'react-router-dom';

const LeftMenu: React.FC = (props: any) => {
  const [hide, setHide] = React.useState<boolean>(true);

  const getMenu = () => {
    return [
      {
        name: Translate.getLabel(props, 'customerEnquiry'),
        link: '/Project'
      },
      {
        name: Translate.getLabel(props, 'projectOverview'),
        link: '/ProjectOverview'
      },
      {
        name: Translate.getLabel(props, 'j&a'),
        link: '/',
        hasSubmenu: true,
        subItems: [
          { name: Translate.getLabel(props, 'preliminaries'), link: '/' },
          { name: Translate.getLabel(props, 'subcontractors'), link: '/' },
          { name: Translate.getLabel(props, 'discounts'), link: '/' }
        ]
      },
      { name: Translate.getLabel(props, 'review&submit'), link: '/' }
    ];
  };

  const getSubItems = (items: any[]) => {
    return items.map(x => (
      <a key={x.name} href={x.link} onClick={handleSubClick}>
        {x.name}
      </a>
    ));
  };

  const handleSubClick = (
    e: React.MouseEvent<Element, MouseEvent> | undefined
  ) => {
    if (e !== undefined) {
      e.preventDefault();
      if (e.currentTarget.classList.contains('active-sub')) {
        e.currentTarget.classList.remove('active-sub');
      } else {
        e.currentTarget.classList.add('active-sub');
      }
    }
  };

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent> | undefined
  ) => {
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  const menu = getMenu().map(x => {
    if (x.hasSubmenu) {
      return (
        <React.Fragment key={x.name}>
          <button
            className={clsx('dropdown-btn', !hide && 'active')}
            onClick={handleClick}
          >
            {x.name}
            <i className="fa fa-caret-down"></i>
          </button>
          <div className={clsx('dropdown-container', !hide && 'showmenu')}>
            {getSubItems(x.subItems || [])}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Link
          to={{
            pathname: x.link
          }}
        >
          {x.name}
        </Link>
      );
    }
  });

  return <div className="sidenav">{menu}</div>;
};

export default injectIntl(LeftMenu);
