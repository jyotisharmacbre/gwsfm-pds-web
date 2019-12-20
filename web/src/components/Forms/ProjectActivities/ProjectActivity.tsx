import React, { Component } from 'react';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faUser, faTimes, faCheck, faDownload } from '@fortawesome/free-solid-svg-icons';

class ProjectActivity extends Component {

    render() {
        return (
            <div className="col-xl-6 mt-xl-0 mt-3">
            <h3 className="feed_head">Activity Feed</h3>
            <section className="activity_feed style-3">
              <div className="feed-block">
                <div className="feed-block-img feed-icon">
                  <FontAwesomeIcon className="" icon={faUser} />
                </div>
                <div className="feed-block-content">
                  <h2>Approved <i>by</i> <span>John Wick</span></h2>
                  <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                      optio, dolorum provident rerum aut hic quasi placeat iure
                      tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                veritatis qui ut.</p>

                </div>
              </div>
              <div className="feed-block">
                <div className="feed-block-img close-icon">
                  <FontAwesomeIcon className="" icon={faTimes} />
                </div>
                <div className="feed-block-content">
                  <h2>Approved <i>by</i> <span>John Smith</span></h2>
                  <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                      optio, dolorum provident rerum aut hic quasi placeat iure
                      tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                veritatis qui ut.</p>

                </div>
              </div>
              <div className="feed-block">
                <div className="feed-block-img feed-icon">
                  <FontAwesomeIcon className="" icon={faUser} />
                </div>
                <div className="feed-block-content">
                  <h2>Approved <i>by</i> <span>John Wick</span></h2>
                  <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                      optio, dolorum provident rerum aut hic quasi placeat iure
                      tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                veritatis qui ut.</p>

                </div>
              </div>
              <div className="feed-block">
                <div className="feed-block-img check-icon">
                  <FontAwesomeIcon className="" icon={faCheck} />
                </div>
                <div className="feed-block-content">
                  <h2>Approved <i>by</i> <span>John Doe</span></h2>
                  <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                      optio, dolorum provident rerum aut hic quasi placeat iure
                      tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                veritatis qui ut.</p>

                </div>
              </div>
              <div className="feed-block">
                <div className="feed-block-img feed-icon">
                  <FontAwesomeIcon className="" icon={faUser} />
                </div>
                <div className="feed-block-content">
                  <h2>Approved <i>by</i> <span>John Wick</span></h2>
                  <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                                                optio, dolorum provident .</p>

                </div>
              </div>
            </section>
          </div> 
        );
    }
}

export default ProjectActivity;