import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Table from "./Table";

// Component to render the language selection dropdown
function LanguagesNav({ selected, onUpdateLanguage }) {
   const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
   return (
      <select
         onChange={(e) => onUpdateLanguage(e.target.value)}
         selected={selected}>
         {languages.map((language) => (
            <option
               key={language}
               value={language}>
               {language}
            </option>
         ))}
      </select>
   );
}

LanguagesNav.propTypes = {
   selected: PropTypes.string.isRequired,
   onUpdateLanguage: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
   state = {
      selectedLanguage: "All", // Default selected language
      repos: null, // Repositories data
      error: null, // Error message
   };

   // Fetch popular repositories when the component mounts
   componentDidMount() {
      this.updateLanguage(this.state.selectedLanguage);
   }

   // Update the selected language and fetch the corresponding repositories
   updateLanguage = (selectedLanguage) => {
      this.setState({
         selectedLanguage,
         error: null,
      });

      fetchPopularRepos(selectedLanguage)
         .then((repos) => this.setState({ repos, error: null }))
         .catch((error) => {
            console.warn("Error fetching repos: ", error);
            this.setState({
               error: "There was an error fetching the repositories.",
            });
         });
   }

   render() {
      const { selectedLanguage, repos, error } = this.state;
      return (
         <main className='stack main-stack animate-in'>
            <div className='split'>
               <h1>Popular</h1>
               <LanguagesNav
                  selected={selectedLanguage}
                  onUpdateLanguage={this.updateLanguage}
               />
            </div>

            {/* Display error message if there is an error */}
            {error && <p className='text-center error'>{error}</p>}

            {/* Display the table of repositories if data is available */}
            {repos && <Table repos={repos} />}
         </main>
      );
   }
}
