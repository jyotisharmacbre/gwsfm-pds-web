import React from 'react';
import './style.css';
import { statement } from '@babel/template';
import clsx from 'clsx';


const LeftMenu: React.FC = () => {

    const [hide, setHide] = React.useState<boolean>(true);

    const getMenu = () => {
        return [{ name: 'Menu 1', link: '/' },
        { name: 'Menu 2', link: '/' },
        { name: 'Customer Enquiry', link: '/', hasSubmenu: true, subItems: [{ name: 'sub1', link: '/' }] }]
    }

    const getSubItems = (items: any[]) => {
        return items.map(x => <a href={x.link}>{x.name}</a>)
    }

    const handleClick = (e: React.MouseEvent<Element, MouseEvent> | undefined) => {

        if(hide)
        {
            setHide(false);
        }else{
            setHide(true);
        }

    }

    const menu = getMenu().map((x) => {
        {
            if (x.hasSubmenu) {
                return (<React.Fragment>
                    <button className={clsx("dropdown-btn", !hide && "active") } onClick={handleClick} >{x.name}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className={clsx("dropdown-container", !hide && "showmenu")}>
                        {getSubItems(x.subItems || [])}
                    </div>
                </React.Fragment>);
            } else {
                return (<a href={x.link}>{x.name}</a>);
            }

        }
    }
    );

    return (<div className="sidenav">
        {menu}
    </div>)
}

export default LeftMenu;