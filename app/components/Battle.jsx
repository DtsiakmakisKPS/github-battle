import * as React from "react";
import PropTypes from "prop-types";
import { close } from "./icons";
import { Link } from "react-router-dom";
// Functional component to display instructions
function Instructions() {
   return (
      <section className='instruction-container'>
         <h2>Instructions</h2>
         <ol>
            <li>Enter 2 Github users</li>
            <li>Battle</li>
            <li>See the winners</li>
         </ol>
      </section>
   );
}

// Class component to handle player input
class PlayerInput extends React.Component {
   state = {
      username: "", // State to store the username input
   };

   // Handle input change and update the state
   handleChange = (event) => {
      this.setState({ username: event.target.value });
   };

   // Handle form submission and pass the username to the parent component
   handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state.username);
   };

   render() {
      return (
         <form
            className='card'
            onSubmit={this.handleSubmit}>
            <label
               htmlFor='username'
               className='player-label'>
               {this.props.label}
            </label>
            <div className='input-row'>
               <input
                  type='text'
                  id='username'
                  placeholder='github username'
                  autoComplete='off'
                  value={this.state.username}
                  onChange={this.handleChange}
               />
               <button
                  className='btn link'
                  type='submit'
                  disabled={!this.state.username}>
                  Submit
               </button>
            </div>
         </form>
      );
   }
}

function PlayerPreview({ username, onReset, label }) {
   return (
      <article className='card'>
         <h3 className='player-label'>{label}</h3>
         <div className='split'>
            <div className='row gap-md'>
               <img
                  width={32}
                  height={32}
                  className='avatar'
                  src={`https://github.com/${username}.png?size=200`}
                  alt={`Avatar for ${username}`}
               />
               <a
                  href={`https://github.com/${username}`}
                  className='link'>
                  {username}
               </a>
            </div>
            <button
               onClick={onReset}
               className='btn secondary icon'>
               {close}
            </button>
         </div>
      </article>
   );
}

PlayerPreview.propTypes = {
   username: PropTypes.string.isRequired,
   onReset: PropTypes.func.isRequired,
   label: PropTypes.string.isRequired,
};

// Main Battle component
export default class Battle extends React.Component {
   state = {
      playerOne: null, // State to store player one data
      playerTwo: null, // State to store player two data
   };

   // Handle submission of player data and update the state
   handleSubmit = (id, player) => {
      this.setState({
         [id]: player,
      });
   };

   handleReset = (id) => {
      this.setState({
         [id]: null,
      });
   };

   render() {
      const { playerOne, playerTwo } = this.state;
      const disabled = !playerOne || !playerTwo; // Disable the battle button if any player data is missing

      return (
         <main className='stack main-stack animate-in'>
            <div className='split'>
               <h1>Players</h1>
               <Link
                  to={{
                     pathname: "/results",
                     search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                  }}
                  className={`btn primary ${disabled ? "disabled" : ""}`}>
                  Battle
               </Link>
            </div>
            <section className='grid'>
               {playerOne === null ? (
                  <PlayerInput
                     label='Player One'
                     onSubmit={(player) =>
                        this.handleSubmit("playerOne", player)
                     }
                  />
               ) : (
                  <PlayerPreview
                     label='Player One'
                     username={playerOne}
                     onReset={() => this.handleReset("playerOne")}
                  />
               )}
               {playerTwo === null ? (
                  <PlayerInput
                     label='Player Two'
                     onSubmit={(player) =>
                        this.handleSubmit("playerTwo", player)
                     }
                  />
               ) : (
                  <PlayerPreview
                     label='Player Two'
                     username={playerTwo}
                     onReset={() => this.handleReset("playerTwo")}
                  />
               )}
            </section>
            <Instructions />
         </main>
      );
   }
}
