function About() {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-6">About Tic Tac Toe</h1>
          <p className="text-lg leading-relaxed mb-4">
            Welcome to <strong>Real-Time Tic Tac Toe</strong>, the ultimate multiplayer gaming experience where strategy meets fun! 
            Our platform allows players from around the globe to connect and compete in real time.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Built with cutting-edge technologies like the <strong>MERN stack</strong>, WebSockets for real-time updates, and 
            Redux for state management, this game offers seamless gameplay and interactive features.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Features</h2>
          <ul className="list-disc list-inside text-left mx-auto max-w-lg">
            <li>Real-time gameplay with instant move updates.</li>
            <li>Interactive game lobby to join or create rooms.</li>
            <li>Global leaderboard to track the best players.</li>
            <li>Integrated chat system for player communication.</li>
            <li>Cross-platform compatibility for all devices.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to deliver an engaging and accessible gaming platform for everyone, blending simplicity with the thrill of competition.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Connect With Us</h2>
          <p className="text-lg leading-relaxed">
            Have feedback or suggestions? Reach out to us through our contact page. We’d love to hear from you!
          </p>
        </div>
      </div>
    );
  }
  
  export default About;