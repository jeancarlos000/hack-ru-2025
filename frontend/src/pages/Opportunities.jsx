import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [summarizing, setSummarizing] = useState({});

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    const API_URL = 'https://www.volunteerconnector.org/api/search/';
    
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        return response.json();
      })
      .then(data => {
        // API returns paginated data with 'results' array
        setOpportunities(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const summarizeOpportunity = async (oppId, title, description) => {
    // Check if already summarized
    if (summaries[oppId]) {
      return;
    }

    setSummarizing(prev => ({ ...prev, [oppId]: true }));

    try {
      // Initialize Gemini API - Replace with your API key
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        throw new Error('Please add your Gemini API key to the .env file');
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

      const prompt = `Summarize this volunteer opportunity in 2-3 concise sentences:

Title: ${title}
Description: ${description}`;

      const result = await model.generateContent(prompt);
      // const result = await model.listModels(prompt);
      const response = await result.response;
      const summary = response.text();

      setSummaries(prev => ({ ...prev, [oppId]: summary }));
    } catch (err) {
      console.error('Error summarizing:', err);
      console.error('Error details:', err.message);
      const errorMsg = err.message.includes('API key') 
        ? err.message 
        : `Failed to generate summary: ${err.message}`;
      setSummaries(prev => ({ ...prev, [oppId]: errorMsg }));
    } finally {
      setSummarizing(prev => ({ ...prev, [oppId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="opportunities-container">
        <div className="loading-message">Loading opportunities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="opportunities-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="opportunities-container">
      <section className="opportunities-header">
        <h1 className="opportunities-title">Volunteer Opportunities</h1>
        <p className="opportunities-subtitle">
          Find meaningful ways to give back to your community
        </p>
        
        {/*<div className="search-filter-bar">
          <input 
            type="text" 
            placeholder="Search opportunities..." 
            className="search-input"
          />
          <select className="filter-select">
            <option value="">All Categories</option>
            <option value="food">Food & Hunger</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="senior">Senior Care</option>
            <option value="animals">Animals</option>
            <option value="homeless">Homelessness</option>
          </select>
        </div>*/}
      </section>

      <section className="opportunities-grid">
        {opportunities.length === 0 ? (
          <p className="no-opportunities">No opportunities found.</p>
        ) : (
          opportunities.map((opp) => (
            <div key={opp.id} className="opportunity-card">
              <h3 className="opportunity-title">{opp.title}</h3>
              <p className="opportunity-description">{opp.description}</p>
              
              {summaries[opp.id] && (
                <div className="opportunity-summary">
                  <strong>AI Summary:</strong>
                  <p>{summaries[opp.id]}</p>
                </div>
              )}
              
              <div className="opportunity-actions">
                <button 
                  onClick={() => summarizeOpportunity(opp.id, opp.title, opp.description)}
                  disabled={summarizing[opp.id] || summaries[opp.id]}
                  className="summarize-button"
                >
                  {summarizing[opp.id] ? 'Summarizing...' : summaries[opp.id] ? 'Summarized ✓' : 'Summarize with AI'}
                </button>
                <a href={opp.url} target="_blank" rel="noopener noreferrer" className="opportunity-button">
                  Learn More
                </a>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Opportunities;
