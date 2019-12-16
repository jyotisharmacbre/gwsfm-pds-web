import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

interface IProps {
  heading:string;
  content:string;
}

const Tile:React.FC<IProps> = (props:IProps) => {
  return(
        <div className="card_wrap" data-test='card-tile'>
          <div className="card">
            <h4 className="title" data-test='card-heading'><FormattedMessage id={props.heading} /></h4>
              <p className="text" data-test='card-content'>
                <FormattedMessage id={props.content} />
              </p>
          </div>
        </div>
            
  );
}

export default Tile;
