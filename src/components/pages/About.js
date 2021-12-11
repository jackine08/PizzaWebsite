import React from 'react';
import MultiplePizzas from '../../images/multiplePizzas.jpeg';
import '../../styles/About.css';

const About = () => {
    return (
        <div className="about">
            <div
                className="aboutTop"
                style={{backgroundImage: `url(${MultiplePizzas})`}}
            ></div>
            <div className="aboutBottom">
                <h1>ABOUT US</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda cum cumque eum, explicabo in iste iure iusto laboriosam laudantium minus, nam nemo perspiciatis quibusdam quisquam, quo ullam velit veniam! Accusamus beatae doloribus earum, eius error fugit minus natus neque nulla quasi, quo ullam ut voluptates. Ab consectetur fugit libero magni qui quod recusandae! Adipisci asperiores at aut commodi cumque, cupiditate deleniti dolores eius est excepturi illo iste labore laborum laudantium libero magni minima molestiae, non odit officia officiis perferendis praesentium quasi quod quos recusandae rem temporibus ut velit voluptate. Aut cupiditate eligendi harum itaque minus perferendis quidem tempore veniam.</p>
            </div>
        </div>
    );
};

export default About;