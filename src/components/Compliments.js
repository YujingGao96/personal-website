import React from "react";
import SingleQuote from "./SingleQuote";
import Fade from "react-reveal/Fade";

const Compliments = () => {
    return (
        <div id="compliments">
            <h1 className="text-center gradient-text-4 font-weight-bold">Compliments</h1>
            <Fade up>
                <SingleQuote
                    text="I am beyond grateful for your dedication to this project.  It shows a lot of character that you have taken the time and effort to work to make it right, even though you no longer have a personal stake in this since you've already received your grade and graduated.  I would be very happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he is considering."
                    authorName="Larry Cline,"
                    authorTitle="Manager of Midland Farmers Market"/>
                <SingleQuote
                    text="Yujing, I am so proud of you! Your hard work and determination to succeed inspire everyone! I look forward to seeing what you will accomplish in the future!"
                    authorName="Rebecca Hagues,"
                    authorTitle="ESOL Teacher of Shaw High School"/>
            </Fade>
        </div>

    );
};

export default Compliments;