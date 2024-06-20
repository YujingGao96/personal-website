import React from "react";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {faBaby} from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';
import TimelineItem from './TimelineItem';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {timelineElements} from "../../../resolvers/timelineInfoResolver";

const TimeLine = () => {
    return (
        <div id="timeline">
            <h1 className="text-center gradient-text-3 fw-bold">Life Timeline</h1>
            <VerticalTimeline className="mt-5">
                {timelineElements.map((element, index) => (
                    <TimelineItem key={index} {...element} />
                ))}
                <VerticalTimelineElement
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faBaby} size="lg" fixedWidth/>}
                />
            </VerticalTimeline>
        </div>
    );
};

export default TimeLine;
