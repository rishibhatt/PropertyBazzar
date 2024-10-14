import React from 'react';
import './About.css'; // Add custom styles if needed

const About = () => {
  return (
    <div className="about-container">
      <section className="about-project">
        <h1>About PropertyBazzar</h1>
        <p>
          PropertyBazzar is a comprehensive real estate web application that allows users to list, browse, and inquire about properties. Whether you are looking to buy, sell, or rent, PropertyBazzar serves as a one-stop solution for all your property-related needs.
        </p>
      </section>

      <section className="about-tech">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>MongoDB:</strong> The database used to store user data and property listings.</li>
          <li><strong>Express.js:</strong> Backend framework used for building the API and handling server-side logic.</li>
          <li><strong>React.js:</strong> Frontend library used for building an interactive user interface.</li>
          <li><strong>Node.js:</strong> Server runtime used to handle backend operations and API endpoints.</li>
        </ul>
      </section>

      <section className="about-developer">
        <h2>Developed By</h2>
        <p>
          PropertyBazzar is developed by <strong>Rishab Bhatt</strong>. With a passion for creating efficient and user-friendly web applications, Rishab has utilized the MERN stack to bring this project to life, making real estate management easy and accessible for everyone.
        </p>
      </section>
      <section className="about-links">
        <h2><strong>Rishab Bhatt</strong></h2>
       <ul>
        <li>
            <strong>Linked In: </strong><a href='https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/' className='text-sky'>Click Here</a>
        </li>
        <li>
            <strong>Instagram: </strong><a href='https://www.instagram.com/rishibhatt.007/' className='text-pink'>Click Here</a>
        </li>
        <li>
            <strong>Portfolio: </strong><a href='https://rishieee.netlify.app/'className='text-orange' >Click Here</a>
        </li>
       </ul>
      </section>
    </div>
  );
};

export default About;
