
import React from 'react';

const TeamMemberCard = ({ name, imageUrl, githubLink, linkedinId }) => {
  return (
    <div className="w-48 rounded overflow-hidden shadow-lg bg-white mx-2 mb-4 rounded-lg">
      <img className="w-full h-40 object-contain  rounded-full" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-green-300 text-xl mb-2">{name}</div>
        <div className="flex items-center mb-2">
          <img
            className="w-6 h-6 fill-current text-gray-500 mr-2"
            src="./Assets/images/Github.svg" // Replace with your GitHub icon image URL
            alt="GitHub"
          />
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
            GitHub
          </a>
        </div>
        <div className="flex items-center">
        <img
            className="w-6 h-6 fill-current text-gray-500 mr-2"
            src="./Assets/images/linkedin.png" // Replace with your linkedin icon image URL
            alt="Linkedin"
          />
          <a href={`https://www.linkedin.com/in/${linkedinId}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};


const TechnologyCard = ({ name, imageUrl }) => {
  return (
    <div className="w-44 mx-2 mb-4  ">
      <figure className='flex justify-center items-center flex-col'>
        <img className="w-full h-16 object-contain " src={imageUrl} alt={name} />
        <figcaption className=" px-6 py-6">
          <div className=" text-shadow text-xl mb-2 ">{name}</div>
        </figcaption>
      </figure>
    </div>
  );
};

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Binod',
      imageUrl: "./Assets/images/vinod.jpg",
      githubLink: 'https://github.com/binodrai9',
      linkedinId: 'https://linkedin.com/binod-rai',
    },
    // Add information for other team members
    {
      name: 'Raza',
      imageUrl: "./Assets/images/boy.jpg",
      githubLink: 'https://github.com/bi',
      linkedinId: 'binod-linkedin',
    },
    {
      name: 'Lipi',
      imageUrl: "./Assets/images/lipi.jpeg",
      githubLink: 'https://github.com/LipiDey',
      linkedinId: 'https://linkedin.com/in/lipi-dey-95a6a9196',
    },
    {
      name: 'Akash',
      imageUrl: "./Assets/images/boy.jpg",
      githubLink: 'https://github.com/binod',
      linkedinId: 'binod-linkedin',
    },
    {
      name: 'Ravi',
      imageUrl: "./Assets/images/boy.jpg",
      githubLink: 'https://github.com/binod',
      linkedinId: 'binod-linkedin',
    },
  ];

const technologiesUsed = [
  {
    name: 'React',
    imageUrl: "./Assets/images/React.png",
  },
  {
    name: 'Tailwind CSS',
    imageUrl: "./Assets/images/tailwind.png",
  },
  {
    name: 'Spring Boot',
    imageUrl: "./Assets/images/spring boot.png",
  },
  // ... (other technologies)
];

  return (
    <div className="bg-gray-100 min-h-screen p-8 w-full">
      <div className="bg-white p-8 rounded shadow-md max-w-8xl ">
        {/* <h1 className="text-4xl font-bold mb-4 ">Welcome to Neon Knights Spotify Clone!</h1>
        <br></br>
        <br></br>
        <br></br>
        <p className="text-2xl mb-4">Hello music enthusiasts! 🎶 Meet the Team:</p>
        <br></br> */}
        <div className="bg-white p-1 rounded shadow-md max-w-8xl">
            <div className="bg-green-100 text-black p-8 rounded-md mb-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to Neon Knights Spotify Clone!</h1>
                <p className="text-2xl mb-4">Hello music enthusiasts! 🎶 </p>
            </div>

            {/* Your team information goes here */}
        </div>
        

        <div>
          {/* <h2 className="text-2xl font-bold mb-2">Meet the Team:</h2> */}
          <br></br>
          <br></br>
          {/* <div className="flex justify-between flex-wrap">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div> */}
          <div className="bg-white p-8 rounded shadow-md max-w-8xl">
                <p className="font-bold text-2xl mb-4">Meet the Team:</p>
                <br></br>
                <br></br>
                <div className="flex justify-between flex-wrap">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </div>

        {/* <div>
          <br></br>
          <br></br>
          <br></br>
          <h2 className="text-2xl font-bold mb-2">Technologies Used:</h2>
          <br></br>
        <br></br>
          <br></br>
          <div className="flex justify-center items-center justify-around flex-wrap">
             {technologiesUsed.map((tech, index) => (
               <TechnologyCard key={index} {...tech} />
             ))}
           </div>
        </div> */}
         <div className="bg-white p-8 rounded shadow-md mb-8 max-w-8xl">
            {/* Jumbotron for the Technologies Used section */}
            <div className="bg-green-100 text-black p-8 rounded shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-2">Technologies Used:</h2>
            </div>

            {/* Content of Technologies Used section */}
            <div className="flex justify-center items-center justify-around flex-wrap">
                {technologiesUsed.map((tech, index) => (
                    <TechnologyCard key={index} {...tech} />
                ))}
            </div>
        </div>

        {/* <div>
        <br></br>
        <br></br>
        <br></br>
          <h2 className="text-2xl font-bold mb-2 ">Our Vision:</h2>
          <br></br>
        <br></br>
        
          <p className="text-lg text-left">
            Neon Knights Spotify Clone is more than just an application; it's a platform designed to connect you with the music you love. We believe in the power of music to unite people, evoke emotions, and create lasting memories.
          </p>
        </div><br></br><br></br> */}
        <div className="bg-white p-8 rounded shadow-md mb-8 max-w-8xl">
            {/* Jumbotron for the Our Vision section */}
            <div className="bg-green-100 text-black p-8 rounded shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-2">Our Vision:</h2>
            </div>

            {/* Content of Our Vision section */}
            <p className="text-lg text-left">
                Neon Knights Spotify Clone is more than just an application; it's a platform designed to connect you with the music you love. We believe in the power of music to unite people, evoke emotions, and create lasting memories.
            </p>
        </div>
        
        <div className="bg-white p-8 rounded shadow-md mb-8 max-w-8xl">
            {/* Jumbotron for the Why Choose section */}
            <div className="bg-green-100 text-black p-8 rounded shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-2">Why Choose Neon Knights Spotify Clone?</h2>
            </div>

            {/* Content of Why Choose section */}
            <ul className="list-none text-left">
                <li>
                    Seamless Experience: Our application provides a smooth and intuitive interface, ensuring an enjoyable user experience.
                </li>
                <li>
                    Cutting-Edge Technology: We've employed React, Tailwind CSS, and Spring Boot to create a modern and efficient music streaming solution.
                </li>
                <li>
                    Passionate Team: The Neon Knights team is driven by a shared love for technology and music. We've poured our creativity and expertise into every aspect of this application.
                </li>
            </ul>

            <p className="text-lg">
                Thank you for choosing Neon Knights Spotify Clone. We hope you enjoy the rhythm of your favorite tunes as you explore the endless possibilities within our platform.
            </p>

            <p className="text-lg mt-4">
                Happy listening! 🎧
            </p>
        </div>
        {/* <div>
          <h2 className="text-2xl font-bold mb-2">Why Choose Neon Knights Spotify Clone?</h2>
          <br></br>
        <br></br>
          <ul className="list-none text-left">
            <li>
              Seamless Experience: Our application provides a smooth and intuitive interface, ensuring an enjoyable user experience.
            </li>
            <li>
              Cutting-Edge Technology: We've employed React, Tailwind CSS, and Spring Boot to create a modern and efficient music streaming solution.
            </li>
            <li>
              Passionate Team: The Neon Knights team is driven by a shared love for technology and music. We've poured our creativity and expertise into every aspect of this application.
            </li>
          </ul>
        </div>
        <br></br>
        <p className="text-lg">
          Thank you for choosing Neon Knights Spotify Clone. We hope you enjoy the rhythm of your favorite tunes as you explore the endless possibilities within our platform.
        </p>
        <br></br>
        <br></br>
        <p className="text-lg mt-4">
          Happy listening! 🎧
        </p> */}
      </div>
    </div>
  );
};

export default AboutUsPage;



// import React from 'react';

// const TeamMemberCard = ({ name, imageUrl, githubLink, linkedinId }) => {
//   return (
//     <div className="w-56 rounded overflow-hidden shadow-lg bg-white mx-2 mb-4 rounded-lg">
//       <img className="w-full h-40 object-cover rounded-lg" src={imageUrl} alt={name} />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{name}</div>
//         <div className="flex items-center mb-2">
//           <img
//             className="w-6 h-6 fill-current text-gray-500 mr-2"
//             src="./Assets/images/Github.svg" // Replace with your GitHub icon image URL
//             alt="GitHub"
//           />
//           <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
//             GitHub
//           </a>
//         </div>
//         <div className="flex items-center">
//           <img
//             className="w-6 h-6 fill-current text-gray-500 mr-2"
//             src="./Assets/images/linkedin.png" // Replace with your linkedin icon image URL
//             alt="Linkedin"
//           />
//           <a href={`https://www.linkedin.com/in/${linkedinId}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500">
//             LinkedIn
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TechnologyCard = ({ name, imageUrl }) => {
//   return (
//     <div className="w-56 rounded overflow-hidden shadow-lg bg-white mx-2 mb-4 rounded-lg">
//       <img className="w-full h-40 object-cover rounded-lg" src={imageUrl} alt={name} />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{name}</div>
//       </div>
//     </div>
//   );
// };

// const AboutUsPage = () => {
//   const teamMembers = [
//     // ... (team members data)
//   ];

//   const technologiesUsed = [
//     {
//       name: 'React',
//       imageUrl: 'url-to-react-image',
//     },
//     {
//       name: 'Tailwind CSS',
//       imageUrl: 'url-to-tailwind-image',
//     },
//     {
//       name: 'Spring Boot',
//       imageUrl: 'url-to-spring-boot-image',
//     },
//     // ... (other technologies)
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-8 w-full">
//       <div className="bg-white p-8 rounded shadow-md max-w-8xl text-left">
//         <h1 className="text-4xl font-bold mb-4 text-blue-500">Welcome to Neon Knights Spotify Clone!</h1>
//         <p className="text-2xl mb-4">Hello music enthusiasts! 🎶</p>

//         <div>
//           <h2 className="text-2xl font-bold mb-2">Meet the Team:</h2>
//           <br></br>
//           <div className="flex justify-between flex-wrap">
//             {teamMembers.map((member, index) => (
//               <TeamMemberCard key={index} {...member} />
//             ))}
//           </div>
//         </div>

//         <div>
//           <br></br>
//           <h2 className="text-2xl font-bold mb-2">Technologies Used:</h2>
//           <div className="flex justify-between flex-wrap">
//             {technologiesUsed.map((tech, index) => (
//               <TechnologyCard key={index} {...tech} />
//             ))}
//           </div>
//         </div>

//         <div>
//           {/* ... (rest of your code) */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsPage;
