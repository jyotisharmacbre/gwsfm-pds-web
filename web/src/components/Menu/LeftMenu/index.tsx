import React from 'react';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import Translate from '../../../Translations/translate';
import { Link } from 'react-router-dom';
import cbre_icon from '../../images/logo-black.jpg';
import upload_icon from '../../images/upload-icon.jpg';

const LeftMenu: React.FC = (props: any) => {
  //const upload_icon  = require('../../images/upload-icon.jpg');
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

  // const getSubItems = (items: any[]) => {
  //   return items.map(x => (
  //     <a key={x.name} href={x.link} onClick={handleSubClick}>
  //       {x.name}
  //     </a>
  //   ));
  // };

  // const handleSubClick = (
  //   e: React.MouseEvent<Element, MouseEvent> | undefined
  // ) => {
  //   if (e !== undefined) {
  //     e.preventDefault();
  //     if (e.currentTarget.classList.contains('active-sub')) {
  //       e.currentTarget.classList.remove('active-sub');
  //     } else {
  //       e.currentTarget.classList.add('active-sub');
  //     }
  //   }
  // };

  // const handleClick = (
  //   e: React.MouseEvent<Element, MouseEvent> | undefined
  // ) => {
  //   if (hide) {
  //     setHide(false);
  //   } else {
  //     setHide(true);
  //   }
  // };

  // const menu = getMenu().map(x => {
  //   if (x.hasSubmenu) {
  //     return (
  //       <React.Fragment key={x.name}>
  //         <button
  //           className={clsx('dropdown-btn', !hide && 'active')}
  //           onClick={handleClick}
  //         >
  //           {x.name}
  //           <i className="fa fa-caret-down"></i>
  //         </button>
  //         <div className={clsx('dropdown-container', !hide && 'showmenu')}>
  //           {getSubItems(x.subItems || [])}
  //         </div>
  //       </React.Fragment>
  //     );
  //   } else {
  //     return (
  //       <Link
  //         to={{
  //           pathname: x.link
  //         }}
  //       >
  //         {x.name}
  //       </Link>
  //     );
  //   }
  // });

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <div id="sm_none" className="logo">
          <img src={cbre_icon} alt="CBRE PDS" />
        </div>
        <div className="cross-menu">
          MENU
          <button type="button" id="cross-inner" className="cross-sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <ul id="homeMenu" className="list-unstyled components">
        <p className="upload mb-0">
          <img src={upload_icon} alt="upload icon" />
          upload library
        </p>
        {/* <li>
                <Link
          to={{
            pathname: "/"
          }}
        >Home</Link>
                </li> */}
        <li className="active">
          <Link
            to={{
              pathname: '/Project'
            }}
          >
            customer enquiry
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/ProjectOverview'
            }}
          >
            project overview
          </Link>
        </li>
        <li className="">
          <Link
            to="/"
            data-target="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle collapsed"
          >
            justification & authorisation
          </Link>
          <ul className="collapse list-unstyled" id="homeSubmenu">
            <li className="subactive">
              <Link to="/">preliminaries</Link>
            </li>
            <li>
              <Link to="/">subcontractors</Link>
            </li>
            <li>
              <Link to="/">discounts </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={{}}>review & submit</Link>
        </li>
        <li>
          <Link to={{}}>review & approve</Link>
        </li>
        <li>
          <Link to={{}}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default injectIntl(LeftMenu);
