import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

interface IProps {
  headingKey:string;
  contentKey:string;
}

const Tile:React.FC<IProps> = (props:IProps) => {
  return(
        <div className="card_wrap" data-test='card-tile'>
          <div className="card">
            <h4 className="title" data-test='card-heading'><FormattedMessage id={props.headingKey} /></h4>
              <p className="text" data-test='card-content'>
                <FormattedMessage id={props.contentKey} />
              </p>
          </div>
        </div>
            
  );
}

export default Tile;
