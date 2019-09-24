import React from 'react';
import './style.css';
import clsx from 'clsx';


const LeftMenu: React.FC = () => {

    const [hide, setHide] = React.useState<boolean>(true);

    const getMenu = () => {
        return [{ name: 'Customer Enquiry', link: '/' },
        { name: 'Project Overview', link: '/ProjectOverview' },
        { name: 'Justification & Authorisation', link: '/', hasSubmenu: true, subItems: [{ name: 'Preliminaries', link: '/' }, { name: 'Subcontractors', link: '/' }, { name: 'Discounts', link: '/' }] },
        { name: 'Review & Submit', link: '/' }]
    }

    const getSubItems = (items: any[]) => {
        return items.map(x => <a key={x.name} href={x.link} onClick={handleSubClick}>

            {x.name}</a>)
    }

    const handleSubClick = (e: React.MouseEvent<Element, MouseEvent> | undefined) => {

        if (e !== undefined) {
            e.preventDefault();
            if (e.currentTarget.classList.contains('active-sub')) {
                e.currentTarget.classList.remove('active-sub');
            } else {
                e.currentTarget.classList.add('active-sub');
            }
        }


    }

    const handleClick = (e: React.MouseEvent<Element, MouseEvent> | undefined) => {

        if (hide) {
            setHide(false);
        } else {
            setHide(true);
        }

    }

    const menu = getMenu().map((x) => {
        {
            if (x.hasSubmenu) {
                return (<React.Fragment key={x.name}>
                    <button className={clsx("dropdown-btn", !hide && "active")} onClick={handleClick} >{x.name}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className={clsx("dropdown-container", !hide && "showmenu")}>
                        {getSubItems(x.subItems || [])}
                    </div>
                </React.Fragment>);
            } else {
                return (<a key={x.name} href={x.link}>{x.name}</a>);
            }

        }
    }
    );

    return (<div className="sidenav">
        {menu}
    </div>)
}

export default LeftMenu;