// TimelineItem.js
import React from "react";
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimelineItem = ({ className, color, contentStyle, contentArrowStyle, date, iconStyle, icon, title, subtitle, description }) => {
    return (
        <VerticalTimelineElement
            className={className}
            contentStyle={{
                ...contentStyle,
                color: '#fff',
                borderRadius: '1.2em',
                backdropFilter: 'blur(2px)'
        }}
            contentArrowStyle={contentArrowStyle}
            date={date}
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={icon} size="lg" fixedWidth />}
        >
            <h3 className="vertical-timeline-element-title">{title}</h3>
            <h5 className="vertical-timeline-element-subtitle">{subtitle}</h5>
            <b className={`hr anim ${color}`}></b>
            {description.map((desc, index) => (
                <p key={index}>{desc}</p>
            ))}
        </VerticalTimelineElement>
    );
};

export default TimelineItem;
